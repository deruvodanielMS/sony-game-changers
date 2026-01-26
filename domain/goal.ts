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
  status: GoalStatus | string
  userName: string
  goalType?: GoalType | string
  description?: string
  avatarUrl?: string | null
  parent?: {
    id: string
    title: string
  }
}

export type GoalUI = Goal & {
  ladderedGoals: Omit<Goal, 'parent'>[]
}

export type GoalAmbitionsResponse = {
  id: string
  title: string
  body: string
  type: string
  status: string
  people_assignedTo: {
    name: string
    lastname: string
    profileImageUrl?: string
  }
  relations?: Omit<GoalAmbitionsResponse, 'relations'>[]
  parent?: {
    id: string
    title: string
  }
}

export type GoalDraft = Pick<Goal, 'title' | 'description' | 'goalType' | 'status'>
