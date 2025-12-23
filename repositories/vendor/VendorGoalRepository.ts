import { GoalRepository } from '../GoalRepository'
import { Goal } from '@/domain/goal'

export class VendorGoalRepository implements GoalRepository {
  private readonly baseUrl = process.env.VENDOR_API_URL!

  async findMany(): Promise<Goal[]> {
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

  async findById(id: number): Promise<Goal | null> {
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
  private toDomain(apiGoal: Goal): Goal {
    return {
      id: apiGoal.id,
      title: apiGoal.title,
      body: apiGoal.body,
      type: apiGoal.type,
      status: apiGoal.status,
      parentId: apiGoal.parentId ?? null,
      path: apiGoal.path ?? null,
      assignedTo: apiGoal.assignedTo,
      createdBy: apiGoal.createdBy,
      periodId: apiGoal.periodId,
      createdAt: new Date(apiGoal.createdAt),
    }
  }
}
