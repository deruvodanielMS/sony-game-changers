'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { CirclePlus } from 'lucide-react'
import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { Button } from '@/components/ui/atoms/Button'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { FilterableContentLayout } from '@/components/ui/templates/FilterableContentLayout'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { ROUTES } from '@/common/routes'
import { filterBarMocks } from './mocks'
import { useAmbitionsStore } from '@/stores/ambitions.store'

export default function GameChangersGoalsPage() {
  const t = useTranslations('Goals')
  const router = useRouter()
  const [selectedAvatars, setSelectedAvatars] = useState<Array<string>>([])
  const [selectedFilterType, setSelectedFilterType] = useState<Array<string>>([])
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<Array<string>>([])
  const [selectedSearchValue, setSelectedSearchValue] = useState('')
  const { list, fetchList } = useAmbitionsStore()

  useEffect(() => {
    fetchList()
  }, [fetchList])

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

  // Count active filters for badge
  const activeFiltersCount =
    selectedFilterStatus.length +
    selectedFilterType.length +
    selectedAvatars.length +
    (selectedSearchValue ? 1 : 0)

  return (
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
      activeFiltersCount={activeFiltersCount}
      primaryAction={
        <Button
          variant="primary"
          className="text-neutral-0"
          leftIcon={<CirclePlus width={24} />}
          onClick={() => router.push(ROUTES.GAME_CHANGERS_AMBITIONS_NEW)}
        >
          {t('newGoal')}
        </Button>
      }
    >
      {list.map((goalData, index) => {
        const { ladderedGoals, ...goal } = goalData
        const delay = Math.min(0.1 + index * 0.05, 0.4)
        return (
          <AnimatedSection key={goal.id} delay={delay}>
            <GoalCard ladderGoals={ladderedGoals} goal={goal} />
          </AnimatedSection>
        )
      })}
    </FilterableContentLayout>
  )
}
