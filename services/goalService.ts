import { GoalRepository } from '@/repositories/GoalRepository'

export class GoalService {
  constructor(private readonly goalRepo: GoalRepository) {}

  listGoals() {
    return this.goalRepo.findMany()
  }

  getGoal(id: number) {
    return this.goalRepo.findById(id)
  }
}
