import { ReactNode } from 'react'

export interface DropdownMenuItem {
  label: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'danger'
}

export interface DropdownMenuProps {
  /** The trigger element that opens the dropdown */
  trigger: ReactNode
  /** Menu items to display */
  items: DropdownMenuItem[]
  /** Alignment of the dropdown relative to the trigger */
  align?: 'start' | 'center' | 'end'
  /** Side of the trigger to render the dropdown */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Additional class name for the content */
  className?: string
  /** Test ID for testing */
  'data-test-id'?: string
}
