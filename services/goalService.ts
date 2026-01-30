import { GoalRepository } from '@/repositories/GoalRepository'
import { UserService } from '@/services/userService'
import { CreateGoalDTO } from '@/domain/goal'

export class GoalService {
  constructor(
    private readonly goalRepo: GoalRepository,
    private readonly userService?: UserService,
  ) {}

  listGoals(email?: string) {
    return this.goalRepo.findMany(email)
  }

  getGoal(id: string) {
    return this.goalRepo.findById(id)
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

    return this.goalRepo.create(payload)
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

    return this.goalRepo.update(id, payload)
  }

  async deleteGoal(id: string) {
    return this.goalRepo.delete(id)
  }
}
