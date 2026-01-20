export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean

  /**
   * Default checked state for uncontrolled usage
   */
  defaultChecked?: boolean

  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean

  /**
   * Whether the checkbox is required
   */
  required?: boolean

  /**
   * Name attribute for form submission
   */
  name?: string

  /**
   * Value attribute for form submission
   */
  value?: string

  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Additional CSS classes for the root element
   */
  className?: string

  /**
   * Accessible label (if not using external label)
   */
  'aria-label'?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
