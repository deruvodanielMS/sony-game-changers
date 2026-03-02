/**
 * All color/semantic variants.
 * - counter/dot types: error | error-dark | neutral | default
 * - icon type: pending | success | info | warning | error
 */
export type BadgeVariant =
  | 'error'
  | 'error-dark'
  | 'neutral'
  | 'default'
  | 'pending'
  | 'success'
  | 'info'
  | 'warning'

export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  /** counter: shows a number · icon: shows a semantic icon · dot: small indicator */
  type: 'counter' | 'icon' | 'dot'
  /** Color/semantic variant. Icon type also determines which icon to show. */
  variant?: BadgeVariant
  /** Number to display (counter type only). When undefined renders a dot. */
  count?: number
  /** Max value before showing `+{max}`. Defaults to 9. */
  max?: number
  /** Icon size (icon type only). Defaults to 'md'. */
  size?: BadgeSize
  /** Accessible label. Defaults to stringified count or variant name. */
  'aria-label'?: string
  className?: string
}
