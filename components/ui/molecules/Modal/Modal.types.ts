export type ModalSize = 'sm' | 'md' | 'lg' | 'full'

export interface ModalProps {
  open: boolean
  onClose?: () => void
  overlayClose?: boolean
  size?: ModalSize
  focusTrap?: boolean
  children?: React.ReactNode
  className?: string
  'aria-label'?: string
}

export interface ModalHeaderProps {
  beforeTitle?: React.ReactNode
  children?: React.ReactNode
  showClose?: boolean
  onClose?: () => void
  className?: string
}

export interface ModalBodyProps {
  children?: React.ReactNode
  className?: string
}

export interface ModalFooterProps {
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}
