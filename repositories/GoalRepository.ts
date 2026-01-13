import { AmbitionUI } from '@/domain/ambition'

export interface GoalRepository {
  findMany(): Promise<AmbitionUI[]>
  findById(id: string): Promise<AmbitionUI | null>
}
