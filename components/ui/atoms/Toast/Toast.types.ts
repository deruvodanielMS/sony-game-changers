import { ReactNode } from 'react'

export type Toast = {
  id: string
  /** Custom content - can be any ReactNode */
  content?: ReactNode
  duration?: number // ms
  variant?: 'success' | 'error' | 'info'
  /** Title text - displayed in bold */
  title?: string
  /** Description text - displayed below the title */
  description?: string
  /** Optional message string - if provided, will be used with default icon */
  message?: string
  /** Whether to show the close button */
  showClose?: boolean
  /** Callback when close button is clicked */
  onClose?: () => void
}

export type ToastViewProps = Omit<Toast, 'id' | 'duration'>
