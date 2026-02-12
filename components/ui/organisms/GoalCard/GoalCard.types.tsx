import type { Goal } from '@/domain/goal'

export type GoalCardProps = {
  goal: Goal
  ladderGoals: Omit<Goal, 'parent'>[]
  allowAddChildrenGoals?: boolean
  onAddLadderedGoal?: () => void
  'data-testid'?: string
}
