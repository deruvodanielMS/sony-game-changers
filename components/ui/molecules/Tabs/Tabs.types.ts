export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  value: string

  /**
   * Label to display
   */
  label: string

  /**
   * Optional icon to display before label
   */
  icon?: React.ReactNode

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[]

  /**
   * Currently active tab value
   */
  value: string

  /**
   * Callback when tab changes
   */
  onChange: (value: string) => void

  /**
   * Additional CSS classes for the container
   */
  className?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
