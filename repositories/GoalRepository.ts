import { Goal } from '@/domain/goal'

export interface GoalRepository {
  findMany(email?: string): Promise<Goal[]>
  findById(id: string): Promise<Goal | null>
}
