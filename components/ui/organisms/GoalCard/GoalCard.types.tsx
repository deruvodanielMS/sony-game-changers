import type { Goal } from '@/domain/goal'
import type { ParentAmbition } from '@/components/ui/organisms/LadderingModal'

export type GoalCardProps = {
  goal: Goal
  ladderGoals: Omit<Goal, 'parent'>[]
  allowAddChildrenGoals?: boolean
  onAddLadderedGoal?: () => void
  parentAmbitions?: ParentAmbition[]
  'data-testid'?: string
}
