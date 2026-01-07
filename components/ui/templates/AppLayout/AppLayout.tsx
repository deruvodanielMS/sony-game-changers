'use client'

import { useState, useCallback, useMemo } from 'react'
import { cn } from '@/utils/cn'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { MobileHeader } from '@/components/ui/organisms/MobileHeader'
import { Sidebar } from '@/components/ui/organisms/Sidebar'
import { useUIStore } from '@/stores/ui.store'
import { Modal } from '@/components/ui/molecules/Modal'
import { useWindowSize } from '@/hooks/useMediaQuery'

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
  const [userCollapsedState, setUserCollapsedState] = useState<boolean | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Use debounced window size hook (150ms debounce)
  const { width } = useWindowSize(150)

  const isMobile = width > 0 && width < 768
  const isTablet = width >= 768 && width < 1440
  const isDesktop = width >= 1440

  const {
    modal: { content: modalContent, ...modalProps },
    drawer: { content: drawerContent, ...drawerProps },
  } = useUIStore()

  // Derive sidebar collapsed state from viewport and user preference
  const sidebarCollapsed = useMemo(() => {
    // User manually toggled: respect their preference
    if (userCollapsedState !== null) {
      return userCollapsedState
    }
    // Auto-collapse on tablet, expand on desktop
    if (isTablet) return true
    if (isDesktop) return false
    return false
  }, [userCollapsedState, isTablet, isDesktop])

  const handleToggle = useCallback(() => {
    if (isMobile) {
      setDrawerOpen((prev) => !prev)
    } else {
      setUserCollapsedState((prev) => {
        const current = prev !== null ? prev : isTablet
        return !current
      })
    }
  }, [isMobile, isTablet])

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  // Mobile: show header with hamburger and use Drawer
  if (isMobile) {
    return (
      <>
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
            className="[&>div[data-testid='drawer-body']]:p-0"
            aria-label="Mobile navigation drawer"
            data-test-id="app-mobile-drawer"
          >
            <div className="pt-[var(--padding-mobile-drawer-offset)] h-full">
              <Sidebar
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
            data-drawer-open={drawerOpen}
          >
            {children}
          </main>
        </div>
        {<Modal {...modalProps}>{modalContent}</Modal>}
        {<Drawer {...drawerProps}>{drawerContent}</Drawer>}
      </>
    )
  }

  // Desktop: use grid layout with sidebar
  return (
    <>
      <div
        className={cn(
          'h-screen overflow-hidden',
          'grid grid-rows-[1fr]',
          '[grid-template-areas:"sidebar_main"]',
          'transition-[grid-template-columns] duration-slow ease-out',
          !sidebarCollapsed && 'grid-cols-[var(--width-sidebar)_1fr]',
          sidebarCollapsed && 'grid-cols-[var(--width-sidebar-collapsed)_1fr]',
          className,
        )}
      >
        <aside
          className={cn(
            '[grid-area:sidebar]',
            'z-40',
            'sticky top-0',
            'h-screen',
            'overflow-hidden',
          )}
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
      {<Modal {...modalProps}>{modalContent}</Modal>}
      {<Drawer {...drawerProps}>{drawerContent}</Drawer>}
    </>
  )
}

AppLayout.displayName = 'AppLayout'
