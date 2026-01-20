import type { LucideIcon } from 'lucide-react'
import type { AmbitionType as DomainAmbitionType } from '@/domain/ambition'

export type AmbitionType = DomainAmbitionType

export interface TypeIconProps {
  /**
   * Type of ambition which determines the icon displayed
   */
  type: AmbitionType | string

  /**
   * Custom icon to override the default icon for the type
   */
  icon?: LucideIcon

  /**
   * Visual variant of the icon
   * - badge: 48px container with neutral-100 background and neutral-1000 icon (for GoalCard)
   * - metadata: 24px container with neutral-600 background and neutral-0 icon (for AmbitionDetailHeader)
   * @default "badge"
   */
  variant?: 'badge' | 'metadata'

  /**
   * Additional CSS classes for the container
   */
  className?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
