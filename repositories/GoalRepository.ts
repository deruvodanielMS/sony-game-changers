import { Goal } from '@/domain/goal'

export interface GoalRepository {
  findMany(): Promise<Goal[]>
  findById(id: number): Promise<Goal | null>
}
