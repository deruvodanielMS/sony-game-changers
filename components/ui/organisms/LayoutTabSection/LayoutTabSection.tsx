'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useTransition } from 'react'
import { cn } from '@/utils/cn'
import { Switcher } from '@/components/ui/molecules/Switcher'
import type { LayoutTabSectionProps, LayoutTabItem } from './LayoutTabSection.types'

export function LayoutTabSection({ children, sections = [], basePath }: LayoutTabSectionProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const [, startTransition] = useTransition()

  // Extract the section from pathname, handling both /section and /section/subsection
  const pathParts = pathname.split('/').filter(Boolean)
  const sectionIndex = pathParts.findIndex((part) => part === basePath)
  const current =
    sectionIndex >= 0 && pathParts[sectionIndex + 1] ? pathParts[sectionIndex + 1] : ''

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

  // Transform sections to switcher items
  const switcherItems = sections.map(({ value, label, icon }: LayoutTabItem) => ({
    id: value,
    label,
    icon,
  }))

  const handleNavigation = (value: string) => {
    const section = sections.find((s) => s.value === value)
    if (section) {
      router.push(section.href)
    }
  }

  return (
    <div>
      {/* Desktop: Sticky navigation */}
      <div
        className={cn(
          'sticky top-16 md:top-0 z-[var(--z-tabs)] bg-neutral-0 px-1 md:px-3',
          'transition-opacity duration-base',
          isNavDrawerOpen && 'md:opacity-100 opacity-0 pointer-events-none',
        )}
      >
        <div className="hidden md:flex gap-1 pt-1_5">
          <Switcher
            items={switcherItems}
            value={current}
            onChange={handleNavigation}
            size="large"
            variant="generic"
            ariaLabel="Game Changers navigation"
          />
        </div>

        {/* Mobile: ScrollArea with horizontal scroll */}
        <div className="md:hidden w-full overflow-x-auto overflow-y-hidden py-1 scrollbar-hide">
          <Switcher
            items={switcherItems}
            value={current}
            onChange={handleNavigation}
            size="large"
            variant="generic"
            ariaLabel="Game Changers navigation"
          />
        </div>
      </div>

      <div className="px-1 md:px-3 pt-0 md:pt-1_5 pb-1 md:pb-3">{children}</div>
    </div>
  )
}
