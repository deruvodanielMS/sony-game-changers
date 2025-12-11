import type * as SelectPrimitive from '@radix-ui/react-select'
import type { ReactNode } from 'react'

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

export type SelectFieldSize = 'sm' | 'md' | 'lg'

export interface SelectFieldProps extends Omit<
  SelectPrimitive.SelectProps,
  'children' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled'
> {
  /**
   * Options to render as Radix Select.Items.
   * If provided, these will be used instead of `children`.
   */
  options?: SelectOption[]

  /**
   * Placeholder shown when no value is selected.
   */
  placeholder?: string

  /**
   * Controlled value.
   */
  value?: string

  /**
   * Uncontrolled initial value.
   */
  defaultValue?: string

  /**
   * Called when selected value changes.
   */
  onValueChange?: (value: string) => void

  /**
   * Disable the entire select.
   */
  disabled?: boolean

  /**
   * Optional custom icon for dropdown arrow.
   * If not provided, a default chevron icon will be used.
   */
  icon?: ReactNode

  /**
   * Extra classes for the trigger (field-like element).
   */
  className?: string

  /**
   * Extra classes for the dropdown content.
   */
  contentClassName?: string

  /**
   * ID used to associate an external label element via htmlFor.
   * Applied to the Radix Trigger.
   */
  id?: string

  /**
   * Data attribute for testing.
   * Applied to the Radix Trigger as data-test-id.
   */
  'data-testid'?: string

  /**
   * Custom children to allow full composition.
   * Ignored when `options` is provided.
   */
  children?: ReactNode
}
