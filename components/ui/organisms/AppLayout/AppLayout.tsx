'use client'

import { cn } from '@/utils/cn'
import type { AppLayoutProps } from './AppLayout.types'

/**
 * AppLayout component
 *
 * Main application layout structure using CSS Grid.
 * Provides slots for header, sidebar, main content, and footer.
 * Responsive design that adapts to mobile, tablet, and desktop viewports.
 *
 * @example
 * ```tsx
 * <AppLayout
 *   header={<Header />}
 *   sidebar={<Sidebar />}
 * >
 *   <PageContent />
 * </AppLayout>
 * ```
 */
export function AppLayout({ children, header, sidebar, footer, className }: AppLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen',
        'grid',
        // Mobile: single column, stack vertically
        'grid-cols-1',
        'grid-rows-[auto_1fr_auto]',
        sidebar
          ? [
              // Desktop with sidebar: sidebar + main content
              'lg:grid-cols-[var(--width-sidebar)_1fr]',
              'lg:grid-rows-[auto_1fr_auto]',
              'lg:[grid-template-areas:"header_header""sidebar_main""sidebar_footer"]',
              // Mobile with sidebar: stack vertically
              '[grid-template-areas:"header""sidebar""main""footer"]',
            ]
          : [
              // Without sidebar: single column
              '[grid-template-areas:"header""main""footer"]',
            ],
        className,
      )}
    >
      {header && (
        <header
          className={cn(
            '[grid-area:header]',
            'z-50',
            'sticky top-0',
            'bg-neutral-0',
            'border-b border-neutral-200',
          )}
        >
          {header}
        </header>
      )}

      {sidebar && (
        <aside
          className={cn(
            '[grid-area:sidebar]',
            'z-40',
            'bg-neutral-0',
            'border-r border-neutral-200',
            // Mobile: no fixed position
            'lg:sticky lg:top-(--height-header)',
            'lg:h-[calc(100vh-var(--height-header))]',
            'lg:overflow-y-auto',
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
          'min-h-[calc(100vh-var(--height-header))]',
          'w-full',
        )}
      >
        {children}
      </main>

      {footer && (
        <footer
          className={cn(
            '[grid-area:footer]',
            'z-40',
            'bg-neutral-100',
            'border-t border-neutral-200',
          )}
        >
          {footer}
        </footer>
      )}
    </div>
  )
}

AppLayout.displayName = 'AppLayout'
