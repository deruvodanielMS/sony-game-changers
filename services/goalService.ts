import { GoalRepository } from '@/repositories/GoalRepository'
import { UserService } from '@/services/userService'
import {
  CreateGoalDTO,
  UpdateGoalDTO,
  ManagerAmbitionsData,
  GoalFiltersData,
  GoalStatus,
  GOAL_STATUS_TRANSITIONS,
  MANAGER_ONLY_ACTIONS,
} from '@/domain/goal'

export class GoalService {
  constructor(
    private readonly goalRepo: GoalRepository,
    private readonly userService?: UserService,
  ) {}

  listGoals(email?: string) {
    return this.goalRepo.findGoals(email)
  }

  getGoal(id: string) {
    return this.goalRepo.findGoalById(id)
  }

  async createGoal(goal: CreateGoalDTO, userEmail: string) {
    if (!this.userService) {
      throw new Error('UserService not provided')
    }

    const user = await this.userService.getUser(userEmail)

    if (!user || !user.id) {
      throw new Error('User not found')
    }

    const assignedId = goal.assignedTo ?? user.id

    const payload: CreateGoalDTO = {
      ...goal,
      assignedTo: assignedId,
      createdBy: user.id,
    }

    return this.goalRepo.createGoal(payload)
  }

  async updateGoal(id: string, data: UpdateGoalDTO) {
    // Verify goal exists
    const currentGoal = await this.goalRepo.findGoalById(id)
    if (!currentGoal) {
      throw new Error('Goal not found')
    }

    return this.goalRepo.updateGoal(id, data)
  }

  async deleteGoal(id: string) {
    return this.goalRepo.deleteGoal(id)
  }

  async getManagerAmbitions(email?: string): Promise<ManagerAmbitionsData | null> {
    return this.goalRepo.getManagerAmbitions(email)
  }

  async getGoalFilters(): Promise<GoalFiltersData> {
    return this.goalRepo.getGoalFilters()
  }

  /**
   * Update goal status with transition validation
   * @param id - Goal ID
   * @param newStatus - Target status
   * @param userEmail - Current user's email
   * @param isManager - Whether the user is a manager (mocked for now)
   * @returns Updated goal
   * @throws Error if transition is not allowed
   */
  async updateGoalStatus(
    id: string,
    newStatus: GoalStatus,
    userEmail: string,
    isManager: boolean = false,
  ) {
    // Get current goal to validate transition
    const currentGoal = await this.goalRepo.findGoalById(id)

    if (!currentGoal) {
      throw new Error('Goal not found')
    }

    const currentStatus = currentGoal.status as GoalStatus

    // Validate transition is allowed
    const allowedTransitions = GOAL_STATUS_TRANSITIONS[currentStatus]
    if (!allowedTransitions || !allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid status transition from '${currentStatus}' to '${newStatus}'. Allowed: ${allowedTransitions?.join(', ') || 'none'}`,
      )
    }

    // Check if this transition requires manager role
    const requiresManager = MANAGER_ONLY_ACTIONS.some(
      (action) => action.from === currentStatus && action.to === newStatus,
    )

    if (requiresManager && !isManager) {
      throw new Error('This action requires manager privileges')
    }

    return this.goalRepo.updateGoalStatus(id, newStatus)
  }
}
