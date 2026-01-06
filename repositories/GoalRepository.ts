import { Ambition } from '@/domain/ambition'

export interface GoalRepository {
  findMany(): Promise<Ambition[]>
  findById(id: string): Promise<Ambition | null>
}
