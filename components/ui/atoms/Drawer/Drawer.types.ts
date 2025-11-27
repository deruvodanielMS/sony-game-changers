export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  overlayClose?: boolean
  position?: DrawerPosition
  size?: DrawerSize
  focusTrap?: boolean
  showClose?: boolean
  hideCloseOnMobile?: boolean
  children?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  'aria-label'?: string
  /** Passthrough test id for e2e testing */
  'data-test-id'?: string
}
