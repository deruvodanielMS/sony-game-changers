export interface SidebarNavItemProps {
  /** Icon element to display */
  icon: React.ReactNode
  /** Label text for the nav item */
  label: string
  /** Whether this nav item is currently active */
  isActive?: boolean
  /** Whether the sidebar is in collapsed state */
  isCollapsed?: boolean
  /** Navigation href */
  href?: string
  /** Click handler */
  onClick?: () => void
  /** Optional badge content */
  badge?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Unique test ID for end-to-end testing */
  'data-test-id'?: string
}
