'use client'

import { cn } from '@/utils/cn'
import { Typography } from '@/components/ui/foundations/Typography'
import type { TabsProps } from './Tabs.types'

/**
 * Tabs - Horizontal tab navigation component
 *
 * A molecule component for switching between different views or sections.
 * Active tab is indicated with bold text and bottom border.
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     { value: 'active', label: 'Active' },
 *     { value: 'archived', label: 'Archived' }
 *   ]}
 *   value={currentTab}
 *   onChange={setCurrentTab}
 * />
 * ```
 */
export function Tabs({ items, value, onChange, className, 'data-test-id': dataTestId }: TabsProps) {
  return (
    <div
      className={cn(
        // Sticky below filters, high z-index, white bg, shadow
        'flex gap-0.5 items-center border-b border-neutral-300 h-2.5',
        'sticky top-0 z-[--z-tabs] bg-neutral-0 shadow-[--shadow-sticky-light]',
        'transition-shadow',
        'relative',
        className,
      )}
      role="tablist"
      data-testid={dataTestId}
    >
      {items.map((item) => {
        const isActive = item.value === value
        const isDisabled = item.disabled

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(item.value)}
            className={cn(
              'flex flex-col items-start justify-center py-0.5 relative shrink-0',
              'transition-colors duration-fast outline-none',
              !isDisabled && 'cursor-pointer',
              isActive && 'border-b-2 border-neutral-1000 bg-neutral-0',
              !isActive && !isDisabled && 'hover:bg-neutral-100 hover:text-neutral-1000',
              !isActive &&
                !isDisabled &&
                'focus-visible:bg-neutral-100 focus-visible:text-neutral-1000',
              isDisabled && 'cursor-not-allowed opacity-50',
            )}
            data-testid={`tab-${item.value}`}
          >
            <div className="flex gap-0.5 items-center px-1 relative shrink-0">
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <Typography
                variant="body"
                fontWeight={isActive ? 'bold' : 'normal'}
                className={cn(
                  'whitespace-nowrap transition-colors',
                  isActive ? 'text-neutral-1000' : 'text-neutral-600',
                )}
              >
                {item.label}
              </Typography>
            </div>
          </button>
        )
      })}
    </div>
  )
}

Tabs.displayName = 'Tabs'
