import type { GoalType, GoalStatus } from '@/domain/goal'

export interface AmbitionDetailHeaderProps {
  title: string
  userName: string
  avatarUrl?: string
  ambitionType?: GoalType | string
  /**
   * The status of the ambition (draft, awaiting_approval, approved, completed, archived)
   * Used to determine whether to show status text or progress bar
   */
  status?: GoalStatus | string
  progress: number
  createdDate?: string
  updatedDate?: string
  className?: string
}
