'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { useAnimatedProgress } from '@/hooks/useAnimatedProgress'
import type { ProgressBarProps } from './ProgressBar.types'

/**
 * ProgressBar variants based on Figma Progress component designs
 * Horizontal bar with percentage text on the right
 * Width: 150px, Heights: L=30px, S=20px
 * Border-radius: 32px (rounded-full)
 */
const progressBarVariants = cva('relative w-full rounded-full overflow-hidden bg-neutral-200', {
  variants: {
    size: {
      L: 'h-progress-bar-lg',
      S: 'h-progress-bar-sm',
    },
  },
  defaultVariants: {
    size: 'L',
  },
})

const progressFillVariants = cva('absolute left-0 top-0 h-full rounded-full z-0', {
  variants: {
    status: {
      'in-progress': 'bg-extra-blue-200',
      completed: 'bg-extra-green-200',
    },
  },
  defaultVariants: {
    status: 'in-progress',
  },
})

const progressTextVariants = cva('font-bold absolute right-1 top-1/2 -translate-y-1/2 z-10', {
  variants: {
    size: {
      L: 'text-body-tiny leading-body-tiny', // 12px
      S: 'text-body-tiny leading-body-tiny', // 12px
    },
    status: {
      'in-progress': 'text-feedback-info-500',
      completed: 'text-feedback-success-950',
    },
  },
  defaultVariants: {
    size: 'L',
    status: 'in-progress',
  },
})

export type ProgressBarVariants = VariantProps<typeof progressBarVariants>

/**
 * ProgressBar - Horizontal progress indicator
 *
 * Based on Figma Progress component design (nodes 17167-20478, 17167-20461).
 * Displays a horizontal bar with optional percentage text.
 * Used in ambition headers and compact status displays.
 *
 * @example
 * ```tsx
 * <ProgressBar progress={75} size="L" status="in-progress" />
 * <ProgressBar progress={100} size="S" status="completed" />
 * <ProgressBar progress={50} showPercentage={false} />
 * ```
 */
export function ProgressBar({
  progress,
  size = 'L',
  status = 'in-progress',
  showPercentage = true,
  animate = true,
  className,
  'data-test-id': dataTestId,
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const numericProgress = Number(progress)
  const clampedProgress = Number.isFinite(numericProgress)
    ? Math.min(100, Math.max(0, numericProgress))
    : 0

  // Animate from 0 to target value on mount
  const animatedProgress = useAnimatedProgress(clampedProgress, animate)

  return (
    <div
      className={cn(progressBarVariants({ size }), className)}
      data-testid={dataTestId}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedProgress}%`}
    >
      {/* Fill bar */}
      <div
        className={cn(progressFillVariants({ status }), 'transition-[width] duration-700 ease-out')}
        style={{ width: `${animatedProgress}%` }}
      />

      {/* Percentage text */}
      {showPercentage && (
        <span className={progressTextVariants({ size, status })}>
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'
