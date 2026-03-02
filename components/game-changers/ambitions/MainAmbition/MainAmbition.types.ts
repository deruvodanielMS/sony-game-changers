import type { GoalType, GoalStatus } from '@/domain/goal'

export interface MainAmbitionProps {
  title: string
  userName: string
  avatarUrl?: string | null
  goalType?: GoalType | string
  /**
   * The status of the ambition (draft, awaiting_approval, approved, completed, archived)
   * Used to determine whether to show status text or progress bar
   */
  status?: GoalStatus | string
  progress: number
  href: string
  showLadderedIndicator?: boolean
  className?: string
}
