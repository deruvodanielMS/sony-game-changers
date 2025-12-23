export const GOAL_STATUSES = {
  COMPLETED: 'completed',
  DRAFT: 'draft',
  AWAITING_APPROVAL: 'awaiting_approval',
} as const

export const GOAL_TYPES = {
  BUSINESS: 'business',
  PERSONAL_GROWTH_AND_DEVELOPMENT: 'personal_growth_and_development',
  MANAGER_EFFECTIVENESS: 'manager_effectiveness',
} as const

export type GoalStatus = (typeof GOAL_STATUSES)[keyof typeof GOAL_STATUSES]

export type GoalType = (typeof GOAL_TYPES)[keyof typeof GOAL_TYPES]

export type Goal = {
  id: string
  title: string
  status: GoalStatus
  userName: string
  goalType?: GoalType
  description?: string
  avatarUrl?: string
}
