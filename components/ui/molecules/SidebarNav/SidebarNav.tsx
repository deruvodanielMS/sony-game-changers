'use client'

import { cn } from '@/utils/cn'
import type { SidebarNavProps } from './SidebarNav.types'

/**
 * SidebarNav component
 *
 * Navigation list container for sidebar items
 */
export function SidebarNav({ children, isCollapsed = false, className }: SidebarNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn('flex flex-col gap-0_25', className)}
    >
      {children}
    </nav>
  )
}

SidebarNav.displayName = 'SidebarNav'
