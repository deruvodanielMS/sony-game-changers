import { AmbitionUI, AmbitionGoalResponse } from '@/domain/ambition'
import { GoalRepository } from '../GoalRepository'

export class VendorGoalRepository implements GoalRepository {
  private readonly baseUrl = process.env.VENDOR_API_URL!

  async findMany(): Promise<AmbitionUI[]> {
    const res = await fetch(`${this.baseUrl}/goals`, {
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

  async findById(id: string): Promise<AmbitionUI | null> {
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
  private toDomain(apiGoal: AmbitionGoalResponse): AmbitionUI {
    return {
      id: apiGoal.id,
      title: apiGoal.title,
      status: apiGoal.status,
      userName:
        `${apiGoal.people_assignedTo?.name || ''} ${apiGoal.people_assignedTo?.lastname || ''}`.trim() ||
        'Unassigned',
      ambitionType: apiGoal.type,
      description: apiGoal.body,
      avatarUrl: apiGoal.people_assignedTo?.profileImageUrl,
      ladderedGoals: (apiGoal.goal_ambitions || []).map((ambition) => ({
        id: ambition.id,
        title: ambition.title,
        status: ambition.status,
        userName:
          `${apiGoal.people_assignedTo?.name || ''} ${apiGoal.people_assignedTo?.lastname || ''}`.trim() ||
          'Unassigned',
      })),
    }
  }
}
