import type { GoalUI, GoalType } from '@/domain/goal'
import type { NewAmbitionShareMember } from '@/repositories/mocks/data/goals'

export interface AmbitionFormData {
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

interface AmbitionFormBaseProps {
  className?: string
  'data-test-id'?: string
  step?: number
  onValidationChange?: (isValid: boolean) => void
  onSubmit?: (formData: AmbitionFormData) => void
  onFormDataChange?: (formData: AmbitionFormData) => void
  validateRef?: React.MutableRefObject<(() => boolean) | null>
}

export type AmbitionFormProps = AmbitionFormBaseProps &
  (
    | { mode: 'create'; parentAmbitionId?: string; goal?: never }
    | { mode: 'edit'; goal: GoalUI; parentAmbitionId?: never }
  )
