import type { ReactNode } from 'react'

export type EmptyStateVariant = 'default' | 'compact'

export interface EmptyStateProps {
  /** Main title text - displayed in bold */
  title: string
  /** Description text - displayed in secondary color */
  description?: string
  /** Call to action button text */
  actionLabel?: string
  /** Icon to display before the action button text */
  actionIcon?: ReactNode
  /** Callback when action button is clicked */
  onAction?: () => void
  /** Size variant: 'default' fills available space, 'compact' has 24px padding */
  variant?: EmptyStateVariant
  /** Additional CSS classes */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}
