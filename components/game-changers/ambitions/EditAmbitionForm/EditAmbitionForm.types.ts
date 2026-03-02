import type { GoalUI } from '@/domain/goal'
import type { AmbitionFormData } from '@/components/game-changers/ambitions/AmbitionForm'

/** @deprecated Use AmbitionFormData instead */
export type EditAmbitionFormData = AmbitionFormData

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
