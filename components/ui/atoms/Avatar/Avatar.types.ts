export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string | null

  /**
   * Alternative text for the image
   */
  alt: string

  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: 'circle' | 'square'

  /**
   * Fallback to show when no src is provided.
   * If not provided, will generate initials from alt text.
   */
  fallback?: React.ReactNode

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
