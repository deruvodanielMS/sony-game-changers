export interface ProgressBarProps {
  /**
   * Current progress percentage (0-100)
   */
  progress: number

  /**
   * Size variant of the progress bar
   * - L: 30px height (for headers)
   * - S: 20px height (for compact displays)
   * @default 'L'
   */
  size?: 'L' | 'S'

  /**
   * Status state that determines the color
   * - in-progress: Blue color (info-500)
   * - completed: Green color (success-500)
   * @default 'in-progress'
   */
  status?: 'in-progress' | 'completed'

  /**
   * Whether to show the percentage text
   * @default true
   */
  showPercentage?: boolean

  /**
   * Whether to animate the progress bar from 0 to the target value on mount
   * @default true
   */
  animate?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
