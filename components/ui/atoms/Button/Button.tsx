'use client'

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-semibold transition-all duration-200 outline-none cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:ring-4 focus-visible:ring-accent-primary/20 focus-visible:outline-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-l from-button-primary-from to-button-primary-to text-neutral-0',
          'hover:shadow-button-primary',
          'active:scale-[0.98]',
        ],
        secondary: [
          'bg-neutral-0 text-neutral-1000',
          'shadow-button-secondary',
          'hover:shadow-button-secondary-hover',
          'active:scale-[0.98]',
        ],
        tertiary: [
          'bg-neutral-100 text-neutral-1000',
          'hover:bg-neutral-200 hover:shadow-button-tertiary-hover',
          'active:scale-[0.98]',
        ],
        plain: [
          'bg-transparent text-neutral-1000',
          'hover:bg-neutral-200 hover:shadow-button-plain-hover',
          'active:scale-[0.98]',
        ],
      },
      mode: {
        default: '',
        danger: '',
      },
      size: {
        default: [
          'h-button-height',
          'px-1_5 py-1',
          'gap-0_75',
          'rounded-x-large',
          'text-body-small leading-body-small',
        ],
        small: [
          'h-button-height-small',
          'px-0_75 py-0_75',
          'gap-0_75',
          'rounded-x-large',
          'text-body-small leading-body-small',
        ],
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'small',
        className: 'hover:shadow-button-primary-compound',
      },
      {
        variant: 'primary',
        mode: 'danger',
        className: 'bg-feedback-danger-600 bg-none hover:outline-0 hover:opacity-90',
      },
      {
        variant: 'tertiary',
        mode: 'danger',
        className:
          'bg-feedback-danger-10 text-feedback-danger-600 hover:bg-feedback-danger-20 hover:shadow-button-tertiary-danger-compound-hover',
      },
      {
        variant: 'plain',
        mode: 'danger',
        className:
          'bg-transparent text-feedback-danger-600 hover:bg-feedback-danger-10 hover:shadow-button-plain-danger-compound-hover',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      mode: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: boolean
  iconShape?: 'rounded' | 'squared'
  isLoading?: boolean
  asChild?: boolean
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      mode,
      iconShape,
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
          buttonVariants({ variant, size, mode }),
          iconOnly && '!w-12 !h-12 !p-0 flex items-center justify-center',
          iconOnly && size === 'small' && '!w-11 !h-11',
          iconOnly && iconShape === 'rounded' && 'rounded-[100px]',
          iconOnly && iconShape === 'squared' && 'rounded-lg',
          className,
        )}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-(--space-1) w-(--space-1)"
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
                  <span className="inline-flex" aria-hidden="true">
                    {leftIcon}
                  </span>
                )}
                {children}
                {rightIcon && (
                  <span className="inline-flex" aria-hidden="true">
                    {rightIcon}
                  </span>
                )}
              </>
            )}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
