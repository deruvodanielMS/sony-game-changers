import {
  CreateGoalDTO,
  UpdateGoalDTO,
  Goal,
  ManagerAmbitionsData,
  GoalFiltersData,
  GoalStatus,
} from '@/domain/goal'

export interface GoalRepository {
  findGoals(email?: string): Promise<Goal[]>
  findGoalById(id: string): Promise<Goal | null>
  createGoal(goal: CreateGoalDTO): Promise<Goal>
  updateGoal(id: string, goal: UpdateGoalDTO): Promise<Goal>
  deleteGoal(id: string): Promise<void>
  getManagerAmbitions(email?: string): Promise<ManagerAmbitionsData | null>
  getGoalFilters(): Promise<GoalFiltersData>
  updateGoalStatus(id: string, status: GoalStatus): Promise<Goal>
}
