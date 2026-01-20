export interface ProgressRingProps {
  /**
   * Progress percentage (0-100)
   */
  progress?: number

  /**
   * Size of the ring in pixels
   * @default 48
   */
  size?: number

  /**
   * Width of the ring stroke
   * @default 4
   */
  strokeWidth?: number

  /**
   * Color of the progress ring
   * @default '#9D7FFF'
   */
  color?: string

  /**
   * Color of the background ring
   * @default '#E8E4FF'
   */
  backgroundColor?: string

  /**
   * Whether to show the percentage text in the center
   * @default false
   */
  showPercentage?: boolean

  /**
   * Typography variant for the percentage text
   * @default 'h5'
   */
  percentageVariant?: 'h5' | 'h6' | 'body'

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}
