'use client'

import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/atoms/Button'
import { Typography } from '@/components/ui/foundations/Typography'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { FilterBar } from '@/components/ui/organisms/GoalFilters/FilterBar'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useUIStore } from '@/stores/ui.store'
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
        'inline-flex items-center justify-center w-5 h-5 text-body-tiny rounded-full font-bold',
        className,
      )}
      aria-label={`${count} active filters`}
    >
      {count}
    </span>
  )
}

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
  const { openDrawer, closeDrawer } = useUIStore()
  const { scrollDirection, scrollY } = useScrollDirection()

  // Use media query hook for desktop detection
  const isDesktop = useMediaQuery(BREAKPOINTS.md)

  // Hide header when scrolling down past threshold, show when scrolling up (only on desktop)
  const shouldHideHeader = isDesktop && scrollDirection === 'down' && scrollY > SCROLL_THRESHOLD

  // Show shadow when content is scrolling behind sticky elements
  const showStickyShadow = scrollY > SHADOW_THRESHOLD

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
      <div
        className={cn(
          'hidden md:block sticky top-[var(--sticky-filters-desktop-offset)] z-[var(--z-sticky-filters)] bg-neutral-0 pb-1 transition-all duration-base',
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

      {/* Mobile: Filter Button that opens drawer - sticky below tabs */}
      <div
        className={cn(
          'md:hidden sticky top-[var(--sticky-filters-mobile-offset)] z-[var(--z-sticky-filters)] bg-neutral-0 py-1 px-1 -mb-1',
          showStickyShadow && '[box-shadow:var(--shadow-sticky-light)]',
        )}
      >
        <AnimatedSection delay={0.05}>
          <div className="flex gap-1 justify-between">
            <Button
              variant="secondary"
              className="flex-1 relative"
              leftIcon={<SlidersHorizontal width={20} />}
              onClick={() => {
                const drawerContent = (
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
                          <div className="flex flex-col gap-1_5">
                            {filters.map((filter) => (
                              <div
                                key={filter.label}
                                className="border-b border-neutral-200 pb-1_5"
                              >
                                <Typography
                                  variant="body"
                                  fontWeight="semibold"
                                  className="mb-0_75"
                                  color="neutral800"
                                >
                                  {filter.label}
                                </Typography>
                                <div className="flex flex-col gap-0_5">
                                  {filter.options.map((option) => {
                                    const isSelected =
                                      filter.selected?.includes(option.value) ?? false
                                    return (
                                      <label
                                        key={option.value}
                                        className="flex items-center gap-0_75 cursor-pointer py-0_5"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => {
                                            const currentSelected = filter.selected ?? []
                                            const newSelected = isSelected
                                              ? currentSelected.filter((v) => v !== option.value)
                                              : [...currentSelected, option.value]
                                            filter.onSelect(newSelected)
                                          }}
                                          className="w-5 h-5 rounded border-2 border-neutral-400 text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 cursor-pointer"
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
                          closeDrawer()
                        }}
                        className="flex-1"
                        disabled={activeFiltersCount === 0}
                      >
                        {translations.clearAll}
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => closeDrawer()}
                        className="flex-1 text-neutral-0 relative"
                        aria-label={
                          activeFiltersCount > 0
                            ? `${translations.showResults} (${activeFiltersCount} active filters)`
                            : translations.showResults
                        }
                      >
                        {translations.showResults}
                        <FilterBadge
                          count={activeFiltersCount}
                          className="ml-0_5 bg-neutral-0 text-accent-primary"
                        />
                      </Button>
                    </div>
                  </div>
                )

                openDrawer(drawerContent, {
                  title: drawerTitle,
                  position: 'bottom',
                  size: 'lg',
                })
              }}
              aria-label={
                activeFiltersCount > 0
                  ? `${translations.filtersButton} (${activeFiltersCount} active)`
                  : translations.filtersButton
              }
            >
              {translations.filtersButton}
              <FilterBadge
                count={activeFiltersCount}
                className="absolute -top-0_25 -right-0_25 bg-accent-primary text-neutral-0"
              />
            </Button>
            {primaryAction && <div className="shrink-0">{primaryAction}</div>}
          </div>
        </AnimatedSection>
      </div>

      <div className={cn('flex flex-col gap-1 md:gap-1_5 pt-1 md:pt-0', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
