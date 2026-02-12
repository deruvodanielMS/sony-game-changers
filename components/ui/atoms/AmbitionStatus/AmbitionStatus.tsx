'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { AmbitionStatusProps } from './AmbitionStatus.types'

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
  'inline-flex items-center justify-center gap-2.5 px-0_5 py-0_25 font-bold transition-colors',
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

export type AmbitionStatusVariants = VariantProps<typeof ambitionStatusVariants>

/**
 * AmbitionStatus - Display ambition status labels without background
 *
 * Based on Figma Status design - displays bold colored text without background.
 * Used for ambition statuses in cards, tables, and activity feeds.
 *
 * @example
 * ```tsx
 * <AmbitionStatus variant="done">Done</AmbitionStatus>
 * <AmbitionStatus variant="in-progress">In Progress</AmbitionStatus>
 * <AmbitionStatus variant="draft">Draft</AmbitionStatus>
 * ```
 */
export function AmbitionStatus({
  children,
  variant,
  size,
  className,
  'data-test-id': dataTestId,
}: AmbitionStatusProps) {
  return (
    <span
      className={cn(ambitionStatusVariants({ variant, size }), className)}
      data-testid={dataTestId}
    >
      {children}
    </span>
  )
}

AmbitionStatus.displayName = 'AmbitionStatus'
