'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect, useTransition } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Link } from '@/i18n/navigation'
import { cn } from '@/utils/cn'
import type { LayoutTabSectionProps, LayoutTabItem } from './LayoutTabSection.types'

export function LayoutTabSection({ children, sections = [] }: LayoutTabSectionProps) {
  const pathname = usePathname()
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const [, startTransition] = useTransition()

  const current = pathname.split('/').pop() || ''

  // Detect if navigation drawer is open (mobile only)
  useEffect(() => {
    const mainContent = document.querySelector('main[data-test-id="app-main-content-mobile"]')
    if (!mainContent) return

    const updateDrawerState = () => {
      const drawerOpen = mainContent.getAttribute('data-drawer-open') === 'true'
      startTransition(() => {
        setIsNavDrawerOpen(drawerOpen)
      })
    }

    // Initial check
    updateDrawerState()

    const observer = new MutationObserver(updateDrawerState)
    observer.observe(mainContent, { attributes: true, attributeFilter: ['data-drawer-open'] })

    return () => observer.disconnect()
  }, [])

  const tabItemClasses =
    'min-w-[200px] p-0_75 gap-0_5 text-body leading-body flex items-center bg-neutral-100 transition-hover hover:bg-neutral-200 data-[state=active]:bg-neutral-800 data-[state=active]:text-neutral-0 rounded-default font-bold'
  const tabLabelClasses = 'line-clamp-1'

  return (
    <div>
      <Tabs.Root value={current}>
        {/* Desktop: Sticky navigation */}
        <div
          className={cn(
            'sticky top-16 md:top-0 z-[900] bg-neutral-0 px-1 md:px-3',
            'transition-opacity duration-base',
            isNavDrawerOpen && 'md:opacity-100 opacity-0 pointer-events-none',
          )}
        >
          <Tabs.List className="hidden md:flex gap-1 py-1_5">
            {sections.map(({ value, label, href, icon }: LayoutTabItem) => (
              <Tabs.Trigger key={value} value={value} asChild className={tabItemClasses}>
                <Link href={href}>
                  {icon}
                  <span className={tabLabelClasses}>{label}</span>
                </Link>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Mobile: ScrollArea with horizontal scroll */}
          <div className="md:hidden w-full overflow-x-auto overflow-y-hidden py-1 scrollbar-hide">
            <Tabs.List className="flex gap-1">
              {sections.map(({ value, label, href, icon }: LayoutTabItem) => (
                <Tabs.Trigger key={value} value={value} asChild className={tabItemClasses}>
                  <Link href={href}>
                    {icon}
                    <span className={tabLabelClasses}>{label}</span>
                  </Link>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
        </div>

        <div className="px-1 md:px-3 pt-0 md:pt-1_5 pb-1 md:pb-3">{children}</div>
      </Tabs.Root>
    </div>
  )
}
