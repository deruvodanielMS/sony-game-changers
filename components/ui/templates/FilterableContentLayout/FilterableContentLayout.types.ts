import type { ReactNode } from 'react'
import type { FilterMultiSelectProps } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect.types'
import type { AvatarSelectProps } from '@/components/ui/molecules/AvatarSelect/AvatarSelect.types'

export interface FilterableContentLayoutProps {
  /**
   * Header component to render (e.g., GoalsHeader)
   */
  header: ReactNode

  /**
   * Main content to render below filters (e.g., goal cards)
   */
  children: ReactNode

  /**
   * Filter configurations for desktop and mobile
   */
  filters: FilterMultiSelectProps[]

  /**
   * Avatar selector configuration
   */
  avatarSelector?: AvatarSelectProps

  /**
   * Search field configuration
   */
  searchField?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
    clearable?: boolean
  }

  /**
   * Callback when clear all filters is clicked
   */
  onClearFilters?: () => void

  /**
   * Primary action button (e.g., "New Goal")
   */
  primaryAction?: ReactNode

  /**
   * Mobile drawer title
   */
  drawerTitle: string

  /**
   * Translation function for drawer labels
   */
  translations: {
    filtersButton: string
    searchLabel?: string
    filterByLabel?: string
    teamMembersLabel?: string
    clearAll: string
    showResults: string
  }

  /**
   * Active filters count (for badge display)
   */
  activeFiltersCount?: number

  /**
   * Custom class name for content wrapper
   */
  contentClassName?: string
  /**
   * Optional tabs to render sticky below filters
   */
  tabs?: ReactNode
}
