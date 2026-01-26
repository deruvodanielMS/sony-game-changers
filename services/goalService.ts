import { GoalRepository } from '@/repositories/GoalRepository'

export class GoalService {
  constructor(private readonly goalRepo: GoalRepository) {}

  listGoals(email?: string) {
    return this.goalRepo.findMany(email)
  }

  getGoal(id: string) {
    return this.goalRepo.findById(id)
  }
}
