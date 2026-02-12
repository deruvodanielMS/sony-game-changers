'use client'

import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { m } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { SwitcherProps } from './Switcher.types'

const sizeStyles = {
  small: {
    container: 'h-3 gap-0_25 p-0_25',
    button: 'px-0_75 py-0_5 text-label-sm max-h-40px',
    icon: 'w-1 h-1',
  },
  large: {
    container: 'p-0_5 gap-0_25',
    button: 'px-1 py-0_5 text-label-md max-h-40px whitespace-nowrap',
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

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null)

  // Update active indicator position
  useIsomorphicLayoutEffect(() => {
    const updatePosition = () => {
      const activeButton = buttonRefs.current.get(value)
      const container = containerRef.current

      if (activeButton && container) {
        // Use offsetLeft and offsetWidth for more reliable positioning
        setActiveRect({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        })
      }
    }

    updatePosition()

    // Also update on resize
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [value, items])

  const containerClasses = cn(
    'flex items-center relative',
    sizeStyles[size].container,
    variantConfig.container,
    className,
  )

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={variantConfig.containerStyle}
      role="tablist"
      aria-label={ariaLabel}
    >
      {/* Animated background indicator */}
      {activeRect && (
        <m.div
          className="absolute rounded-full"
          style={{
            backgroundColor: variantConfig.activeStyle.backgroundColor,
            height: 'calc(100% - 8px)',
            top: '4px',
          }}
          initial={false}
          animate={{
            left: activeRect.left,
            width: activeRect.width,
          }}
          transition={{
            type: 'tween',
            duration: 0.25,
            ease: 'easeOut',
          }}
        />
      )}

      {items.map((item) => {
        const isActive = value === item.id
        const isDisabled = item.disabled

        const buttonClasses = cn(
          'flex items-center justify-center gap-0_5 font-semibold rounded-full relative z-10',
          'transition-colors duration-200',
          sizeStyles[size].button,
          isActive && '[&_svg]:!text-current',
          !isActive && !isDisabled && 'hover:opacity-60',
          isDisabled && 'opacity-30 cursor-not-allowed',
          !isDisabled && 'cursor-pointer',
        )

        const buttonStyle = isActive
          ? { color: variantConfig.activeStyle.color, backgroundColor: 'transparent' }
          : { ...variantConfig.inactiveStyle, backgroundColor: 'transparent' }

        const iconClasses = cn('flex-shrink-0', sizeStyles[size].icon)

        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(item.id, el)
            }}
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
