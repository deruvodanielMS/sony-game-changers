import type { VariantProps } from 'class-variance-authority'
import type { tagVariants } from './Tag'

export interface TagProps extends VariantProps<typeof tagVariants> {
  /** The text label to display */
  label: string
  /** Called when the × button is clicked. If omitted, no × is shown */
  onRemove?: () => void
  /** Accessible label for the remove button */
  removeAriaLabel?: string
  className?: string
  'data-test-id'?: string
}
