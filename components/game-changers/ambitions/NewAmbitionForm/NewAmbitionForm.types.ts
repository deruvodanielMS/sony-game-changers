import type { AmbitionFormData } from '@/components/game-changers/ambitions/AmbitionForm'

/** @deprecated Use AmbitionFormData instead */
export type NewAmbitionFormData = AmbitionFormData

export interface NewAmbitionFormProps {
  className?: string
  'data-test-id'?: string
  step?: number
  /** Pre-select parent ambition for laddering */
  parentAmbitionId?: string
  onValidationChange?: (isValid: boolean) => void
  onSubmit?: (formData: NewAmbitionFormData) => void
  onFormDataChange?: (formData: NewAmbitionFormData) => void
  validateRef?: React.MutableRefObject<(() => boolean) | null>
}
