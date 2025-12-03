export interface SidebarProps {
  /** Whether the sidebar is in collapsed state */
  isCollapsed?: boolean
  /** Callback function when toggle button is clicked */
  onToggle?: () => void
  /** Callback function when a navigation item is clicked */
  onNavigate?: () => void
  /** Custom logo element to display instead of default PlayStation logo */
  logo?: React.ReactNode
  /** Hide the logo section completely */
  hideLogo?: boolean
  /** Hide the toggle/collapse button */
  hideToggle?: boolean
  /** Hide the right border */
  hideBorder?: boolean
  /** Remove internal padding (useful when sidebar is inside a drawer) */
  noPadding?: boolean
  /** Unique test ID for end-to-end testing */
  'data-test-id'?: string
}
