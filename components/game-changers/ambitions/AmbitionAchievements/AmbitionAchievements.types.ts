import { AchievementProgressStatus, GoalAAA } from '@/domain/goal'

export type Achievement = GoalAAA & {
  progress: AchievementProgressStatus | null
}

export interface AmbitionAchievementsProps {
  achievements: Achievement[]
  defaultOpen?: boolean
  onAchievementChange?: (achievements: Achievement[]) => void
  className?: string
}
