'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { BadgeProps } from './Badge.types'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-default font-bold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-200 text-neutral-800',
        success: 'bg-feedback-success-100 text-feedback-success-600',
        warning: 'bg-feedback-warning-100 text-feedback-warning-600',
        error: 'bg-feedback-error-100 text-feedback-error-600',
        info: 'bg-extra-blue-100 text-extra-blue-600',
        primary: 'bg-extra-pink-100 text-extra-pink-600',
        secondary: 'bg-extra-green-100 text-extra-green-600',
      },
      size: {
        sm: 'px-0.375 py-0.0625 text-xs',
        md: 'px-0.5 py-0.125 text-sm',
        lg: 'px-0.75 py-0.25 text-base',
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
 * Badge - Display labels, statuses, or categories
 *
 * A versatile component for showing short pieces of information with visual variants.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="warning" size="sm">Pending</Badge>
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
