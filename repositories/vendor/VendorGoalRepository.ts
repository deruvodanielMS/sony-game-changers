import {
  Goal,
  GoalAmbitionsResponse,
  CreateGoalDTO,
  UpdateGoalDTO,
  ManagerAmbitionsData,
  GoalFiltersData,
  GOAL_STATUSES,
  GOAL_TYPES,
  GoalStatus,
} from '@/domain/goal'
import { GoalRepository } from '../GoalRepository'

export class VendorGoalRepository implements GoalRepository {
  private readonly baseUrl = process.env.VENDOR_API_URL!

  async findGoals(email?: string): Promise<Goal[]> {
    const res = await fetch(`${this.baseUrl}/goals${email ? `?email=${email}` : ''}`, {
      headers: {
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch goals')
    }

    const data = await res.json()
    // Sort by createdAt descending (newest first)
    return data.map(this.toDomain).sort((a: Goal, b: Goal) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })
  }

  async createGoal(goal: CreateGoalDTO): Promise<Goal> {
    const res = await fetch(`${this.baseUrl}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
      body: JSON.stringify(goal),
    })

    if (!res.ok) {
      throw new Error('Failed to create goal')
    }

    const data = await res.json()
    return this.toDomain(data)
  }

  async findGoalById(id: string): Promise<Goal | null> {
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

  async updateGoal(id: string, goal: UpdateGoalDTO): Promise<Goal> {
    const res = await fetch(`${this.baseUrl}/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
      body: JSON.stringify(goal),
    })

    if (!res.ok) {
      throw new Error('Failed to update goal')
    }

    return this.toDomain(await res.json())
  }

  async deleteGoal(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/goals/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to delete goal')
    }
  }

  async getManagerAmbitions(_email?: string): Promise<ManagerAmbitionsData | null> {
    // TODO: Implement vendor API call for manager ambitions
    return null
  }

  async getGoalFilters(): Promise<GoalFiltersData> {
    // TODO: Implement vendor API call for filter options
    return {
      avatarSelector: {
        options: [],
        showItems: 4,
      },
      filters: [
        {
          label: 'Status',
          'data-testid': 'filter-status',
          options: [
            { label: 'Draft', value: GOAL_STATUSES.DRAFT },
            { label: 'Awaiting Approval', value: GOAL_STATUSES.AWAITING_APPROVAL },
            { label: 'In Progress', value: GOAL_STATUSES.APPROVED },
            { label: 'Completed', value: GOAL_STATUSES.COMPLETED },
            { label: 'Archived', value: GOAL_STATUSES.ARCHIVED },
          ],
          single: true,
        },
        {
          label: 'Type',
          'data-testid': 'filter-category',
          options: [
            { label: 'Business', value: GOAL_TYPES.BUSINESS },
            { label: 'Manager effectiveness', value: GOAL_TYPES.MANAGER_EFFECTIVENESS },
            {
              label: 'Personal growth and development',
              value: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
            },
          ],
          single: true,
        },
      ],
      activePeriodId: null, // TODO: Fetch from vendor API
    }
  }

  async updateGoalStatus(id: string, status: GoalStatus): Promise<Goal> {
    const res = await fetch(`${this.baseUrl}/goals/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
      body: JSON.stringify({ status }),
    })

    if (!res.ok) {
      throw new Error('Failed to update goal status')
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
      uid: apiGoal.people_assignedTo?.id || 'unassigned',
      title: apiGoal.title,
      status: apiGoal.status,
      userName:
        `${apiGoal.people_assignedTo?.name || ''} ${apiGoal.people_assignedTo?.lastname || ''}`.trim() ||
        'Unassigned',
      goalType: apiGoal.type,
      description: apiGoal.body,
      avatarUrl: apiGoal.people_assignedTo?.profileImageUrl,
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}
