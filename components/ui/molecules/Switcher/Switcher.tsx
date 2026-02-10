'use client'

import { cn } from '@/utils/cn'
import type { SwitcherProps } from './Switcher.types'

const sizeStyles = {
  small: {
    container: 'h-3 gap-0_25 p-0_25',
    button: 'px-0_75 py-0_5 text-label-sm',
    icon: 'w-1 h-1',
  },
  large: {
    container: 'p-0_5 gap-0_25',
    button: 'px-1 py-0_75 text-label-md whitespace-nowrap',
    icon: 'w-1_25 h-1_25',
  },
}

const variantStyles = {
  generic: {
    container: 'rounded-full',
    containerStyle: { backgroundColor: 'var(--neutral-100)' },
    active: 'rounded-full',
    activeStyle: { backgroundColor: 'var(--neutral-1000)', color: 'var(--neutral-0)' },
    inactive: '',
    inactiveStyle: { color: 'var(--neutral-600)' },
  },
  success: {
    container: 'rounded-full',
    containerStyle: { backgroundColor: 'var(--neutral-100)' },
    active: 'rounded-full',
    activeStyle: {
      backgroundColor: 'var(--feedback-success-100)',
      color: 'var(--feedback-success-950)',
    },
    inactive: '',
    inactiveStyle: { color: 'var(--neutral-600)' },
  },
  info: {
    container: 'rounded-full',
    containerStyle: { backgroundColor: 'var(--neutral-100)' },
    active: 'rounded-full',
    activeStyle: { backgroundColor: 'var(--feedback-info-100)', color: 'var(--feedback-info-950)' },
    inactive: '',
    inactiveStyle: { color: 'var(--neutral-600)' },
  },
  error: {
    container: 'rounded-full',
    containerStyle: { backgroundColor: 'var(--neutral-100)' },
    active: 'rounded-full',
    activeStyle: {
      backgroundColor: 'var(--feedback-error-100)',
      color: 'var(--feedback-error-950)',
    },
    inactive: '',
    inactiveStyle: { color: 'var(--neutral-600)' },
  },
  danger: {
    container: 'rounded-full',
    containerStyle: { backgroundColor: 'var(--neutral-100)' },
    active: 'rounded-full',
    activeStyle: {
      backgroundColor: 'var(--feedback-error-100)',
      color: 'var(--feedback-error-950)',
    },
    inactive: '',
    inactiveStyle: { color: 'var(--neutral-600)' },
  },
}

export function Switcher({
  items,
  value,
  onChange,
  size = 'small',
  variant = 'generic',
  className,
  ariaLabel,
}: SwitcherProps) {
  const variantConfig = variantStyles[variant]
  const containerClasses = cn(
    'flex items-center',
    sizeStyles[size].container,
    variantConfig.container,
    className,
  )

  return (
    <div
      className={containerClasses}
      style={variantConfig.containerStyle}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive = value === item.id
        const isDisabled = item.disabled

        const buttonClasses = cn(
          'flex items-center justify-center gap-0_5 font-semibold transition-all duration-200 rounded-full',
          sizeStyles[size].button,
          isActive && '[&_svg]:!text-current',
          !isActive && !isDisabled && variantConfig.inactive,
          !isActive && !isDisabled && 'hover:opacity-60 active:scale-95',
          isDisabled && 'opacity-30 cursor-not-allowed',
          !isDisabled && 'cursor-pointer',
        )

        const buttonStyle = isActive
          ? { ...variantConfig.activeStyle }
          : { ...variantConfig.inactiveStyle, backgroundColor: 'transparent' }

        const iconClasses = cn('flex-shrink-0', sizeStyles[size].icon)

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            aria-label={item.ariaLabel}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(item.id)}
            className={buttonClasses}
            style={buttonStyle}
          >
            {item.icon && <span className={iconClasses}>{item.icon}</span>}
            {item.label && <span>{item.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
