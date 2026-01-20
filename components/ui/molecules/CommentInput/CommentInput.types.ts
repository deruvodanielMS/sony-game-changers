export interface CommentInputProps {
  /**
   * Avatar image source URL
   */
  avatarSrc?: string | null

  /**
   * Avatar alt text (user name)
   */
  avatarAlt: string

  /**
   * Placeholder text for the textarea
   */
  placeholder?: string

  /**
   * Current value of the textarea (controlled)
   */
  value?: string

  /**
   * Default value of the textarea (uncontrolled)
   */
  defaultValue?: string

  /**
   * Callback when textarea value changes
   */
  onChange?: (value: string) => void

  /**
   * Callback when comment should be submitted (Ctrl+Enter by default)
   */
  onSubmit?: (value: string) => void

  /**
   * Callback when cancel button is clicked
   */
  onCancel?: () => void

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean

  /**
   * Custom height for the textarea
   */
  height?: string | number

  /**
   * Maximum character count
   */
  maxLength?: number

  /**
   * Whether to show character count
   * @default false
   */
  showCharCount?: boolean

  /**
   * Whether to show action buttons (Cancel/Save)
   * @default false
   */
  showActions?: boolean

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Avatar size
   * @default 'md'
   */
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Additional CSS classes for the container
   */
  className?: string

  /**
   * Additional CSS classes for the textarea
   */
  textareaClassName?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
