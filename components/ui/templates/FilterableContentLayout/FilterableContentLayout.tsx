'use client'

import { useState, useEffect, useTransition } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/atoms/Button'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Typography } from '@/components/ui/foundations/Typography'
import { FilterMultiSelect } from '@/components/ui/molecules/FilterMultiSelect'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { FilterBar } from '@/components/ui/organisms/GoalFilters/FilterBar'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { cn } from '@/utils/cn'
import type { FilterableContentLayoutProps } from './FilterableContentLayout.types'

/**
 * FilterableContentLayout - Reusable template for pages with sticky header, filters, and mobile drawer
 *
 * Features:
 * - Scroll-aware header (hides on scroll down, shows on scroll up) - desktop only
 * - Sticky FilterBar on desktop (z-index: 800)
 * - Mobile filter drawer with bottom sheet pattern
 * - Navigation drawer detection (hides filters when nav drawer is open)
 * - Active filter count badges
 * - Responsive layout with proper z-index hierarchy (MobileHeader: 1000, Tabs: 900, Filters: 800)
 * - Keyboard accessible with proper focus management
 * - Screen reader friendly with ARIA labels
 *
 * @example
 * ```tsx
 * <FilterableContentLayout
 *   header={<GoalsHeader />}
 *   filters={filterConfigs}
 *   avatarSelector={avatarSelectorConfig}
 *   searchField={{ value: search, onChange: setSearch, label: 'Search goals' }}
 *   drawerTitle={t('filterDrawer.title')}
 *   translations={{
 *     filtersButton: t('filtersButton'),
 *     searchLabel: t('filterDrawer.searchLabel'),
 *     clearAll: t('filterDrawer.clearAll'),
 *     showResults: t('filterDrawer.showResults'),
 *   }}
 *   activeFiltersCount={3}
 *   onClearFilters={handleClear}
 *   primaryAction={<Button>New Goal</Button>}
 * >
 *   <GoalCard {...goal1} />
 *   <GoalCard {...goal2} />
 * </FilterableContentLayout>
 * ```
 */
export function FilterableContentLayout({
  header,
  children,
  filters,
  avatarSelector,
  searchField,
  onClearFilters,
  primaryAction,
  drawerTitle,
  translations,
  activeFiltersCount = 0,
  contentClassName,
}: FilterableContentLayoutProps) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const { scrollDirection, scrollY } = useScrollDirection()
  const [, startTransition] = useTransition()
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)

  // Use media query hook for desktop detection
  const isDesktop = useMediaQuery(BREAKPOINTS.md)

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

  // Hide header when scrolling down past 100px, show when scrolling up (only on desktop)
  const shouldHideHeader = isDesktop && scrollDirection === 'down' && scrollY > 100

  return (
    <div className="flex flex-col gap-0 md:gap-3">
      {/* Header - hide on scroll only on desktop, always visible on mobile */}
      <div
        className="md:transition-[transform,opacity] md:duration-base md:ease-out mb-0"
        style={{
          transform: shouldHideHeader ? 'translateY(-100%)' : 'translateY(0)',
          opacity: shouldHideHeader ? 0 : 1,
        }}
      >
        {header}
      </div>

      {/* Desktop: Sticky FilterBar */}
      <div className="hidden md:block sticky top-24 z-[800] bg-neutral-0 transition-all duration-base">
        <FilterBar
          clearFields={onClearFilters !== undefined}
          filters={filters}
          avatarSelector={avatarSelector}
          searchField={
            searchField
              ? {
                  onChange: searchField.onChange,
                  defaultValue: searchField.value,
                  placeholder: searchField.placeholder,
                  clearable: searchField.clearable,
                }
              : undefined
          }
        >
          {primaryAction}
        </FilterBar>
      </div>

      {/* Mobile: Filter Button that opens drawer */}
      <div
        className={cn(
          'md:hidden sticky top-28 z-[800] bg-neutral-0 py-1 px-1 transition-opacity duration-base',
          (isFilterDrawerOpen || isNavDrawerOpen) && 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex gap-1 justify-between">
          <Button
            variant="secondary"
            className="flex-1 relative"
            leftIcon={<SlidersHorizontal width={20} />}
            onClick={() => setIsFilterDrawerOpen(true)}
            aria-label={
              activeFiltersCount > 0
                ? `${translations.filtersButton} (${activeFiltersCount} active)`
                : translations.filtersButton
            }
          >
            {translations.filtersButton}
            {activeFiltersCount > 0 && (
              <span
                className="absolute -top-0_25 -right-0_25 inline-flex items-center justify-center w-5 h-5 text-body-tiny bg-accent-primary text-neutral-0 rounded-full font-bold"
                aria-label={`${activeFiltersCount} active filters`}
              >
                {activeFiltersCount}
              </span>
            )}
          </Button>
          {primaryAction && <div className="shrink-0">{primaryAction}</div>}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title={drawerTitle}
        position="bottom"
        size="full"
        className="h-[85vh]! md:h-[80vh]!"
      >
        <div className="flex flex-col h-full">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-1_5 pb-1_5">
            {/* Search First - Most used action */}
            {searchField && (
              <div className="mb-1_5">
                {translations.searchLabel && (
                  <Typography
                    variant="bodySmall"
                    fontWeight="semibold"
                    className="mb-0_5"
                    color="neutral800"
                  >
                    {translations.searchLabel}
                  </Typography>
                )}
                <SearchField
                  onChange={searchField.onChange}
                  defaultValue={searchField.value}
                  placeholder={searchField.placeholder}
                />
              </div>
            )}

            {/* Filters Section */}
            {filters.length > 0 && (
              <div className="mb-1_5">
                {translations.filterByLabel && (
                  <Typography
                    variant="bodySmall"
                    fontWeight="semibold"
                    className="mb-0_75"
                    color="neutral800"
                  >
                    {translations.filterByLabel}
                  </Typography>
                )}
                <div className="flex flex-col gap-0_75">
                  {filters.map((filter) => (
                    <FilterMultiSelect key={filter.label} {...filter} />
                  ))}
                </div>
              </div>
            )}

            {/* Avatar Selector */}
            {avatarSelector && (
              <div className="mb-1_5">
                {translations.teamMembersLabel && (
                  <Typography
                    variant="bodySmall"
                    fontWeight="semibold"
                    className="mb-0_75"
                    color="neutral800"
                  >
                    {translations.teamMembersLabel}
                  </Typography>
                )}
                <AvatarSelect {...avatarSelector} />
              </div>
            )}
          </div>

          {/* Sticky Footer with actions */}
          <div className="sticky bottom-0 bg-neutral-0 border-t border-neutral-300 px-1_5 py-1 flex gap-0_75">
            <Button
              variant="secondary"
              onClick={() => {
                onClearFilters?.()
                setIsFilterDrawerOpen(false)
              }}
              className="flex-1"
              disabled={activeFiltersCount === 0}
            >
              {translations.clearAll}
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsFilterDrawerOpen(false)}
              className="flex-1 text-neutral-0 relative"
              aria-label={
                activeFiltersCount > 0
                  ? `${translations.showResults} (${activeFiltersCount} active filters)`
                  : translations.showResults
              }
            >
              {translations.showResults}
              {activeFiltersCount > 0 && (
                <span
                  className="ml-0_5 inline-flex items-center justify-center w-5 h-5 text-body-tiny bg-neutral-0 text-accent-primary rounded-full font-bold"
                  aria-hidden="true"
                >
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Content */}
      <div className={cn('flex flex-col gap-1 md:gap-1_5', contentClassName)}>{children}</div>
    </div>
  )
}
