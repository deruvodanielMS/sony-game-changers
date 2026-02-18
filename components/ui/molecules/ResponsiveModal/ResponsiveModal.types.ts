import type { ModalSize } from '../Modal/Modal.types'
import type { DrawerSize } from '../../atoms/Drawer/Drawer.types'

export interface ResponsiveModalProps {
  /** Controls visibility of the modal/drawer */
  open: boolean
  /** Callback when the modal/drawer is closed */
  onClose: () => void
  /** Title displayed in the header */
  title: string
  /** Main content of the modal/drawer */
  children: React.ReactNode
  /** Footer actions (buttons) - used with standard ModalFooter */
  actions?: React.ReactNode
  /**
   * Custom footer content that replaces the standard ModalFooter.
   * Use this when you need full control over footer styling (e.g., negative margins, borders).
   * When provided, `actions` is ignored for desktop Modal (but still used for mobile Drawer).
   */
  customFooter?: React.ReactNode
  /** Size for desktop modal (default: 'md') */
  desktopSize?: ModalSize
  /** Size for mobile drawer (default: 'md') */
  mobileSize?: DrawerSize
  /** Whether clicking the overlay closes the modal/drawer (default: true) */
  overlayClose?: boolean
  /** Enable focus trap (default: false) */
  focusTrap?: boolean
  /** Additional class name for the content container */
  className?: string
  /** Additional class name for the body content on mobile */
  mobileBodyClassName?: string
  /** Accessible label for the modal/drawer */
  'aria-label'?: string
  /** Test id for e2e testing */
  'data-test-id'?: string
}
