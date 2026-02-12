import { GoalRepository } from '@/repositories/GoalRepository'
import { UserService } from '@/services/userService'
import { CreateGoalDTO, ManagerAmbitionsData, GoalFiltersData } from '@/domain/goal'

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

  async updateGoal(id: string, goal: CreateGoalDTO, userEmail: string) {
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

    return this.goalRepo.updateGoal(id, payload)
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
}
