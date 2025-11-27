'use client'

import { Link } from '@/i18n/navigation'
import { cn } from '@/utils/cn'
import type { SidebarNavItemProps } from './SidebarNavItem.types'

/**
 * SidebarNavItem component
 *
 * Individual navigation item with icon, label, and optional badge.
 * Adapts to collapsed state by showing only icon with tooltip.
 * Uses next-intl Link for internationalized routing.
 */
export function SidebarNavItem({
  label,
  icon,
  isActive = false,
  isCollapsed = false,
  onClick,
  href,
  className,
  badge,
  'data-test-id': dataTestId,
}: SidebarNavItemProps) {
  const Comp = href ? Link : 'button'
  const isButton = !href

  return (
    <div className="relative group">
      <Comp
        href={href as any}
        onClick={onClick}
        role={isButton ? 'button' : undefined}
        aria-current={isActive ? 'page' : undefined}
        aria-label={isCollapsed ? label : undefined}
        data-test-id={dataTestId}
        className={cn(
          'flex items-center w-full',
          'transition-all duration-fast',
          'rounded-default',
          'text-body-small leading-body-small font-bold',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-primary/20',
          isCollapsed ? 'justify-center p-0_5 gap-0' : 'px-1 py-0_75 gap-0_5',
          isActive
            ? ['bg-neutral-800', 'text-neutral-0', 'font-bold']
            : [
                'text-neutral-1000',
                'hover:bg-neutral-200',
                'hover:text-neutral-600',
                'hover:cursor-pointer',
              ],
          className,
        )}
      >
        {/* Icon */}
        <span
          className={cn(
            'flex items-center justify-center flex-shrink-0',
            isCollapsed ? 'w-icon-sm h-icon-sm' : 'w-icon-sm h-icon-sm',
          )}
          aria-hidden="true"
        >
          {icon}
        </span>

        {/* Label */}
        {!isCollapsed && <span className="flex-1 truncate text-left">{label}</span>}

        {/* Badge */}
        {!isCollapsed && badge && (
          <span
            className={cn(
              'flex items-center justify-center',
              'min-w-icon-sm h-icon-sm px-0_25',
              'text-body-tiny leading-body-tiny font-semibold',
              'rounded-tiny',
              isActive ? 'bg-accent-primary text-neutral-0' : 'bg-neutral-200 text-neutral-1000',
            )}
          >
            {badge}
          </span>
        )}
      </Comp>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div
          role="tooltip"
          className={cn(
            'absolute left-full ml-0_5 top-1/2 -translate-y-1/2',
            'px-0_75 py-0_5',
            'bg-neutral-1000 text-neutral-0',
            'text-body-tiny leading-body-tiny font-medium',
            'rounded-tiny',
            'whitespace-nowrap',
            'pointer-events-none',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-fast',
            'z-50',
          )}
        >
          {label}
          {badge && (
            <span className="ml-0_5 px-0_25 py-0_125 bg-neutral-0/20 rounded-tiny text-body-tiny">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

SidebarNavItem.displayName = 'SidebarNavItem'
