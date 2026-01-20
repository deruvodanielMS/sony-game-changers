import { ReactNode } from 'react'

export interface LadderGoalProps {
  /**
   * The text content of the laddered goal (parent ambition/goal description)
   */
  text?: string

  /**
   * Optional children for custom content (e.g., avatar + text + status)
   */
  children?: ReactNode

  /**
   * Optional click handler for navigation to parent
   */
  onClick?: () => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Size variant for the icon
   * @default 'default' (24px icon in 32px container)
   */
  size?: 'default' | 'small'
}
