'use client'

import { cn } from '@/utils/cn'
import type { AppLayoutBaseProps } from './AppLayoutBase.types'

/**
 * AppLayoutBase component
 *
 * Main application layout structure using CSS Grid.
 * Provides slots for header, sidebar, main content, and footer.
 * Responsive design that adapts to mobile, tablet, and desktop viewports.
 * Supports collapsible sidebar with dynamic grid adjustment.
 *
 * @example
 * ```tsx
 * <AppLayoutBase
 *   header={<Header />}
 *   sidebar={<Sidebar isCollapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />}
 *   sidebarCollapsed={collapsed}
 * >
 *   <PageContent />
 * </AppLayoutBase>
 * ```
 */
export function AppLayoutBase({
  children,
  header,
  sidebar,
  footer,
  className,
  sidebarCollapsed = false,
}: AppLayoutBaseProps) {
  return (
    <div
      className={cn(
        'min-h-screen overflow-x-hidden',
        'grid',
        // Mobile: single column, stack vertically
        'grid-cols-1',
        'grid-rows-[1fr]',
        sidebar
          ? [
              // Desktop with sidebar: sidebar + main content
              'lg:grid-rows-[1fr]',
              'lg:[grid-template-areas:"sidebar_main"]',
              // Mobile with sidebar: stack vertically
              '[grid-template-areas:"sidebar""main"]',
            ]
          : [
              // Without sidebar: single column
              '[grid-template-areas:"main"]',
            ],
        // Dynamic grid column based on sidebar collapsed state
        sidebar && !sidebarCollapsed && 'lg:grid-cols-[var(--width-sidebar)_1fr]',
        sidebar && sidebarCollapsed && 'lg:grid-cols-[var(--width-sidebar-collapsed)_1fr]',
        className,
      )}
      style={{
        transition: 'grid-template-columns 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {sidebar && (
        <aside
          className={cn(
            '[grid-area:sidebar]',
            'z-40',
            // Mobile: no fixed position
            'lg:sticky lg:top-0',
            'lg:h-screen',
            'lg:overflow-hidden', // Let Sidebar component handle overflow
          )}
        >
          {sidebar}
        </aside>
      )}

      <main
        className={cn(
          '[grid-area:main]',
          'z-0',
          'bg-neutral-0',
          'min-h-screen',
          'w-full',
          'overflow-x-hidden',
        )}
      >
        {children}
      </main>
    </div>
  )
}

AppLayoutBase.displayName = 'AppLayoutBase'
