export interface AmbitionActionModalProps {
  /**
   * Controls the visibility of the modal
   */
  open: boolean
  /**
   * Callback when the modal is closed
   */
  onClose: () => void
  /**
   * Callback when the action is confirmed
   * @param comment - Optional comment provided by the user
   */
  onConfirm: (comment?: string) => void | Promise<void>
  /**
   * Whether the action is currently being processed
   */
  isLoading?: boolean
}
