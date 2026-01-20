export interface MetadataDisplayProps {
  /**
   * User name who created or owns the item
   */
  userName: string

  /**
   * User's avatar URL
   */
  avatarUrl?: string

  /**
   * Creation date text
   */
  createdDate?: string

  /**
   * Last updated date text
   */
  updatedDate?: string

  /**
   * Show info icon with tooltip
   * @default false
   */
  showInfo?: boolean

  /**
   * Info tooltip content
   */
  infoTooltip?: string

  /**
   * Size variant for mobile/desktop
   * @default "md"
   */
  size?: 'sm' | 'md'

  /**
   * Avatar size
   * @default "sm"
   */
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Custom translation for "Created by"
   * @default "Created by"
   */
  createdByLabel?: string

  /**
   * Custom translation for "on"
   * @default "on"
   */
  onLabel?: string

  /**
   * Custom translation for "Last updated"
   * @default "Last updated"
   */
  lastUpdatedLabel?: string

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
