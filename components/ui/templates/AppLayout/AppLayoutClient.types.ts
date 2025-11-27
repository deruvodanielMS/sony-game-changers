import type { AppLayoutBaseProps } from './AppLayoutBase.types'

export interface AppLayoutProps extends Omit<AppLayoutBaseProps, 'sidebarCollapsed' | 'sidebar'> {
  /**
   * Main content area (pages)
   */
  children: React.ReactNode
}
