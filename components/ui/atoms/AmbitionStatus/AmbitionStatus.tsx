'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { useAnimatedProgress } from '@/hooks/useAnimatedProgress'
import type { AmbitionStatusProps } from './AmbitionStatus.types'
import { VARIANT_TO_LABEL } from './AmbitionStatus.types'

/**
 * AmbitionStatus variants based on Figma Status design
 * Status tags have NO background, only colored bold text
 * Padding: 8px horizontal, 4px vertical
 *
 * Colors:
 * - Draft: Warning-500 (orange)
 * - Awaiting Approval: Extra-Pink-500 (pink)
 * - In Progress: Info-500 (blue)
 * - Done: Success-500 (green)
 * - Archived: Neutral-500 (gray)
 */
const ambitionStatusVariants = cva(
  'inline-flex items-center justify-center gap-2.5 px-0_5 py-0_25 font-bold whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'text-neutral-500',
        draft: 'text-feedback-warning-500',
        'awaiting-approval': 'text-extra-pink-500',
        'in-progress': 'text-feedback-info-500',
        done: 'text-feedback-success-500',
        archived: 'text-neutral-500',
      },
      size: {
        sm: 'text-[length:var(--font-size-body-small)] leading-[var(--line-height-body-small)]',
        md: 'text-[length:var(--font-size-body)] leading-[var(--line-height-body)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

/**
 * Progress bar fill variants matching status colors
 */
const progressFillVariants = cva('absolute left-0 top-0 h-full rounded-full z-0', {
  variants: {
    variant: {
      default: 'bg-neutral-200',
      draft: 'bg-feedback-warning-200',
      'awaiting-approval': 'bg-extra-pink-200',
      'in-progress': 'bg-extra-blue-200',
      done: 'bg-extra-green-200',
      archived: 'bg-neutral-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

/**
 * Progress text variants
 */
const progressTextVariants = cva('font-bold absolute right-1 top-1/2 -translate-y-1/2 z-10', {
  variants: {
    size: {
      sm: 'text-body-tiny leading-body-tiny',
      md: 'text-body-tiny leading-body-tiny',
    },
    variant: {
      default: 'text-neutral-500',
      draft: 'text-feedback-warning-500',
      'awaiting-approval': 'text-extra-pink-500',
      'in-progress': 'text-feedback-info-500',
      done: 'text-feedback-success-500',
      archived: 'text-neutral-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export type AmbitionStatusVariants = VariantProps<typeof ambitionStatusVariants>

/**
 * AmbitionStatus - Display ambition status labels with optional progress bar
 *
 * Based on Figma Status design - displays bold colored text without background,
 * or a progress bar with percentage when showProgress is true.
 * Used for ambition statuses in cards, tables, and activity feeds.
 *
 * @example
 * ```tsx
 * // Text only
 * <AmbitionStatus variant="done">Done</AmbitionStatus>
 * <AmbitionStatus variant="in-progress">In Progress</AmbitionStatus>
 *
 * // With progress bar
 * <AmbitionStatus variant="in-progress" showProgress progress={75} />
 * <AmbitionStatus variant="done" showProgress progress={100} />
 * ```
 */
export function AmbitionStatus({
  children,
  variant = 'default',
  size = 'md',
  showProgress = false,
  progress = 0,
  className,
  'data-test-id': dataTestId,
}: AmbitionStatusProps) {
  // Clamp progress between 0 and 100
  const numericProgress = Number(progress)
  const clampedProgress = Number.isFinite(numericProgress)
    ? Math.min(100, Math.max(0, numericProgress))
    : 0

  // Animate progress
  const animatedProgress = useAnimatedProgress(clampedProgress, showProgress)

  // If showProgress is true, render progress bar
  if (showProgress) {
    return (
      <div
        className={cn(
          'relative w-full rounded-full overflow-hidden bg-neutral-200',
          size === 'sm' ? 'h-progress-bar-sm' : 'h-progress-bar-lg',
          className,
        )}
        data-testid={dataTestId}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${VARIANT_TO_LABEL[variant]}: ${clampedProgress}%`}
      >
        {/* Fill bar */}
        <div
          className={cn(
            progressFillVariants({ variant }),
            'transition-[width] duration-700 ease-out',
          )}
          style={{ width: `${animatedProgress}%` }}
        />

        {/* Percentage text */}
        <span className={progressTextVariants({ size, variant })}>
          {Math.round(clampedProgress)}%
        </span>
      </div>
    )
  }

  // Default: render text only
  return (
    <span
      className={cn(ambitionStatusVariants({ variant, size }), className)}
      data-testid={dataTestId}
    >
      {children || VARIANT_TO_LABEL[variant]}
    </span>
  )
}

AmbitionStatus.displayName = 'AmbitionStatus'
