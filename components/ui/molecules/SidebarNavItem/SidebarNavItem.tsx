'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/utils/cn'
import type { SidebarNavItemProps } from './SidebarNavItem.types'
import { ROUTES } from '@/common/routes'

/**
 * SidebarNavItem component
 *
 * Individual navigation item with icon, label, and optional badge.
 * Adapts to collapsed state by showing only icon with tooltip.
 * Uses next-intl Link for internationalized routing.
 * Automatically calculates active state based on current pathname.
 */
export function SidebarNavItem({
  label,
  icon,
  isActive: isActiveProp,
  isCollapsed = false,
  onClick,
  href,
  className,
  badge,
  'data-test-id': dataTestId,
}: SidebarNavItemProps) {
  const pathname = usePathname()
  const Comp = href ? Link : 'button'
  const isButton = !href

  // Auto-calculate isActive if not explicitly provided
  const isActive =
    isActiveProp !== undefined
      ? isActiveProp
      : href
        ? href === ROUTES.ROOT
          ? pathname === ROUTES.ROOT
          : pathname?.startsWith(href)
        : false

  return (
    <div className="relative group w-full">
      <Comp
        href={href || ROUTES.ROOT}
        onClick={onClick}
        role={isButton ? 'button' : undefined}
        aria-current={isActive ? 'page' : undefined}
        aria-label={isCollapsed ? label : undefined}
        data-test-id={dataTestId}
        className={cn(
          'flex items-center h-3',
          'transition-all duration-fast',
          'rounded-default',
          'text-body-small leading-body-small font-semibold',
          'focus-visible:outline-none',
          'border-0 outline-none ring-0',
          isCollapsed
            ? 'justify-center p-0_75 overflow-hidden w-full'
            : 'px-1 py-0_75 gap-0_5 w-full max-w-[var(--nav-item-max-width)]',
          isActive
            ? ['bg-neutral-800', 'text-neutral-0']
            : [
                'transition-hover',
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
    </div>
  )
}

SidebarNavItem.displayName = 'SidebarNavItem'
