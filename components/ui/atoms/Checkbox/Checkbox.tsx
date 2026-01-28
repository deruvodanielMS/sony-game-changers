'use client'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { m } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { CheckboxProps } from './Checkbox.types'

const checkboxVariants = cva(
  [
    'shrink-0 flex items-center justify-center',
    'rounded transition-all',
    'border-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'size-1',
        md: 'size-1_5',
        lg: 'size-2',
      },
      checked: {
        true: 'bg-feedback-success-600 border-feedback-success-600',
        false: 'bg-transparent border-neutral-600',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  },
)

const iconSizeMap = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export type CheckboxVariants = VariantProps<typeof checkboxVariants>

const checkVariants = {
  unchecked: { scale: 0, opacity: 0 },
  checked: { scale: 1, opacity: 1 },
}

/**
 * Checkbox - Allow users to select one or more options
 *
 * A fully accessible checkbox built on Radix UI with Framer Motion animations.
 *
 * @example
 * ```tsx
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 * <Checkbox defaultChecked aria-label="Accept terms" />
 * ```
 */
export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  size = 'md',
  className,
  'aria-label': ariaLabel,
  'data-test-id': dataTestId,
}: CheckboxProps) {
  const isChecked = checked ?? defaultChecked ?? false

  return (
    <RadixCheckbox.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      className={cn(checkboxVariants({ size, checked: isChecked }), className)}
    >
      <RadixCheckbox.Indicator asChild forceMount>
        <m.div
          initial="unchecked"
          animate={isChecked ? 'checked' : 'unchecked'}
          variants={checkVariants}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          <Check className={cn('text-neutral-0', iconSizeMap[size])} strokeWidth={3} />
        </m.div>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}

Checkbox.displayName = 'Checkbox'
