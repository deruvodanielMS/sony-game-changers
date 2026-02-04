import type { Goal } from '@/domain/goal'

export interface LadderingModalProps {
  open: boolean
  onClose: () => void
  selectedGoal: Goal
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
  goal: Goal
  'data-testid'?: string
}
