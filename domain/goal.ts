export const GOAL_STATUSES = {
  DRAFT: 'draft',
  AWAITING_APPROVAL: 'awaiting_approval',
  APPROVED: 'approved', // Shows as "In Progress" in UI
  ARCHIVED: 'archived',
  COMPLETED: 'completed', // Kept for backward compatibility
} as const

export const GOAL_TYPES = {
  BUSINESS: 'business',
  PERSONAL_GROWTH_AND_DEVELOPMENT: 'personal_growth_and_development',
  MANAGER_EFFECTIVENESS: 'manager_effectiveness',
} as const

export const ACHIEVEMENT_PROGRESS_STATUSES = {
  NOT_STARTED: 'not-started',
  ON_TRACK: 'on-track',
  OFF_TRACK: 'off-track',
} as const

export type AchievementProgressStatus =
  (typeof ACHIEVEMENT_PROGRESS_STATUSES)[keyof typeof ACHIEVEMENT_PROGRESS_STATUSES]

export type GoalStatus = (typeof GOAL_STATUSES)[keyof typeof GOAL_STATUSES]

export type GoalType = (typeof GOAL_TYPES)[keyof typeof GOAL_TYPES]

// Valid status transitions map
export const GOAL_STATUS_TRANSITIONS: Record<GoalStatus, GoalStatus[]> = {
  [GOAL_STATUSES.DRAFT]: [GOAL_STATUSES.AWAITING_APPROVAL, GOAL_STATUSES.ARCHIVED],
  [GOAL_STATUSES.AWAITING_APPROVAL]: [
    GOAL_STATUSES.APPROVED,
    GOAL_STATUSES.DRAFT,
    GOAL_STATUSES.ARCHIVED,
  ],
  [GOAL_STATUSES.APPROVED]: [GOAL_STATUSES.ARCHIVED, GOAL_STATUSES.COMPLETED],
  [GOAL_STATUSES.ARCHIVED]: [GOAL_STATUSES.DRAFT],
  [GOAL_STATUSES.COMPLETED]: [GOAL_STATUSES.ARCHIVED],
}

// Actions that require manager role
export const MANAGER_ONLY_ACTIONS: Array<{ from: GoalStatus; to: GoalStatus }> = [
  { from: GOAL_STATUSES.AWAITING_APPROVAL, to: GOAL_STATUSES.APPROVED },
  { from: GOAL_STATUSES.AWAITING_APPROVAL, to: GOAL_STATUSES.DRAFT }, // Send back
]

export type Goal = {
  id: string
  title: string
  status: GoalStatus | string
  goalType?: GoalType | string
  description?: string
  uid: string
  userName: string
  avatarUrl?: string | null
  progress: number
  createdAt: string
  updatedAt: string
  parent?: {
    id: string
    title: string
  }
}

export type GoalUI = Goal & {
  ladderedGoals: Omit<GoalUI, 'parent' | 'ladderedGoals'>[]
  goalAmbitions?: Array<GoalAAA>
  goalAchievements?: Array<GoalAAA & { progress: AchievementProgressStatus | null }>
  goalActions?: Array<GoalAAA>
}

export type GoalAmbitionsResponse = {
  id: string
  title: string
  body: string
  type: string
  status: string
  progress: number
  createdAt: string
  updatedAt: string
  people_assignedTo: {
    id: string
    name: string
    lastname: string
    profileImageUrl?: string
  }
  relations?: Omit<GoalAmbitionsResponse, 'relations'>[]
  parent?: {
    id: string
    title: string
  }
  goal_ambitions?: Array<GoalAAA>
  goal_achievements?: Array<GoalAAA & { progress: AchievementProgressStatus | null }>
  goal_actions?: Array<GoalAAA>
}

export type GoalAAA = {
  id: string
  title: string
  status: string
}

export type GoalDraft = Pick<Goal, 'title' | 'description' | 'goalType' | 'status'>

export type CreateGoalAchievementDTO = {
  title: string
  body?: string
  status?: string
  progress?: AchievementProgressStatus
}

export type CreateGoalActionDTO = {
  title: string
  body?: string
  status?: string
}

export type CreateGoalDTO = {
  title: string
  description?: string
  goalType: GoalType
  status: GoalStatus
  parentId?: string
  assignedTo: string
  createdBy?: string
  periodId: string
  progress: number
  goalAchievements: CreateGoalAchievementDTO[]
  goalActions: CreateGoalActionDTO[]
}

// Manager Ambitions - ambitions created by manager that may interest the user
export type ManagerAmbition = {
  id: string
  title: string
}

export type ManagerAmbitionsData = {
  title: string
  ambitions: ManagerAmbition[]
}

// Filter options for the ambitions list
export type AvatarFilterOption = {
  uid: string
  name: string
  url: string
  role?: string
}

export type FilterOption = {
  label: string
  value: string
}

export type GoalFilter = {
  label: string
  options: FilterOption[]
  single?: boolean
  'data-testid'?: string
}

export type GoalFiltersData = {
  avatarSelector: {
    options: AvatarFilterOption[]
    showItems: number
  }
  filters: GoalFilter[]
}

// DTO for updating goal status
export type UpdateGoalStatusDTO = {
  status: GoalStatus
  comment?: string // Optional comment for activity feed
}

// DTO for updating goal (edit)
export type UpdateGoalDTO = Partial<Omit<CreateGoalDTO, 'assignedTo' | 'createdBy' | 'periodId'>>
