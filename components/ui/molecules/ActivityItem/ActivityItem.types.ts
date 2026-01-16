export interface ActivityItemProps {
  /**
   * User information
   */
  user: {
    name: string
    avatar?: string
  }

  /**
   * Date of the activity
   */
  date: string

  /**
   * Main content to display in the activity
   */
  children: React.ReactNode

  /**
   * Size variant for mobile/desktop
   * @default "md"
   */
  size?: 'sm' | 'md'

  /**
   * Avatar size
   * @default "md"
   */
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Additional CSS classes for the container
   */
  className?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
