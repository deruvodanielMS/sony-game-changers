import type { TeamMember } from '@/components/team/TeamMemberCard'

export type ViewMode = 'grid' | 'list'

export interface TeamViewProps {
  /**
   * Array of team members to display
   */
  members: TeamMember[]

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
}
