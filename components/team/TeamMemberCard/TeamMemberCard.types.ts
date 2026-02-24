export interface TeamMember {
  uid: string
  name: string
  url: string
  role?: string
}

export interface TeamMemberCardProps {
  /**
   * Member name
   */
  name: string

  /**
   * Avatar URL
   */
  avatarUrl?: string

  /**
   * Role/job title
   */
  role?: string

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string

  /**
   * Click handler — called when the card is clicked
   */
  onClick?: () => void
}
