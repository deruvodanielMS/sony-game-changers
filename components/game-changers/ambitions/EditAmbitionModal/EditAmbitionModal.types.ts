import type { GoalUI } from '@/domain/goal'

export interface EditAmbitionModalProps {
  open: boolean
  onClose: () => void
  goal: GoalUI | null
  'data-test-id'?: string
}
