import type { ReactNode } from 'react'

export interface CollapsibleSectionProps {
  /** The title displayed in the header */
  title: string

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
}
