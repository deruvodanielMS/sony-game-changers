'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-semibold transition-all duration-200 outline-none cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:ring-4 focus-visible:ring-accent-primary/20 focus-visible:outline-none',
    'whitespace-nowrap',
    'rounded-full',
    'gap-1',
    'active:scale-95',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-feedback-info-500 to-extra-purple-500',
          'text-neutral-0',
          'hover:from-feedback-info-950 hover:to-extra-purple-950',
          'disabled:from-neutral-500 disabled:to-neutral-500',
        ],
        secondary: [
          'bg-neutral-0',
          'border-2 border-feedback-info-500',
          'hover:bg-extra-purple-100',
          'hover:border-feedback-info-950',
          'disabled:border-neutral-500',
        ],
        link: ['bg-transparent', 'hover:bg-extra-purple-100', 'disabled:opacity-50'],
      },
      size: {
        large: ['px-1 py-0_75', 'text-body leading-body'],
        small: ['px-0_75 py-0_5', 'text-body-small leading-body-small'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'large',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: boolean
  isLoading?: boolean
  asChild?: boolean
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      children,
      leftIcon,
      rightIcon,
      iconOnly = false,
      isLoading = false,
      asChild = false,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        type={!asChild ? type : undefined}
        disabled={!asChild ? isDisabled : undefined}
        className={cn(
          buttonVariants({ variant, size }),
          iconOnly && 'aspect-square p-0_75',
          iconOnly && size === 'small' && 'p-0_25',
          // Ensure primary variant always has white text
          variant === 'primary' && '[&>span]:text-neutral-0',
          // Apply gradient text to secondary/link variants directly on the button
          (variant === 'secondary' || variant === 'link') &&
            !iconOnly &&
            'bg-gradient-to-r from-feedback-info-500 to-extra-purple-500 bg-clip-text text-transparent',
          (variant === 'secondary' || variant === 'link') &&
            !iconOnly &&
            'hover:from-feedback-info-950 hover:to-extra-purple-950',
          (variant === 'secondary' || variant === 'link') &&
            !iconOnly &&
            'disabled:from-neutral-500 disabled:to-neutral-500',
          // Icon colors for secondary/link variants (non icon-only)
          (variant === 'secondary' || variant === 'link') &&
            !iconOnly &&
            '[&_svg]:text-feedback-info-500 [&_svg]:bg-transparent',
          (variant === 'secondary' || variant === 'link') &&
            !iconOnly &&
            'hover:[&_svg]:text-feedback-info-950',
          (variant === 'secondary' || variant === 'link') &&
            !iconOnly &&
            'disabled:[&_svg]:text-neutral-500',
          // Icon-only mode icons
          (variant === 'secondary' || variant === 'link') &&
            iconOnly &&
            '[&_svg]:text-feedback-info-500 [&_svg]:bg-transparent',
          (variant === 'secondary' || variant === 'link') &&
            iconOnly &&
            'hover:[&_svg]:text-feedback-info-950',
          (variant === 'secondary' || variant === 'link') &&
            iconOnly &&
            'disabled:[&_svg]:text-neutral-500',
          className,
        )}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        <span className="inline-flex items-center justify-center w-full h-full gap-1">
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {!iconOnly && <span>{children || 'Loading...'}</span>}
            </>
          ) : (
            <>
              {iconOnly ? (
                children
              ) : (
                <>
                  {leftIcon && (
                    <span className="inline-flex shrink-0" aria-hidden="true">
                      {leftIcon}
                    </span>
                  )}
                  <span className="truncate">{children}</span>
                  {rightIcon && (
                    <span className="inline-flex shrink-0" aria-hidden="true">
                      {rightIcon}
                    </span>
                  )}
                </>
              )}
            </>
          )}
        </span>
      </Comp>
    )
  },
)

Button.displayName = 'Button'
