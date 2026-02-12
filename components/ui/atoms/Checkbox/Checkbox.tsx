'use client'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { CheckboxProps } from './Checkbox.types'

const checkboxVariants = cva(
  [
    'shrink-0 flex items-center justify-center',
    'rounded transition-all',
    'border-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2',
    // Unchecked state (default)
    'bg-transparent border-neutral-600',
    // Checked state using Radix data attribute
    'data-[state=checked]:bg-extra-purple-600 data-[state=checked]:border-extra-purple-600',
  ],
  {
    variants: {
      size: {
        sm: 'size-1',
        md: 'size-1_5',
        lg: 'size-1_5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const iconSizeMap = {
  sm: 'size-[12px]',
  md: 'size-[16px]',
  lg: 'size-[16px]',
}

export type CheckboxVariants = VariantProps<typeof checkboxVariants>

/**
 * Checkbox - Allow users to select one or more options
 *
 * A fully accessible checkbox built on Radix UI.
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
      className={cn(checkboxVariants({ size }), className)}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center">
        <Check className={cn('text-neutral-0', iconSizeMap[size])} strokeWidth={3} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}

Checkbox.displayName = 'Checkbox'
