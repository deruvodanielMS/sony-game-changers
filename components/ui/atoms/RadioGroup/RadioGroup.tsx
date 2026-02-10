'use client'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { cn } from '@/utils/cn'
import type { RadioGroupProps } from './RadioGroup.types'

const sizeStyles = {
  small: {
    container: 'gap-0_75',
    button: 'px-0_75 py-0_5 text-label-sm',
    icon: 'w-1 h-1',
  },
  large: {
    container: 'gap-0_75',
    button: 'px-1 py-0_75 text-label-md',
    icon: 'w-1_25 h-1_25',
  },
}

export function RadioGroup({
  items,
  value,
  onChange,
  size = 'small',
  className,
  ariaLabel,
  'data-test-id': dataTestId,
}: RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      value={value}
      onValueChange={onChange}
      className={cn('flex flex-col', sizeStyles[size].container, className)}
      aria-label={ariaLabel}
      data-test-id={dataTestId}
    >
      {items.map((item) => {
        const isActive = value === item.id
        const isDisabled = item.disabled

        const buttonClasses = cn(
          'flex items-center gap-0_5 rounded-large border transition-all duration-200',
          sizeStyles[size].button,
          isActive
            ? 'border-neutral-1000 bg-neutral-1000 text-neutral-0 [&_svg]:text-neutral-0'
            : 'border-neutral-200 bg-neutral-0 text-neutral-600',
          !isDisabled && !isActive && 'hover:border-neutral-300 hover:bg-neutral-50',
          !isDisabled && 'cursor-pointer',
          isDisabled && 'opacity-30 cursor-not-allowed',
        )

        const iconClasses = cn('flex-shrink-0', sizeStyles[size].icon)

        return (
          <label key={item.id} className={buttonClasses}>
            <RadixRadioGroup.Item
              value={item.id}
              disabled={isDisabled}
              className="sr-only"
              aria-label={item.ariaLabel}
            >
              <RadixRadioGroup.Indicator />
            </RadixRadioGroup.Item>
            {item.icon && <span className={iconClasses}>{item.icon}</span>}
            <span className="font-semibold">{item.label}</span>
          </label>
        )
      })}
    </RadixRadioGroup.Root>
  )
}

RadioGroup.displayName = 'RadioGroup'
