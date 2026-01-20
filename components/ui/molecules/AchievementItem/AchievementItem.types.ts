export type ProgressStatus = 'not-started' | 'on-track' | 'off-track' | null

export interface AchievementItemProps {
  /**
   * Achievement text/description
   */
  text: string

  /**
   * Whether the achievement is completed
   * @default false
   */
  completed?: boolean

  /**
   * Progress status when not completed
   */
  progress?: ProgressStatus

  /**
   * Callback when checkbox is toggled
   */
  onToggle?: (completed: boolean) => void

  /**
   * Callback when progress status changes
   */
  onProgressChange?: (progress: ProgressStatus) => void

  /**
   * Show progress selector
   * @default true
   */
  showProgressSelector?: boolean

  /**
   * Size variant for mobile/desktop
   * @default "md"
   */
  size?: 'sm' | 'md'

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing
   */
  'data-test-id'?: string
}
