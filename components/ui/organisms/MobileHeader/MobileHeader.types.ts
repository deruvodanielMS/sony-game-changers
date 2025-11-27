export interface MobileHeaderProps {
  onMenuClick: () => void
  menuOpen: boolean
  /** Unique test ID for end-to-end testing */
  'data-test-id'?: string
}
