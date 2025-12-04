import { Goal } from '@/types/goals'

export type GoalCardProps = {
  goal: Goal
  ladderGoals: Goal[]
  allowAddChildrenGoals?: boolean
  'data-testid'?: string
}
