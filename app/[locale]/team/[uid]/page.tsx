'use client'

import { use, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CirclePlus } from 'lucide-react'
import { ROUTES } from '@/common/routes'
import { useRouter } from '@/i18n/navigation'
import { useGoalsStore } from '@/stores/goals.store'
import { GOAL_STATUSES } from '@/domain/goal'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
import { Switcher } from '@/components/ui/molecules/Switcher'
import {
  CalendarIcon,
  ChatIcon,
  UserActivityIcon,
  RadarIcon,
} from '@/components/ui/foundations/Icons'
import { Tabs } from '@/components/ui/molecules/Tabs'
import type { TabItem } from '@/components/ui/molecules/Tabs'
import { FilterableContentLayout } from '@/components/ui/templates/FilterableContentLayout'
import { TeamMemberHeaderCard } from '@/components/team/TeamMemberHeaderCard'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { EmptyState } from '@/components/ui/molecules/EmptyState'
import { Button } from '@/components/ui/atoms/Button'
import { AmbitionsLoading } from '@/components/ui/molecules/Loadings'
import { NewAmbitionModal } from '@/components/game-changers/ambitions/NewAmbitionModal'

type TabValue = 'active' | 'drafts' | 'archived'

const TEAM_MEMBER_METADATA: Record<string, { location: string; joinedDate: string }> = {
  'user-1': { location: 'San Francisco, US', joinedDate: 'April 2022' },
  'user-5': { location: 'Los Angeles, US', joinedDate: 'October 2024' },
}

export default function TeamMemberAmbitionsPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params)
  const tTeam = useTranslations('Team')
  const tGoals = useTranslations('Goals')
  const tPages = useTranslations('Pages')
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = (searchParams.get('tab') as TabValue) || 'active'

  const [selectedFilterType, setSelectedFilterType] = useState<Array<string>>([])
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<Array<string>>([])
  const [selectedSearchValue, setSelectedSearchValue] = useState('')
  const [isNewAmbitionOpen, setIsNewAmbitionOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState('ambitions')

  const { list, listError, fetchList, goalFilters, fetchGoalFilters } = useGoalsStore()

  useEffect(() => {
    fetchList()
    fetchGoalFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const member = useMemo(
    () => goalFilters?.avatarSelector?.options.find((option) => option.uid === uid),
    [goalFilters?.avatarSelector?.options, uid],
  )

  const metadata = TEAM_MEMBER_METADATA[uid]
  const filters = goalFilters?.filters ?? []

  const _filters = [
    { onSelect: setSelectedFilterStatus, selected: selectedFilterStatus, ...filters[0] },
    { onSelect: setSelectedFilterType, selected: selectedFilterType, ...filters[1] },
  ].filter((f) => f.label)

  const handleClearFilters = () => {
    setSelectedSearchValue('')
    setSelectedFilterStatus([])
    setSelectedFilterType([])
  }

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.push(`?${params.toString()}`)
  }

  const handleSubNavChange = (value: string) => {
    setSelectedSection(value)
    if (value === 'ambitions') return
    if (value === 'check-ins') router.push(ROUTES.GAME_CHANGERS_CHECK_INS)
    if (value === 'feedback') router.push(ROUTES.GAME_CHANGERS_FEEDBACK)
    if (value === 'performance-reviews') router.push(ROUTES.GAME_CHANGERS_PERFORMANCE_REVIEW)
  }

  const tabItems: TabItem[] = [
    { value: 'active', label: tGoals('activeTab') },
    { value: 'archived', label: tGoals('archivedTab') },
  ]

  const filteredList = (list || []).filter((goalData) => {
    if (goalData.uid !== uid) return false

    if (currentTab === 'archived') {
      if (goalData.status !== GOAL_STATUSES.ARCHIVED) return false
    } else {
      if (goalData.status === GOAL_STATUSES.ARCHIVED) return false
    }

    if (selectedFilterStatus.length > 0 && !selectedFilterStatus.includes(goalData.status)) {
      return false
    }

    if (selectedFilterType.length > 0) {
      if (!goalData.goalType || !selectedFilterType.includes(goalData.goalType)) return false
    }

    if (selectedSearchValue.trim()) {
      const searchLower = selectedSearchValue.toLowerCase().trim()
      const titleMatch = goalData.title.toLowerCase().includes(searchLower)
      const descriptionMatch = goalData.description?.toLowerCase().includes(searchLower) || false
      if (!titleMatch && !descriptionMatch) return false
    }

    return true
  })

  const activeFiltersCount =
    selectedFilterStatus.length + selectedFilterType.length + (selectedSearchValue ? 1 : 0)

  if (list === null || !goalFilters) {
    return <AmbitionsLoading />
  }

  if (listError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2 p-2">
        <h2 className="text-h5 font-semibold text-neutral-1000">Unable to load ambitions</h2>
        <p className="text-body text-neutral-700 text-center max-w-md">{listError}</p>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="flex flex-col gap-1_5">
        <Breadcrumb items={[{ label: tTeam('title'), href: ROUTES.TEAM }, { label: uid }]} />
        <EmptyState variant="compact" title={tTeam('emptyState.title')} description={uid} />
      </div>
    )
  }

  return (
    <div className="p-1 md:pt-2 md:px-3 md:pb-3 mt-4.5 md:mt-0">
      <FilterableContentLayout
        header={
          <div className="flex flex-col gap-1">
            <AnimatedSection delay={0}>
              <Breadcrumb
                items={[{ label: tTeam('title'), href: ROUTES.TEAM }, { label: member.name }]}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <Switcher
                ariaLabel="Team member section navigation"
                size="large"
                variant="generic"
                value={selectedSection}
                onChange={handleSubNavChange}
                items={[
                  {
                    id: 'ambitions',
                    label: tPages('gameChangersGoals'),
                    icon: <RadarIcon className="w-1_25 h-1_25" />,
                  },
                  {
                    id: 'check-ins',
                    label: tPages('gameChangersCheckIns'),
                    icon: <CalendarIcon className="w-1_25 h-1_25" />,
                  },
                  {
                    id: 'feedback',
                    label: tPages('gameChangersFeedback'),
                    icon: <ChatIcon className="w-1_25 h-1_25" />,
                  },
                  {
                    id: 'performance-reviews',
                    label: tPages('gameChangersPerformanceReviews'),
                    icon: <UserActivityIcon className="w-1_25 h-1_25" />,
                  },
                ]}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <TeamMemberHeaderCard
                name={member.name}
                role={member.role}
                avatarUrl={member.url}
                location={metadata?.location || tTeam('memberDetails.locationUnknown')}
                joinedLabel={
                  metadata?.joinedDate
                    ? tTeam('memberDetails.joinedIn', { date: metadata.joinedDate })
                    : tTeam('memberDetails.joinedUnknown')
                }
              />
            </AnimatedSection>
          </div>
        }
        filters={_filters}
        searchField={{
          value: selectedSearchValue,
          onChange: setSelectedSearchValue,
          placeholder: tGoals('filterDrawer.searchPlaceholder'),
          label: tGoals('filterDrawer.searchLabel'),
          clearable: true,
        }}
        onClearFilters={handleClearFilters}
        drawerTitle={tGoals('filterDrawer.title')}
        translations={{
          filtersButton: tGoals('filtersButton'),
          searchLabel: tGoals('filterDrawer.searchLabel'),
          filterByLabel: tGoals('filterDrawer.filterByLabel'),
          teamMembersLabel: tGoals('filterDrawer.teamMembersLabel'),
          clearAll: tGoals('filterDrawer.clearAll'),
          showResults: tGoals('filterDrawer.showResults'),
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
            {tGoals('newGoal')}
          </Button>
        }
        tabs={
          <AnimatedSection delay={0.15} className="mt-1">
            <Tabs
              items={tabItems}
              value={currentTab}
              onChange={handleTabChange}
              className="bg-neutral-0"
            />
          </AnimatedSection>
        }
      >
        {filteredList.length === 0 ? (
          <AnimatedSection delay={0.2} className="flex-1 flex flex-col">
            {currentTab === 'active' ? (
              <EmptyState
                title={tGoals('emptyState.active.title')}
                description={tGoals('emptyState.active.description')}
                actionLabel={tGoals('newGoal')}
                actionIcon={<CirclePlus />}
                onAction={() => setIsNewAmbitionOpen(true)}
              />
            ) : (
              <EmptyState
                title={tGoals('emptyState.archived.title')}
                description={tGoals('emptyState.archived.description')}
              />
            )}
          </AnimatedSection>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredList.map((goalData, index) => {
              const { ladderedGoals, ...goal } = goalData
              const delay = Math.min(0.2 + index * 0.05, 0.45)
              return (
                <AnimatedSection key={goal.id} delay={delay}>
                  <GoalCard
                    ladderGoals={ladderedGoals}
                    goal={goal}
                    onAddLadderedGoal={() => setIsNewAmbitionOpen(true)}
                  />
                </AnimatedSection>
              )
            })}
          </div>
        )}
      </FilterableContentLayout>

      <NewAmbitionModal open={isNewAmbitionOpen} onClose={() => setIsNewAmbitionOpen(false)} />
    </div>
  )
}
