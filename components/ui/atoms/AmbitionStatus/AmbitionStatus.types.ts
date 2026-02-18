import type { GoalStatus } from '@/domain/goal'

/**
 * AmbitionStatus variant type
 */
export type AmbitionStatusVariant =
  | 'default'
  | 'draft'
  | 'awaiting-approval'
  | 'in-progress'
  | 'done'
  | 'archived'

export interface AmbitionStatusProps {
  /**
   * The content to display inside the status tag (used when showProgress is false)
   */
  children?: React.ReactNode

  /**
   * Visual variant of the status tag
   * @default 'default'
   */
  variant?: AmbitionStatusVariant

  /**
   * Size of the status tag
   * @default 'md'
   */
  size?: 'sm' | 'md'

  /**
   * Show progress bar instead of just text
   * @default false
   */
  showProgress?: boolean

  /**
   * Progress value (0-100), used when showProgress is true
   */
  progress?: number

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Test ID for testing purposes
   */
  'data-test-id'?: string
}

/**
 * Maps GoalStatus from domain to AmbitionStatus variant
 * Includes all possible status string variations from APIs
 */
export const STATUS_TO_VARIANT: Record<string, AmbitionStatusVariant> = {
  // Domain statuses (from GOAL_STATUSES)
  draft: 'draft',
  awaiting_approval: 'awaiting-approval',
  approved: 'in-progress', // Approved shows as "In Progress"
  archived: 'archived',
  completed: 'done',
  // Support display-style strings (from some APIs)
  'in progress': 'in-progress',
  in_progress: 'in-progress',
  'awaiting approval': 'awaiting-approval',
  done: 'done',
}

/**
 * Maps variant to display label
 */
export const VARIANT_TO_LABEL: Record<AmbitionStatusVariant, string> = {
  default: 'Unknown',
  draft: 'Draft',
  'awaiting-approval': 'Awaiting Approval',
  'in-progress': 'In Progress',
  done: 'Done',
  archived: 'Archived',
}

/**
 * Get the AmbitionStatus variant from a GoalStatus or string
 * This is the CENTRALIZED function to use everywhere for status → variant conversion
 *
 * @param status - GoalStatus from domain or any string status
 * @returns The corresponding AmbitionStatus variant
 *
 * @example
 * ```tsx
 * const variant = getStatusVariant('draft') // 'draft'
 * const variant = getStatusVariant('awaiting_approval') // 'awaiting-approval'
 * const variant = getStatusVariant('approved') // 'in-progress'
 * const variant = getStatusVariant('completed') // 'done'
 * ```
 */
export function getStatusVariant(status?: GoalStatus | string | null): AmbitionStatusVariant {
  if (!status) return 'default'

  // Normalize the status string
  const normalized = status.toLowerCase().trim()

  // Check direct mapping first
  if (normalized in STATUS_TO_VARIANT) {
    return STATUS_TO_VARIANT[normalized] || 'default'
  }

  // Fallback patterns
  if (normalized.includes('draft')) return 'draft'
  if (normalized.includes('awaiting') || normalized.includes('approval')) return 'awaiting-approval'
  if (normalized.includes('progress') || normalized === 'approved') return 'in-progress'
  if (normalized.includes('done') || normalized.includes('complete')) return 'done'
  if (normalized.includes('archive')) return 'archived'

  return 'default'
}

/**
 * Get the display label for a GoalStatus or string
 * This is the CENTRALIZED function to use everywhere for status → label conversion
 *
 * @param status - GoalStatus from domain or any string status
 * @returns The display label for the status
 *
 * @example
 * ```tsx
 * const label = getStatusLabel('draft') // 'Draft'
 * const label = getStatusLabel('awaiting_approval') // 'Awaiting Approval'
 * const label = getStatusLabel('approved') // 'In Progress'
 * const label = getStatusLabel('completed') // 'Done'
 * ```
 */
export function getStatusLabel(status?: GoalStatus | string | null): string {
  const variant = getStatusVariant(status)
  return VARIANT_TO_LABEL[variant]
}

/**
 * Determines if the status should show a progress bar or just text
 * Draft and Awaiting Approval statuses show text only
 * In Progress and Done statuses show progress bar
 *
 * @param status - GoalStatus from domain or any string status
 * @returns Whether to show progress bar
 *
 * @example
 * ```tsx
 * shouldShowProgress('draft') // false
 * shouldShowProgress('awaiting_approval') // false
 * shouldShowProgress('approved') // true
 * shouldShowProgress('completed') // true
 * ```
 */
export function shouldShowProgress(status?: GoalStatus | string | null): boolean {
  const variant = getStatusVariant(status)
  return variant === 'in-progress' || variant === 'done'
}

/**
 * Get the variant to use for progress bar based on progress percentage
 * If progress is 100%, use 'done', otherwise use the status variant
 *
 * @param status - GoalStatus from domain or any string status
 * @param progress - Progress percentage (0-100)
 * @returns The variant to use for the progress bar
 */
export function getProgressVariant(
  status?: GoalStatus | string | null,
  progress?: number,
): AmbitionStatusVariant {
  if (progress !== undefined && progress >= 100) {
    return 'done'
  }
  const variant = getStatusVariant(status)
  // For progress bar, map to in-progress if not already a progress-compatible variant
  if (variant === 'draft' || variant === 'awaiting-approval' || variant === 'archived') {
    return 'in-progress'
  }
  return variant
}
