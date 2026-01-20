export interface BadgeProps {
  /**
   * The content to display inside the badge
   */
  children: React.ReactNode

  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'draft'
    | 'awaiting-approval'
    | 'approved'
    | 'in-progress'
    | 'on-track'
    | 'off-track'
    | 'completed'
    | 'archived'
    | 'not-started'

  /**
   * Size of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
