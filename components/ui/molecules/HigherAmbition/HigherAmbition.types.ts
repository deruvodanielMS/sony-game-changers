import type { AmbitionType } from '@/domain/ambition'

export interface HigherAmbitionProps {
  /**
   * The text content of the higher ambition (parent goal description)
   */
  text: string

  /**
   * The type of the parent goal (business, manager-effectiveness, personal-growth-and-development)
   */
  goalType?: AmbitionType | string

  /**
   * Optional click handler for navigation to parent goal
   */
  onClick?: () => void

  /**
   * Additional CSS classes
   */
  className?: string
}
