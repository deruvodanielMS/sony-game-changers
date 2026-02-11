'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { CirclePlus } from 'lucide-react'
import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { NewAmbitionModal } from '@/components/game-changers/ambitions/NewAmbitionModal'
import { Button } from '@/components/ui/atoms/Button'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { FilterableContentLayout } from '@/components/ui/templates/FilterableContentLayout'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Tabs } from '@/components/ui/molecules/Tabs'
import type { TabItem } from '@/components/ui/molecules/Tabs'
import { filterBarMocks } from './mocks'
import { useGoalsStore } from '@/stores/goals.store'
import { AmbitionsLoading } from '@/components/ui/molecules/Loadings'
import { GOAL_STATUSES } from '@/domain/goal'

type TabValue = 'active' | 'archived'

export default function GameChangersGoalsPage() {
  const t = useTranslations('Goals')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedAvatars, setSelectedAvatars] = useState<Array<string>>([])
  const [selectedFilterType, setSelectedFilterType] = useState<Array<string>>([])
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<Array<string>>([])
  const [selectedSearchValue, setSelectedSearchValue] = useState('')
  const [isNewAmbitionOpen, setIsNewAmbitionOpen] = useState(false)
  const { list, fetchList } = useGoalsStore()

  // Get current tab from URL or default to 'active'
  const currentTab = (searchParams.get('tab') as TabValue) || 'active'

  // Fetch goals only once on mount
  useEffect(() => {
    fetchList()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { filters, avatarSelector } = filterBarMocks

  const _filters = [
    { onSelect: setSelectedFilterStatus, selected: selectedFilterStatus, ...filters[0] },
    { onSelect: setSelectedFilterType, selected: selectedFilterType, ...filters[1] },
  ]

  const _avatarSelector = {
    onAvatarSelect: setSelectedAvatars,
    selected: selectedAvatars,
    ...avatarSelector,
  }

  const handleClearFilters = () => {
    setSelectedSearchValue('')
    setSelectedFilterStatus([])
    setSelectedFilterType([])
    setSelectedAvatars([])
  }

  // Handle tab change with URL update
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.push(`?${params.toString()}`)
  }

  // Tab items with i18n
  const tabItems: TabItem[] = [
    { value: 'active', label: t('activeTab') },
    { value: 'archived', label: t('archivedTab') },
  ]

  // Filter goals based on current tab
  const filteredList =
    list?.filter((goalData) => {
      if (currentTab === 'archived') {
        // Archived tab: show completed goals
        return goalData.status === GOAL_STATUSES.COMPLETED
      }
      // Active tab: show non-completed goals
      return goalData.status !== GOAL_STATUSES.COMPLETED
    }) || []

  // Count active filters for badge
  const activeFiltersCount =
    selectedFilterStatus.length +
    selectedFilterType.length +
    selectedAvatars.length +
    (selectedSearchValue ? 1 : 0)

  if (list === null) {
    return <AmbitionsLoading />
  }

  return (
    <>
      <FilterableContentLayout
        header={
          <AnimatedSection delay={0}>
            <GoalsHeader />
          </AnimatedSection>
        }
        filters={_filters}
        avatarSelector={_avatarSelector}
        searchField={{
          value: selectedSearchValue,
          onChange: setSelectedSearchValue,
          placeholder: t('filterDrawer.searchPlaceholder'),
          label: t('filterDrawer.searchLabel'),
          clearable: true,
        }}
        onClearFilters={handleClearFilters}
        drawerTitle={t('filterDrawer.title')}
        translations={{
          filtersButton: t('filtersButton'),
          searchLabel: t('filterDrawer.searchLabel'),
          filterByLabel: t('filterDrawer.filterByLabel'),
          teamMembersLabel: t('filterDrawer.teamMembersLabel'),
          clearAll: t('filterDrawer.clearAll'),
          showResults: t('filterDrawer.showResults'),
        }}
        contentClassName="gap-1 md:gap-1"
        activeFiltersCount={activeFiltersCount}
        primaryAction={
          <Button
            variant="primary"
            className="text-neutral-0"
            leftIcon={<CirclePlus width={24} />}
            onClick={() => setIsNewAmbitionOpen(true)}
          >
            {t('newGoal')}
          </Button>
        }
        tabs={
          <AnimatedSection delay={0.05} className="mt-1">
            <Tabs
              items={tabItems}
              value={currentTab}
              onChange={handleTabChange}
              className="bg-neutral-0"
            />
          </AnimatedSection>
        }
      >
        <div className="flex flex-col gap-1">
          {filteredList.map((goalData, index) => {
            const { ladderedGoals, ...goal } = goalData
            const delay = Math.min(0.1 + index * 0.05, 0.4)
            return (
              <AnimatedSection key={goal.id} delay={delay}>
                <GoalCard ladderGoals={ladderedGoals} goal={goal} />
              </AnimatedSection>
            )
          })}
        </div>
      </FilterableContentLayout>
      <NewAmbitionModal open={isNewAmbitionOpen} onClose={() => setIsNewAmbitionOpen(false)} />
    </>
  )
}
