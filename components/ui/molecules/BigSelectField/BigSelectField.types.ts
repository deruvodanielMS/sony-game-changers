import type * as SelectPrimitive from '@radix-ui/react-select'
import type { ReactNode } from 'react'

export type BigSelectOption = {
  value: string
  label: string
  description?: string
  avatar?: string
  icon?: ReactNode
  disabled?: boolean
}

export interface BigSelectFieldProps extends Omit<
  SelectPrimitive.SelectProps,
  'children' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled'
> {
  /**
   * Options to render in the select dropdown.
   */
  options: BigSelectOption[]

  /**
   * Label text displayed above the select field.
   */
  label?: string

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
   * Error message to display below the field.
   */
  error?: string

  /**
   * Whether the field is required.
   */
  required?: boolean

  /**
   * Additional className for the root container.
   */
  className?: string

  /**
   * Additional className for the trigger.
   */
  triggerClassName?: string

  /**
   * Default icon to show when no option is selected.
   */
  placeholderIcon?: ReactNode

  /**
   * If true, hides the default user icon in placeholder state.
   */
  hidePlaceholderIcon?: boolean

  /**
   * If true, hides the description in the dropdown list but shows it when selected.
   */
  hideDescriptionInDropdown?: boolean

  /**
   * Test ID for testing purposes.
   */
  'data-test-id'?: string
}
