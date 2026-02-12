import type { Goal, GoalStatus } from '@/domain/goal'

export interface ParentAmbition {
  id: string
  title: string
  userName: string
  avatarUrl?: string
}

export interface LadderingModalProps {
  open: boolean
  onClose: () => void
  selectedGoal: Goal
  parentAmbitions?: ParentAmbition[]
  'data-testid'?: string
}

export interface AmbitionCardProps {
  avatarUrl?: string
  title: string
  userName: string
  onLink?: () => void
  'data-testid'?: string
}

export interface GoalPreviewCardProps {
  goal: Goal
  'data-testid'?: string
}
