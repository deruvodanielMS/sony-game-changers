export interface AmbitionStatusProps {
  /**
   * The content to display inside the status tag
   */
  children: React.ReactNode

  /**
   * Visual variant of the status tag
   * @default 'default'
   */
  variant?: 'default' | 'draft' | 'awaiting-approval' | 'in-progress' | 'done' | 'archived'

  /**
   * Size of the status tag
   * @default 'md'
   */
  size?: 'sm' | 'md'

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
