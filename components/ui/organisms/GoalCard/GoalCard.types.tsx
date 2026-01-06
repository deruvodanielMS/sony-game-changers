import type { Ambition } from '@/domain/ambition'

export type GoalCardProps = {
  goal: Ambition
  ladderGoals: Omit<Ambition, 'ladderedGoals'>[]
  allowAddChildrenGoals?: boolean
  'data-testid'?: string
}
