'use client'

import { useState, useCallback, useEffect, startTransition } from 'react'
import { cn } from '@/utils/cn'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { MobileHeader } from '@/components/ui/organisms/MobileHeader'
import { Sidebar } from '@/components/ui/organisms/Sidebar'

export interface AppLayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * AppLayout - Main application layout with responsive behavior
 *
 * Desktop (>=768px): Fixed sidebar with collapsible state
 * Mobile (<768px): Drawer navigation
 */
export function AppLayout({ children, className }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect mobile viewport and manage collapsed state
  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth
      const mobile = width < 768
      const tablet = width >= 768 && width < 1440

      startTransition(() => {
        setIsMobile(mobile)
        // Auto-collapse on tablet (768-1439px)
        if (tablet) {
          setSidebarCollapsed(true)
        }
        // Auto-expand on desktop (>= 1440px)
        else if (width >= 1440) {
          setSidebarCollapsed(false)
        }
      })
    }

    checkViewport()
    startTransition(() => {
      setMounted(true)
    })
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const handleToggle = useCallback(() => {
    if (isMobile) {
      setDrawerOpen((prev) => !prev)
    } else {
      setSidebarCollapsed((prev) => !prev)
    }
  }, [isMobile])

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  // Don't render until we know the viewport size to prevent flash
  if (!mounted) {
    return null
  }

  // Mobile: show header with hamburger and use Drawer
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <MobileHeader
          onMenuClick={() => setDrawerOpen((prev) => !prev)}
          menuOpen={drawerOpen}
          data-test-id="app-mobile-header"
        />

        <Drawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          position="right"
          size="sm"
          overlayClose
          focusTrap
          showClose={false}
          noPadding
          aria-label="Mobile navigation drawer"
          data-test-id="app-mobile-drawer"
        >
          <div className="pt-[var(--padding-mobile-drawer-offset)] h-full">
            <Sidebar
              isCollapsed={false}
              onToggle={handleToggle}
              onNavigate={handleDrawerClose}
              hideToggle
              hideLogo
              hideBorder
              data-test-id="app-sidebar-mobile"
            />
          </div>
        </Drawer>

        <main
          className="flex-1 overflow-y-auto overflow-x-hidden bg-neutral-0"
          data-test-id="app-main-content-mobile"
        >
          {children}
        </main>
      </div>
    )
  }

  // Desktop: use grid layout with sidebar
  return (
    <div
      className={cn(
        'h-screen overflow-hidden',
        'grid grid-rows-[1fr]',
        '[grid-template-areas:"sidebar_main"]',
        !sidebarCollapsed && 'grid-cols-[var(--width-sidebar)_1fr]',
        sidebarCollapsed && 'grid-cols-[var(--width-sidebar-collapsed)_1fr]',
        className,
      )}
      style={{
        transition:
          'grid-template-columns var(--transition-duration-slow) var(--transition-ease-out)',
      }}
    >
      <aside
        className={cn('[grid-area:sidebar]', 'z-40', 'sticky top-0', 'h-screen', 'overflow-hidden')}
      >
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={handleToggle}
          data-test-id="app-sidebar-desktop"
        />
      </aside>

      <main
        className={cn(
          '[grid-area:main]',
          'z-0',
          'bg-neutral-0',
          'h-screen',
          'w-full',
          'overflow-y-auto overflow-x-hidden',
        )}
      >
        {children}
      </main>
    </div>
  )
}

AppLayout.displayName = 'AppLayout'
