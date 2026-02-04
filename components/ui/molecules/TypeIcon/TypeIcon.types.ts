import type { LucideIcon } from 'lucide-react'
import type { GoalType as DomainGoalType } from '@/domain/goal'

export type AmbitionType = DomainGoalType

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
   * - higher: 32px container with white background, info-500 border, and gradient icon (for HigherAmbition)
   * @default "badge"
   */
  variant?: 'badge' | 'metadata' | 'higher'

  /**
   * Additional CSS classes for the container
   */
  className?: string

  /**
   * Custom tooltip text. If not provided, will use i18n translation based on type
   */
  tooltip?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
