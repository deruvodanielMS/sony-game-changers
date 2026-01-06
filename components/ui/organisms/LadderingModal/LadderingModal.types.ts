import type { Ambition } from '@/domain/ambition'

export interface LadderingModalProps {
  open: boolean
  onClose: () => void
  selectedGoal: Ambition
  'data-testid'?: string
}

export interface AmbitionCardProps {
  avatarUrl: string
  title: string
  userName: string
  onLink?: () => void
  'data-testid'?: string
}

export interface GoalPreviewCardProps {
  goal: Ambition
  'data-testid'?: string
}
