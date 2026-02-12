'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/atoms/Button'
import { Checkbox } from '@/components/ui/atoms/Checkbox'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Typography } from '@/components/ui/foundations/Typography'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { FilterBar } from '@/components/ui/organisms/GoalFilters/FilterBar'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { cn } from '@/utils/cn'
import type { FilterableContentLayoutProps } from './FilterableContentLayout.types'

// Constants
const SCROLL_THRESHOLD = 100 // px - threshold to hide header on scroll
const SHADOW_THRESHOLD = 10 // px - threshold to show sticky shadow

// Sub-component: Active filter count badge (DRY principle)
function FilterBadge({ count, className }: { count: number; className?: string }) {
  if (count === 0) return null
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[16px] h-[16px] px-[4px]',
        'text-[12px] font-bold leading-[16px] text-neutral-0',
        'rounded-full bg-feedback-error-500',
        'outline outline-2 outline-neutral-0',
        className,
      )}
      aria-label={`${count} active filters`}
    >
      {count > 9 ? '+9' : count}
    </span>
  )
}

/**
 * FilterableContentLayout - Reusable template for pages with sticky header, filters, and mobile drawer
 *
 * Features:
 * - Scroll-aware header (hides on scroll down, shows on scroll up) - desktop only
 * - Sticky FilterBar on desktop
 * - Mobile filter drawer with bottom sheet pattern
 * - Navigation drawer detection (hides filters when nav drawer is open)
 * - Active filter count badges
 * - Responsive layout with proper z-index hierarchy (uses CSS variables from theme.css)
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
  tabs,
}: FilterableContentLayoutProps) {
  const { scrollDirection, scrollY } = useScrollDirection()

  // Local state for mobile filter drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Local state for temporary filter selections in drawer
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>({})
  const [localAvatarSelected, setLocalAvatarSelected] = useState<string[]>([])

  // Use media query hook for desktop detection
  const isDesktop = useMediaQuery(BREAKPOINTS.md)

  // Hide header when scrolling down past threshold, show when scrolling up (only on desktop)
  const shouldHideHeader = isDesktop && scrollDirection === 'down' && scrollY > SCROLL_THRESHOLD

  // Show shadow when content is scrolling behind sticky elements
  const showStickyShadow = scrollY > SHADOW_THRESHOLD

  // Initialize local state when drawer opens
  const handleOpenDrawer = () => {
    // Sync local state with current filter values
    const initialFilters: Record<string, string[]> = {}
    filters.forEach((filter) => {
      initialFilters[filter.label] = filter.selected ?? []
    })
    setLocalFilters(initialFilters)
    setLocalAvatarSelected(avatarSelector?.selected ?? [])
    setIsDrawerOpen(true)
  }

  // Handle checkbox toggle in drawer
  const handleFilterToggle = (filterLabel: string, optionValue: string) => {
    setLocalFilters((prev) => {
      const current = prev[filterLabel] ?? []
      const isSelected = current.includes(optionValue)
      return {
        ...prev,
        [filterLabel]: isSelected
          ? current.filter((v) => v !== optionValue)
          : [...current, optionValue],
      }
    })
  }

  // Handle avatar selection in drawer
  const handleAvatarSelect = (selected: string[]) => {
    setLocalAvatarSelected(selected)
  }

  // Calculate local active filters count for drawer
  const localActiveCount =
    Object.values(localFilters).reduce((acc, selected) => acc + selected.length, 0) +
    localAvatarSelected.length

  // Handle clear all in drawer
  const handleClearFilters = () => {
    const cleared: Record<string, string[]> = {}
    filters.forEach((filter) => {
      cleared[filter.label] = []
    })
    setLocalFilters(cleared)
    setLocalAvatarSelected([])
    onClearFilters?.()
  }

  // Handle apply - commit local state to parent and close drawer
  const handleApplyFilters = () => {
    // Apply filter selections to parent
    filters.forEach((filter) => {
      const localSelected = localFilters[filter.label] ?? []
      filter.onSelect(localSelected)
    })
    // Apply avatar selection to parent
    if (avatarSelector?.onAvatarSelect) {
      avatarSelector.onAvatarSelect(localAvatarSelected)
    }
    setIsDrawerOpen(false)
  }

  return (
    <div className="flex flex-col gap-0 min-h-full flex-1">
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

      {/* Desktop: Sticky FilterBar (below subnav, above content) */}
      <div
        className={cn(
          'hidden md:block sticky',
          'top-[4.5rem]',
          'z-[var(--z-sticky-filters)] bg-neutral-0 transition-all duration-base',
          showStickyShadow && 'shadow-sticky-light',
        )}
      >
        <AnimatedSection delay={0.05}>
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
        </AnimatedSection>
      </div>

      {/* Sticky Tabs below FilterBar (desktop only) */}
      {tabs && (
        <div
          className={cn(
            'hidden md:block sticky z-[var(--z-tabs)] bg-neutral-0',
            'top-[8rem]',
            'shadow-[--shadow-sticky-light]',
            'mb-0',
            'max-h-[3.5rem] h-[3.5rem] overflow-hidden',
          )}
        >
          {tabs}
        </div>
      )}

      {/* Mobile: Tabs sticky below header (mobile only) */}
      {tabs && (
        <div
          className={cn(
            'md:hidden sticky z-[--z-tabs] bg-neutral-0',
            'top-[--sticky-filters-mobile-offset]',
            'shadow-[--shadow-sticky-light]',
          )}
        >
          {tabs}
        </div>
      )}
      {/* Mobile: Filter Button that opens drawer - sticky below tabs */}
      <div
        className={cn(
          'md:hidden sticky top-[--sticky-filters-mobile-offset] z-[--z-sticky-filters] bg-neutral-0 py-1 px-1 -mb-1',
          showStickyShadow && '[box-shadow:var(--shadow-sticky-light)]',
        )}
      >
        <AnimatedSection delay={0.05}>
          <div className="flex gap-1 justify-between items-center">
            <Button
              variant="secondary"
              className="relative"
              leftIcon={<SlidersHorizontal width={20} />}
              onClick={handleOpenDrawer}
              aria-label={
                activeFiltersCount > 0
                  ? `${translations.filtersButton} (${activeFiltersCount} active)`
                  : translations.filtersButton
              }
            >
              {translations.filtersButton}
              <FilterBadge count={activeFiltersCount} className="absolute -top-0_25 -right-0_25" />
            </Button>
            {primaryAction && <div className="shrink-0">{primaryAction}</div>}
          </div>
        </AnimatedSection>
      </div>
      {/* Padding top para compensar sticky en desktop */}
      <div className={cn('flex flex-col flex-1 gap-1 md:gap-1 pt-1', contentClassName)}>
        {children}
      </div>

      {/* Mobile Filter Drawer - rendered directly for reactive state */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={drawerTitle}
        position="bottom"
        size="lg"
      >
        <div className="flex flex-col h-full">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Search First - Most used action */}
            {searchField && (
              <div className="mb-1.5">
                {translations.searchLabel && (
                  <Typography
                    variant="bodySmall"
                    fontWeight="semibold"
                    className="mb-0.5"
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
              <div className="mb-1.5">
                {translations.filterByLabel && (
                  <Typography
                    variant="bodySmall"
                    fontWeight="semibold"
                    className="mb-0.75"
                    color="neutral800"
                  >
                    {translations.filterByLabel}
                  </Typography>
                )}
                <div className="flex flex-col gap-1.5">
                  {filters.map((filter) => (
                    <div key={filter.label} className="border-b border-neutral-200 pb-1.5">
                      <Typography
                        variant="body"
                        fontWeight="semibold"
                        className="mb-0.75"
                        color="neutral800"
                      >
                        {filter.label}
                      </Typography>
                      <div className="flex flex-col gap-0.5">
                        {filter.options.map((option) => {
                          const isSelected =
                            localFilters[filter.label]?.includes(option.value) ?? false
                          return (
                            <label
                              key={option.value}
                              className="flex items-center gap-0.75 cursor-pointer py-0.5"
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() =>
                                  handleFilterToggle(filter.label, option.value)
                                }
                                aria-label={option.label}
                              />
                              <Typography variant="body" color="neutral800">
                                {option.label}
                              </Typography>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avatar Selector */}
            {avatarSelector && (
              <div className="mb-1.5">
                {translations.teamMembersLabel && (
                  <Typography
                    variant="bodySmall"
                    fontWeight="semibold"
                    className="mb-0.75"
                    color="neutral800"
                  >
                    {translations.teamMembersLabel}
                  </Typography>
                )}
                <AvatarSelect
                  {...avatarSelector}
                  selected={localAvatarSelected}
                  onAvatarSelect={handleAvatarSelect}
                />
              </div>
            )}
          </div>

          {/* Sticky Footer with actions */}
          <div className="sticky bottom-0 bg-neutral-0 border-t border-neutral-300 py-1 flex gap-0.75 -mx-1_5 px-1_5">
            <Button
              variant="secondary"
              onClick={handleClearFilters}
              className="flex-1"
              disabled={localActiveCount === 0}
            >
              {translations.clearAll}
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
              className="flex-1 text-neutral-0 relative"
              aria-label={
                localActiveCount > 0
                  ? `${translations.showResults} (${localActiveCount} active filters)`
                  : translations.showResults
              }
            >
              {translations.showResults}
              <FilterBadge
                count={localActiveCount}
                className="ml-0_5 bg-neutral-0 text-feedback-error-500 outline-feedback-error-500"
              />
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
