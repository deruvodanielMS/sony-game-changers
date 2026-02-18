import type { GoalType, GoalUI } from '@/domain/goal'
import type { NewAmbitionShareMember } from '@/repositories/mocks/data/goals'

export type PrivacyValue = 'public' | 'private'

export type InputItem = { id: string; value: string }

/**
 * Base form data shared between Create and Edit ambition forms
 */
export interface BaseAmbitionFormData {
  // Step 1
  goalType: GoalType
  owner: string
  privacy: PrivacyValue
  sharedMembers: NewAmbitionShareMember[]
  // Step 2
  ladderedFrom?: string
  ambitionName: string
  actions: string[]
  achievements: string[]
}

/**
 * Edit form extends base with description field
 */
export interface EditAmbitionFormData extends BaseAmbitionFormData {
  description?: string
}

/**
 * New form uses base data directly
 */
export type NewAmbitionFormData = BaseAmbitionFormData

/**
 * Configuration for initializing the form
 */
export interface AmbitionFormConfig {
  /** Initial goal data for edit mode */
  initialGoal?: GoalUI
  /** Parent ambition ID for laddering (new form) */
  parentAmbitionId?: string
}

/**
 * Validation errors state
 */
export interface AmbitionFormErrors {
  owner: boolean
  ladderedFrom: boolean
  ambitionName: boolean
  actions: boolean
  achievements: boolean
}

/**
 * Form state returned by useAmbitionForm hook
 */
export interface AmbitionFormState {
  // Step 1
  goalType: GoalType
  owner: string
  privacy: PrivacyValue
  sharedMembers: NewAmbitionShareMember[]
  // Step 2
  ladderedFrom: string
  ambitionName: string
  description: string
  actions: InputItem[]
  achievements: InputItem[]
  // Validation
  errors: AmbitionFormErrors
}

/**
 * Handlers returned by useAmbitionForm hook
 */
export interface AmbitionFormHandlers {
  // Step 1 handlers
  setGoalType: (type: GoalType) => void
  setOwner: (value: string) => void
  setPrivacy: (value: PrivacyValue) => void
  setSharedMembers: React.Dispatch<React.SetStateAction<NewAmbitionShareMember[]>>
  // Step 2 handlers
  setLadderedFrom: (value: string) => void
  setAmbitionName: (value: string) => void
  setDescription: (value: string) => void
  // Actions handlers
  addAction: () => void
  removeAction: (id: string) => void
  updateAction: (id: string, value: string) => void
  // Achievements handlers
  addAchievement: () => void
  removeAchievement: (id: string) => void
  updateAchievement: (id: string, value: string) => void
  // Validation
  validate: (step: number) => boolean
  clearError: (field: keyof AmbitionFormErrors) => void
}

/**
 * Return type of useAmbitionForm hook
 */
export interface UseAmbitionFormReturn {
  state: AmbitionFormState
  handlers: AmbitionFormHandlers
  /** Get form data for submission */
  getFormData: () => EditAmbitionFormData
  /** Check if current step is valid (without showing errors) */
  isStepValid: (step: number) => boolean
}
