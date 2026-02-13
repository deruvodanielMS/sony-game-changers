'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { CirclePlus, AlertCircle } from 'lucide-react'
import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { NewAmbitionModal } from '@/components/game-changers/ambitions/NewAmbitionModal'
import { ManagerAmbitions } from '@/components/game-changers/ambitions/ManagerAmbitions'
import { Button } from '@/components/ui/atoms/Button'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { EmptyState } from '@/components/ui/molecules/EmptyState'
import { FilterableContentLayout } from '@/components/ui/templates/FilterableContentLayout'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Tabs } from '@/components/ui/molecules/Tabs'
import type { TabItem } from '@/components/ui/molecules/Tabs'
import { useGoalsStore } from '@/stores/goals.store'
import { AmbitionsLoading } from '@/components/ui/molecules/Loadings'
import { GOAL_STATUSES } from '@/domain/goal'

type TabValue = 'active' | 'drafts' | 'archived'

export default function GameChangersGoalsPage() {
  const t = useTranslations('Goals')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedAvatars, setSelectedAvatars] = useState<Array<string>>([])
  const [selectedFilterType, setSelectedFilterType] = useState<Array<string>>([])
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<Array<string>>([])
  const [selectedSearchValue, setSelectedSearchValue] = useState('')
  const [isNewAmbitionOpen, setIsNewAmbitionOpen] = useState(false)
  const [isManagerAmbitionsVisible, setIsManagerAmbitionsVisible] = useState(true)
  const [selectedParentAmbitionId, setSelectedParentAmbitionId] = useState<string | null>(null)
  const {
    list,
    listError,
    fetchList,
    managerAmbitions,
    fetchManagerAmbitions,
    goalFilters,
    fetchGoalFilters,
  } = useGoalsStore()

  // Get current tab from URL or default to 'active'
  const currentTab = (searchParams.get('tab') as TabValue) || 'active'

  // Fetch goals, manager ambitions and filters on mount
  useEffect(() => {
    fetchList()
    fetchManagerAmbitions()
    fetchGoalFilters()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filters = goalFilters?.filters ?? []
  const avatarSelector = goalFilters?.avatarSelector ?? { options: [], showItems: 4 }

  const _filters = [
    { onSelect: setSelectedFilterStatus, selected: selectedFilterStatus, ...filters[0] },
    { onSelect: setSelectedFilterType, selected: selectedFilterType, ...filters[1] },
  ].filter((f) => f.label) // Filter out undefined filters

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
    { value: 'drafts', label: t('draftsTab') },
    { value: 'archived', label: t('archivedTab') },
  ]

  // Flatten goals to include ladderedGoals for filtering (archived/draft children should appear in tabs)
  const flattenedList =
    list?.flatMap((goalData) => [
      goalData,
      ...(goalData.ladderedGoals || []).map((lg) => ({
        ...lg,
        ladderedGoals: [], // nested goals don't have further children in UI
      })),
    ]) || []

  // Filter goals based on current tab and active filters
  const filteredList = flattenedList.filter((goalData) => {
    // Tab filter: archived vs drafts vs active
    if (currentTab === 'archived') {
      if (goalData.status !== GOAL_STATUSES.ARCHIVED) return false
    } else if (currentTab === 'drafts') {
      if (goalData.status !== GOAL_STATUSES.DRAFT) return false
    } else {
      // Active tab: exclude archived and drafts
      if (goalData.status === GOAL_STATUSES.ARCHIVED || goalData.status === GOAL_STATUSES.DRAFT)
        return false
    }

    // Avatar filter: filter by assigned user uid
    if (selectedAvatars.length > 0) {
      if (!selectedAvatars.includes(goalData.uid)) return false
    }

    // Status filter
    if (selectedFilterStatus.length > 0) {
      if (!selectedFilterStatus.includes(goalData.status)) return false
    }

    // Type filter
    if (selectedFilterType.length > 0) {
      if (!goalData.goalType || !selectedFilterType.includes(goalData.goalType)) return false
    }

    // Search filter: search in title and description
    if (selectedSearchValue.trim()) {
      const searchLower = selectedSearchValue.toLowerCase().trim()
      const titleMatch = goalData.title.toLowerCase().includes(searchLower)
      const descriptionMatch = goalData.description?.toLowerCase().includes(searchLower) || false
      const userNameMatch = goalData.userName.toLowerCase().includes(searchLower)
      if (!titleMatch && !descriptionMatch && !userNameMatch) return false
    }

    return true
  })

  // Count active filters for badge
  const activeFiltersCount =
    selectedFilterStatus.length +
    selectedFilterType.length +
    selectedAvatars.length +
    (selectedSearchValue ? 1 : 0)

  if (list === null) {
    return <AmbitionsLoading />
  }

  // Show error state if there was an error fetching goals
  if (listError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2 p-2">
        <AlertCircle className="w-4 h-4 text-feedback-error-500" />
        <h2 className="text-h5 font-semibold text-neutral-1000">Unable to load ambitions</h2>
        <p className="text-body text-neutral-700 text-center max-w-md">{listError}</p>
        <Button variant="secondary" onClick={() => fetchList()}>
          Try again
        </Button>
      </div>
    )
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
            leftIcon={<CirclePlus />}
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
        {/* Manager Ambitions Card */}
        {isManagerAmbitionsVisible && currentTab === 'active' && managerAmbitions && (
          <AnimatedSection delay={0.1} className="mb-1">
            <ManagerAmbitions
              title={managerAmbitions.title}
              ambitions={managerAmbitions.ambitions}
              onAddLaddered={(ambitionId) => {
                setSelectedParentAmbitionId(ambitionId)
                setIsNewAmbitionOpen(true)
              }}
              onDismiss={() => setIsManagerAmbitionsVisible(false)}
            />
          </AnimatedSection>
        )}

        {filteredList.length === 0 ? (
          <AnimatedSection delay={0.1} className="flex-1 flex flex-col">
            {currentTab === 'active' ? (
              <EmptyState
                title={t('emptyState.active.title')}
                description={t('emptyState.active.description')}
                actionLabel={t('newGoal')}
                actionIcon={<CirclePlus />}
                onAction={() => setIsNewAmbitionOpen(true)}
              />
            ) : currentTab === 'drafts' ? (
              <EmptyState
                title={t('emptyState.drafts.title')}
                description={t('emptyState.drafts.description')}
                actionLabel={t('newGoal')}
                actionIcon={<CirclePlus />}
                onAction={() => setIsNewAmbitionOpen(true)}
              />
            ) : (
              <EmptyState
                title={t('emptyState.archived.title')}
                description={t('emptyState.archived.description')}
              />
            )}
          </AnimatedSection>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredList.map((goalData, index) => {
              const { ladderedGoals, ...goal } = goalData
              const delay = Math.min(0.1 + index * 0.05, 0.4)
              return (
                <AnimatedSection key={goal.id} delay={delay}>
                  <GoalCard
                    ladderGoals={ladderedGoals}
                    goal={goal}
                    onAddLadderedGoal={() => {
                      setSelectedParentAmbitionId(goal.id)
                      setIsNewAmbitionOpen(true)
                    }}
                  />
                </AnimatedSection>
              )
            })}
          </div>
        )}
      </FilterableContentLayout>
      <NewAmbitionModal
        open={isNewAmbitionOpen}
        onClose={() => {
          setIsNewAmbitionOpen(false)
          setSelectedParentAmbitionId(null)
        }}
        parentAmbitionId={selectedParentAmbitionId || undefined}
      />
    </>
  )
}
