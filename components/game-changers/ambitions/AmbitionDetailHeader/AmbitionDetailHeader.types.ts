import type { GoalType } from '@/domain/goal'

export interface AmbitionDetailHeaderProps {
  title: string
  userName: string
  avatarUrl?: string
  ambitionType?: GoalType | string
  progress: number
  createdDate?: string
  updatedDate?: string
  className?: string
}
