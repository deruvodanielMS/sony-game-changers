export interface AppLayoutBaseProps {
  /**
   * Main content area (pages)
   */
  children: React.ReactNode
  /**
   * Optional header slot
   */
  header?: React.ReactNode
  /**
   * Optional sidebar slot
   */
  sidebar?: React.ReactNode
  /**
   * Optional footer slot
   */
  footer?: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Whether sidebar is collapsed (for dynamic grid)
   */
  sidebarCollapsed?: boolean
}
