export type ManagerAmbitionItem = {
  id: string
  title: string
}

export type ManagerAmbitionsProps = {
  /**
   * Title displayed at the top of the card
   */
  title: string

  /**
   * List of manager ambitions to display
   */
  ambitions: ManagerAmbitionItem[]

  /**
   * Callback when user clicks "Add laddered Ambition" for a specific ambition
   */
  onAddLaddered: (ambitionId: string) => void

  /**
   * Callback when user dismisses/closes the card
   */
  onDismiss: () => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
}
