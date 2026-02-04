import type { GoalType } from '@/domain/goal'

export interface MainAmbitionProps {
  title: string
  userName: string
  avatarUrl?: string | null
  goalType?: GoalType | string
  progress: number
  href: string
  showLadderedIndicator?: boolean
  className?: string
}
