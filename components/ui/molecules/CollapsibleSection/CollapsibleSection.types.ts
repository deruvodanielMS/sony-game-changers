import type { ReactNode } from 'react'

export interface CollapsibleSectionProps {
  /** The title displayed in the header (ignored if renderTrigger is provided) */
  title?: string

  /** Custom render function for the trigger button */
  renderTrigger?: (open: boolean) => ReactNode

  /** The content to display when expanded */
  children: ReactNode

  /** Whether the section is open by default (uncontrolled) */
  defaultOpen?: boolean

  /** Controlled open state */
  open?: boolean

  /** Callback when toggle is clicked */
  onToggle?: (open: boolean) => void

  /** Additional CSS classes */
  className?: string

  /** Additional CSS classes for the content wrapper */
  contentClassName?: string
}
