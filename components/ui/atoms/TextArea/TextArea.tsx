'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const textareaVariants = cva(
  [
    'w-full rounded-tiny border transition-all duration-200 outline-none',
    'p-0_75 text-body leading-body text-neutral-1000',
    'placeholder:text-neutral-400',
    'focus:ring-2 focus:ring-accent-primary/20',
    'focus-visible:outline-none focus-visible:border-accent-primary',
    'disabled:bg-neutral-100 disabled:text-neutral-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'read-only:bg-neutral-100 read-only:cursor-default',
  ],
  {
    variants: {
      variant: {
        default: ['border-neutral-300 bg-neutral-0', 'hover:border-neutral-400'],
        error: [
          'border-feedback-danger-600 bg-feedback-danger-10',
          'focus:ring-feedback-danger-600/20',
          'focus-visible:border-feedback-danger-600',
        ],
      },
      size: {
        default: 'min-h-space-6 text-body leading-body',
        small: 'min-h-space-4 text-body-small leading-body-small p-0_5',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'vertical',
    },
  },
)

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'error'
  /**
   * Size variant
   * @default 'default'
   */
  size?: 'default' | 'small'
  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * TextArea component
 *
 * A styled textarea component that wraps the native HTML textarea element.
 * Supports variants, sizes, and resize options following the Design System.
 *
 * @example
 * ```tsx
 * <TextArea placeholder="Enter your message" />
 * <TextArea variant="error" size="small" />
 * <TextArea resize="none" rows={5} />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, size, resize, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, size, resize }), className)}
        {...props}
      />
    )
  },
)

TextArea.displayName = 'TextArea'
