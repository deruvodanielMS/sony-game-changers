import { GoalRepository } from '@/repositories/GoalRepository'

export class GoalService {
  constructor(private readonly goalRepo: GoalRepository) {}

  listGoals() {
    return this.goalRepo.findMany()
  }

  getGoal(id: string) {
    return this.goalRepo.findById(id)
  }
}
