'use client'

import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { TagProps } from './Tag.types'

export const tagVariants = cva(
  'inline-flex items-center gap-0_5 rounded-full font-normal transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        filled: 'bg-neutral-1000 text-neutral-0',
        outlined: 'border border-neutral-1000 bg-neutral-0 text-neutral-900',
      },
      size: {
        sm: 'px-0_5 py-0_25 text-body-small leading-body-small',
        md: 'px-0_5 py-0_5 text-body leading-body',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
    },
  },
)

export function Tag({
  label,
  onRemove,
  removeAriaLabel,
  variant,
  size,
  className,
  'data-test-id': dataTestId,
}: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} data-testid={dataTestId}>
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeAriaLabel ?? ''}
          className="inline-flex items-center justify-center shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity leading-none"
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      )}
    </span>
  )
}

Tag.displayName = 'Tag'
