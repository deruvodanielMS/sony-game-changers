'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { BadgeProps } from './Badge.types'

/**
 * Badge variants based on Figma Status Tag design
 * Status tags have NO background, only colored bold text
 * Padding: 8px horizontal, 2px vertical
 * Border-radius: 16px (rounded-default)
 * Font: Bold, 16px, line-height 24px
 */
const badgeVariants = cva(
  'inline-flex items-center gap-0_25 px-0_5 py-0_125 rounded-default font-bold transition-colors',
  {
    variants: {
      variant: {
        // Status Tag variants (NO background, only text color)
        draft: 'text-feedback-info-500',
        'awaiting-approval': 'text-extra-pink-500',
        approved: 'text-feedback-success-500',
        'in-progress': 'text-extra-purple-500',
        'on-track': 'text-feedback-warning-500',
        'off-track': 'text-feedback-error-500',
        completed: 'text-feedback-success-500',
        archived: 'text-neutral-500',
        'not-started': 'text-neutral-500',

        // Generic Badge variants (for backward compatibility)
        default: 'text-neutral-500',
        success: 'text-feedback-success-500',
        warning: 'text-feedback-warning-500',
        error: 'text-feedback-error-500',
        info: 'text-feedback-info-500',
        primary: 'text-extra-pink-500',
        secondary: 'text-feedback-success-500',
      },
      size: {
        sm: 'text-[length:var(--font-size-body-small)] leading-[var(--line-height-body-small)]',
        md: 'text-[length:var(--font-size-body)] leading-[var(--line-height-body)]',
        lg: 'text-[length:var(--font-size-h6)] leading-[var(--line-height-h6)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

/**
 * Badge - Display status labels without background
 *
 * Based on Figma Status Tag design - displays bold colored text without background.
 * Used for ambition statuses in cards, tables, and activity feeds.
 *
 * @example
 * ```tsx
 * <Badge variant="completed">Completed</Badge>
 * <Badge variant="in-progress">In Progress</Badge>
 * <Badge variant="draft">Draft</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  'data-test-id': dataTestId,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} data-testid={dataTestId}>
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'
