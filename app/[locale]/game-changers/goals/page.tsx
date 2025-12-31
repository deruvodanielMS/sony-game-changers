'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { CirclePlus } from 'lucide-react'
import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { Button } from '@/components/ui/atoms/Button'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { FilterableContentLayout } from '@/components/ui/templates/FilterableContentLayout'
import { ROUTES } from '@/common/routes'
import { goalMocks, filterBarMocks } from './mocks'

export default function GameChangersGoalsPage() {
  const t = useTranslations('Goals')
  const router = useRouter()
  const [selectedAvatars, setSelectedAvatars] = useState<Array<string>>([])
  const [selectedFilterType, setSelectedFilterType] = useState<Array<string>>([])
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<Array<string>>([])
  const [selectedSearchValue, setSelectedSearchValue] = useState('')

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
      header={<GoalsHeader />}
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
          onClick={() => router.push(ROUTES.GAME_CHANGERS_GOALS_NEW)}
        >
          {t('newGoal')}
        </Button>
      }
    >
      {goalMocks.map((goalData) => (
        <GoalCard key={goalData.goal.id} {...goalData} />
      ))}
    </FilterableContentLayout>
  )
}
