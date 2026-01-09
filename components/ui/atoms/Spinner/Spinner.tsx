import { useId } from 'react'
import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva('', {
  variants: {
    size: {
      small: 'w-[var(--spinner-small)] h-[var(--spinner-small)]',
      medium: 'w-[var(--spinner-medium)] h-[var(--spinner-medium)]',
      large: 'w-[var(--spinner-large)] h-[var(--spinner-large)]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  'data-testid'?: string
}

export function Spinner({ size, className, 'data-testid': dataTestId }: SpinnerProps) {
  const gradientId = `spinner-gradient-${useId()}`

  return (
    <svg
      className={cn(spinnerVariants({ size }), className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-testid={dataTestId}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-button-primary-to)" />
          <stop offset="100%" stopColor="var(--color-button-primary-from)" />
        </linearGradient>
      </defs>
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="var(--color-neutral-200)"
        strokeWidth="var(--spinner-stroke-width)"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={`url(#${gradientId})`}
        strokeWidth="var(--spinner-stroke-width)"
        fill="none"
        strokeLinecap="round"
        style={{
          animation: 'spinner-dash var(--spinner-duration) ease-in-out infinite',
          transformOrigin: 'center',
        }}
      />
    </svg>
  )
}

Spinner.displayName = 'Spinner'
