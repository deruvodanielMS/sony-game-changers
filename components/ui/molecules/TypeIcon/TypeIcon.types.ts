import type { LucideIcon } from 'lucide-react'

export type AmbitionType = 'business' | 'manager-effectiveness' | 'personal-growth-and-development'

export interface TypeIconProps {
  /**
   * Type of ambition which determines the icon displayed
   */
  type: AmbitionType

  /**
   * Custom icon to override the default icon for the type
   */
  icon?: LucideIcon

  /**
   * Size of the icon container
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Custom gradient colors (from, to)
   * @default ["#5577f4", "#d061ff"]
   */
  gradient?: [string, string]

  /**
   * Additional CSS classes for the container
   */
  className?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
