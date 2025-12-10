'use client'

import { cn } from '@/utils/cn'
import type { SidebarNavProps } from './SidebarNav.types'

/**
 * SidebarNav component
 *
 * Navigation list container for sidebar items
 */
export function SidebarNav({ children, className }: SidebarNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn('flex flex-col gap-1', className)}
    >
      {children}
    </nav>
  )
}

SidebarNav.displayName = 'SidebarNav'
