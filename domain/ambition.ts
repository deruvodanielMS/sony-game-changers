export const AMBITION_STATUSES = {
  COMPLETED: 'completed',
  DRAFT: 'draft',
  AWAITING_APPROVAL: 'awaiting_approval',
} as const

export const AMBITION_TYPES = {
  BUSINESS: 'business',
  PERSONAL_GROWTH_AND_DEVELOPMENT: 'personal_growth_and_development',
  MANAGER_EFFECTIVENESS: 'manager_effectiveness',
} as const

export type AmbitionStatus = (typeof AMBITION_STATUSES)[keyof typeof AMBITION_STATUSES]

export type AmbitionType = (typeof AMBITION_TYPES)[keyof typeof AMBITION_TYPES]

export type Ambition = {
  id: string
  title: string
  status: AmbitionStatus | string
  userName: string
  ambitionType?: AmbitionType | string
  description?: string
  avatarUrl?: string | null
}

export type AmbitionUI = Ambition & {
  ladderedGoals: Omit<Ambition, 'ladderedGoals'>[]
}

export type AmbitionGoalResponse = {
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
  goal_ambitions?: Omit<Ambition, 'ladderedGoals'>[]
}

export type AmbitionDraft = Pick<Ambition, 'title' | 'description' | 'ambitionType' | 'status'>
