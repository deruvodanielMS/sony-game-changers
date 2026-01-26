import { Goal, GoalAmbitionsResponse } from '@/domain/goal'
import { GoalRepository } from '../GoalRepository'

export class VendorGoalRepository implements GoalRepository {
  private readonly baseUrl = process.env.VENDOR_API_URL!

  async findMany(email?: string): Promise<Goal[]> {
    const res = await fetch(`${this.baseUrl}/goals${email ? `?email=${email}` : ''}`, {
      headers: {
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch goals')
    }

    const data = await res.json()
    return data.map(this.toDomain)
  }

  async findById(id: string): Promise<Goal | null> {
    const res = await fetch(`${this.baseUrl}/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
    })

    if (res.status === 404) return null
    if (!res.ok) {
      throw new Error('Failed to fetch goal')
    }

    return this.toDomain(await res.json())
  }

  /**
   * Adapts response from vendor API to Domain Goal Object
   * @param apiGoal Vendor apiGoal type must be aligned from vendro response
   * @returns Domain Goal Object response
   */
  private toDomain(apiGoal: GoalAmbitionsResponse): Goal {
    const hasParent =
      apiGoal.parent != null
        ? { parent: { id: apiGoal.parent.id, title: apiGoal.parent.title } }
        : {}
    return {
      ...hasParent,
      id: apiGoal.id,
      title: apiGoal.title,
      status: apiGoal.status,
      userName:
        `${apiGoal.people_assignedTo?.name || ''} ${apiGoal.people_assignedTo?.lastname || ''}`.trim() ||
        'Unassigned',
      goalType: apiGoal.type,
      description: apiGoal.body,
      avatarUrl: apiGoal.people_assignedTo?.profileImageUrl,
    }
  }
}
