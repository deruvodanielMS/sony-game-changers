export interface Achievement {
  id: string | number
  text: string
  completed: boolean
  progress: 'not-started' | 'on-track' | 'off-track' | null
}

export interface AmbitionAchievementsProps {
  achievements: Achievement[]
  defaultOpen?: boolean
  onAchievementChange?: (achievements: Achievement[]) => void
  className?: string
}
