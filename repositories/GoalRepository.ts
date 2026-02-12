import { CreateGoalDTO, Goal, ManagerAmbitionsData, GoalFiltersData } from '@/domain/goal'

export interface GoalRepository {
  findGoals(email?: string): Promise<Goal[]>
  findGoalById(id: string): Promise<Goal | null>
  createGoal(goal: CreateGoalDTO): Promise<Goal>
  updateGoal(id: string, goal: CreateGoalDTO): Promise<Goal>
  deleteGoal(id: string): Promise<void>
  getManagerAmbitions(email?: string): Promise<ManagerAmbitionsData | null>
  getGoalFilters(): Promise<GoalFiltersData>
}
