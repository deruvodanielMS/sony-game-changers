'use client'

import { useState, useCallback, useEffect } from 'react'
import { AppLayoutBase } from './AppLayout'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { MobileHeader } from '@/components/ui/organisms/MobileHeader'
import { Sidebar } from '@/components/ui/organisms/Sidebar'
import type { AppLayoutProps } from './AppLayoutClient.types'

/**
 * AppLayout - Main application layout with responsive behavior
 * In mobile (< 768px), uses a Drawer instead of the sidebar
 */
export function AppLayout({ children, ...props }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect mobile viewport after mount to prevent hydration mismatch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    setMounted(true)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  // In mobile, show header with hamburger and use Drawer from right
  // Drawer content will be provided by AppSidebar navigation items directly
  if (isMobile) {
    return (
      <>
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
          aria-label="Mobile navigation drawer"
          data-test-id="app-mobile-drawer"
        >
          {/* Mobile drawer content - navigation only, no sidebar chrome */}
          <div className="flex flex-col h-full" role="navigation" aria-label="Main navigation">
            <Sidebar
              isCollapsed={false}
              onToggle={handleToggle}
              hideToggle
              hideBorder
              noPadding
              data-test-id="app-sidebar-mobile"
            />
          </div>
        </Drawer>

        <main className="min-h-screen" data-test-id="app-main-content-mobile">
          {children}
        </main>
      </>
    )
  }

  // Desktop: use normal sidebar layout
  return (
    <AppLayoutBase
      {...props}
      sidebar={
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={handleToggle}
          data-test-id="app-sidebar-desktop"
        />
      }
      sidebarCollapsed={sidebarCollapsed}
    >
      {children}
    </AppLayoutBase>
  )
}

AppLayout.displayName = 'AppLayout'
