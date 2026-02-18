import type { GoalType } from '@/domain/goal'
import type { GoalUI } from '@/domain/goal'
import type { NewAmbitionShareMember } from '@/repositories/mocks/data/goals'

export interface EditAmbitionFormData {
  // Step 1
  goalType: GoalType
  owner: string
  privacy: 'public' | 'private'
  sharedMembers: NewAmbitionShareMember[]
  // Step 2
  ladderedFrom?: string
  ambitionName: string
  description?: string
  actions: string[]
  achievements: string[]
}

export interface EditAmbitionFormProps {
  goal: GoalUI
  className?: string
  'data-test-id'?: string
  step?: number
  onValidationChange?: (isValid: boolean) => void
  onSubmit?: (formData: EditAmbitionFormData) => void
  onFormDataChange?: (formData: EditAmbitionFormData) => void
  validateRef?: React.MutableRefObject<(() => boolean) | null>
}
