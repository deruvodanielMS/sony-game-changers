import { GoalType } from '@/domain/goal'
import type { NewAmbitionShareMember } from '@/repositories/mocks/data/goals'

export interface NewAmbitionFormData {
  // Step 1
  goalType: GoalType
  owner: string
  privacy: 'public' | 'private'
  sharedMembers: NewAmbitionShareMember[]
  // Step 2
  ladderedFrom?: string
  ambitionName: string
  actions: string[]
  achievements: string[]
}

export interface NewAmbitionFormProps {
  className?: string
  'data-test-id'?: string
  step?: number
  onValidationChange?: (isValid: boolean) => void
  onSubmit?: (formData: NewAmbitionFormData) => void
  onFormDataChange?: (formData: NewAmbitionFormData) => void
  validateRef?: React.MutableRefObject<(() => boolean) | null>
}
