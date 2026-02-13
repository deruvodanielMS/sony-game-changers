export interface NewAmbitionModalProps {
  open: boolean
  onClose: () => void
  /** Pre-select parent ambition for laddering */
  parentAmbitionId?: string
  'data-test-id'?: string
}
