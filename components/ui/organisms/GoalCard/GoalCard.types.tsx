import type { Goal } from '@/domain/goal'

export type GoalCardProps = {
  goal: Goal
  ladderGoals: Omit<Goal, 'parent'>[]
  allowAddChildrenGoals?: boolean
  'data-testid'?: string
}
