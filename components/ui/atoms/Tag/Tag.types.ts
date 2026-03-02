import type { VariantProps } from 'class-variance-authority'
import type { tagVariants } from './Tag'

interface TagBaseProps extends VariantProps<typeof tagVariants> {
  /** The text label to display */
  label: string
  className?: string
  'data-test-id'?: string
}

/**
 * When `onRemove` is provided, `removeAriaLabel` is required to ensure
 * screen-reader labels are always internationalized at the call site.
 */
export type TagProps = TagBaseProps &
  (
    | { onRemove?: undefined; removeAriaLabel?: never }
    | { onRemove: () => void; removeAriaLabel: string }
  )
