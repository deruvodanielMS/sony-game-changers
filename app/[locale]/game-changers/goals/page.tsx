import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { Button } from '@/components/ui/atoms/Button'
import { AvatarSelectProps } from '@/components/ui/molecules/AvatarSelect/AvatarSelect.types'
import { FilterMultiSelectProps } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect.types'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { FilterBar } from '@/components/ui/organisms/GoalFilters/FilterBar'
import { GOAL_STATUSES, GOAL_TYPES } from '@/types/goals'
import { CirclePlus, SlidersHorizontal } from 'lucide-react'
import { useState, useEffect, useTransition } from 'react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { cn } from '@/utils/cn'
import { FilterMultiSelect } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect'
import { AvatarSelect } from '@/components/ui/molecules/AvatarSelect'
import { SearchField } from '@/components/ui/molecules/SearchField'
import { Typography } from '@/components/ui/foundations/Typography'

/**
 * Mocks
 */
const goalTeamMock = {
  goal: {
    id: 'goal-1',
    userName: 'Alice Williams',
    title:
      'Ensure core title features meet established quality bars to achieve a strong critical reception score and boost future sales.',
    status: GOAL_STATUSES.AWAITING_APPROVAL,
    goalType: GOAL_TYPES.TEAM,
    description:
      'Deliver a truly compelling, next-generation, immersive gaming experience immersive gaming experience that secures leading industry recognition and high player satisfaction.',
    avatarUrl: '/profile-img/profile.png',
  },
  ladderGoals: [
    {
      id: 'goal-2',
      userName: 'Bob Smith',
      title:
        'Verify the successful operation of all major systems and complete 100% of test cases before Alpha.',
      status: GOAL_STATUSES.DRAFT,
      goalType: GOAL_TYPES.TEAM,
      description: 'Increase conversion from 10% to 15%',
    },
    {
      id: 'goal-3',
      userName: 'Charlie Johnson',
      title:
        'Integrate all mandatory feedback from playtests into level design by the end of each sprint.',
      status: GOAL_STATUSES.COMPLETED,
      goalType: GOAL_TYPES.PERSONAL,
      avatarUrl: '/profile-img/profile.png',
    },
  ],
  'data-testid': 'goal-team-mock',
  allowAddChildrenGoals: true,
}

const goalPersonalMock = {
  goal: {
    id: 'goal-4',
    userName: 'David Brown',
    title:
      "Strategically increase The Team's technical expertise by implementing targeted upskilling initiatives in critical architectural domains (e.g., CI/CD).",
    status: GOAL_STATUSES.COMPLETED,
    goalType: GOAL_TYPES.PERSONAL,
    avatarUrl: '/profile-img/profile.png',
  },
  ladderGoals: [],
  'data-testid': 'goal-personal-mock',
  allowAddChildrenGoals: false,
}

const goalMock3 = {
  goal: {
    id: 'goal-5',
    userName: 'Emma Wilson',
    title: 'Develop comprehensive onboarding program for new team members',
    status: GOAL_STATUSES.DRAFT,
    goalType: GOAL_TYPES.TEAM,
    avatarUrl: '/profile-img/profile.png',
  },
  ladderGoals: [],
  'data-testid': 'goal-mock-3',
  allowAddChildrenGoals: true,
}

const goalMock4 = {
  goal: {
    id: 'goal-6',
    userName: 'James Miller',
    title: 'Improve code review process and documentation standards',
    status: GOAL_STATUSES.AWAITING_APPROVAL,
    goalType: GOAL_TYPES.PERSONAL,
    avatarUrl: '/profile-img/profile.png',
  },
  ladderGoals: [],
  'data-testid': 'goal-mock-4',
  allowAddChildrenGoals: false,
}

const goalMock5 = {
  goal: {
    id: 'goal-7',
    userName: 'Sofia Rodriguez',
    title: 'Establish quarterly team retrospectives and continuous improvement initiatives',
    status: GOAL_STATUSES.COMPLETED,
    goalType: GOAL_TYPES.TEAM,
    avatarUrl: '/profile-img/profile.png',
  },
  ladderGoals: [],
  'data-testid': 'goal-mock-5',
  allowAddChildrenGoals: true,
}

/**
 * Filter Bar mocks
 */

const filterBarMocks = {
  avatarSelector: {
    options: [
      { uid: 'nn0098', name: 'Nia Washington', url: '/profile-img/nia-washington.png' },
      { uid: 'nn0099', name: 'Sarah Miller', url: '/profile-img/sarah-miller.png' },
      { uid: 'nn0100', name: 'Kylie Davies', url: '/profile-img/kylie-davies.png' },
      { uid: 'nn0101', name: 'Lars van der Zee', url: '/profile-img/lars-van-der-zee.png' },
      { uid: 'nn01201', name: 'Other Lars', url: '/profile-img/lars-van-der-zee.png' },
      { uid: 'nn0102', name: 'Miguel Santos', url: '/profile-img/profile.png' },
    ],
    showItems: 4,
  },
  filters: [
    {
      label: 'Status',
      'data-testid': 'filter-status',
      options: [
        { label: 'Awaiting Approval', value: GOAL_STATUSES.AWAITING_APPROVAL },
        { label: 'Completed', value: GOAL_STATUSES.COMPLETED },
        { label: 'Draft', value: GOAL_STATUSES.DRAFT },
      ],
    },
    {
      label: 'Type',
      'data-testid': 'filter-category',
      options: [
        { label: 'Team', value: GOAL_TYPES.TEAM },
        { label: 'personal', value: GOAL_TYPES.PERSONAL },
      ],
    },
  ],
}

export default function GameChangersGoalsPage() {
  const [selectedAvatars, setSelectedAvatars] = useState<Array<string>>([])
  const [selectedFilterType, setSelectedFilterType] = useState<Array<string>>([])
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<Array<string>>([])
  const [selectedSearchValue, setSelectedSearchValue] = useState('')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const { scrollDirection, scrollY } = useScrollDirection()
  const [, startTransition] = useTransition()

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

  const handleClearFields = () => {
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

  // Hide header when scrolling down past 100px, show when scrolling up (only on desktop)
  // In mobile (width < 768px) we want to keep header visible
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768
  const shouldHideHeader = isDesktop && scrollDirection === 'down' && scrollY > 100

  // Detect if navigation drawer is open (mobile only)
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)

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

  return (
    <div className="flex flex-col gap-0 md:gap-3">
      {/* Header - hide on scroll only on desktop, always visible on mobile */}
      <div
        className="md:transition-[transform,opacity] md:duration-base md:ease-out mb-0 pt-28 md:pt-0"
        style={{
          transform: shouldHideHeader ? 'translateY(-100%)' : 'translateY(0)',
          opacity: shouldHideHeader ? 0 : 1,
        }}
      >
        <GoalsHeader />
      </div>

      {/* Desktop: Sticky FilterBar */}
      <div className="hidden md:block sticky top-24 z-800 bg-neutral-0 transition-all duration-base">
        <FilterBar
          clearFields
          filters={_filters as FilterMultiSelectProps[]}
          avatarSelector={_avatarSelector as AvatarSelectProps}
          searchField={{
            onChange: setSelectedSearchValue,
            defaultValue: selectedSearchValue,
          }}
        >
          <Button variant="primary" className="text-neutral-0" leftIcon={<CirclePlus width={24} />}>
            New Goal
          </Button>
        </FilterBar>
      </div>

      {/* Mobile: Filter Button that opens drawer */}
      <div
        className={cn(
          'md:hidden sticky top-28 z-800 bg-neutral-0 py-1 px-1 transition-opacity duration-base',
          (isFilterDrawerOpen || isNavDrawerOpen) && 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex gap-1 justify-between">
          <Button
            variant="secondary"
            className="flex-1 relative"
            leftIcon={<SlidersHorizontal width={20} />}
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-0.25 -right-0.25 inline-flex items-center justify-center w-5 h-5 text-body-tiny bg-accent-primary text-neutral-0 rounded-full font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          <Button variant="primary" className="text-neutral-0" iconOnly>
            <CirclePlus width={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter & Sort"
        position="bottom"
        size="full"
        className="h-[85vh]! md:h-[80vh]!"
      >
        <div className="flex flex-col h-full">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-1.5 pb-1.5">
            {/* Search First - Most used action */}
            <div className="mb-1.5">
              <Typography
                variant="bodySmall"
                fontWeight="semibold"
                className="mb-0.5"
                color="neutral800"
              >
                Search
              </Typography>
              <SearchField
                onChange={setSelectedSearchValue}
                defaultValue={selectedSearchValue}
                placeholder="Search ambitions..."
              />
            </div>

            {/* Filters Section */}
            <div className="mb-1.5">
              <Typography
                variant="bodySmall"
                fontWeight="semibold"
                className="mb-0.75"
                color="neutral800"
              >
                Filter By
              </Typography>
              <div className="flex flex-col gap-0.75">
                {_filters.map((filter) => (
                  <FilterMultiSelect key={filter.label} {...filter} />
                ))}
              </div>
            </div>

            {/* Avatar Selector */}
            {_avatarSelector && (
              <div className="mb-1.5">
                <Typography
                  variant="bodySmall"
                  fontWeight="semibold"
                  className="mb-0.75"
                  color="neutral800"
                >
                  Team Members
                </Typography>
                <AvatarSelect {..._avatarSelector} />
              </div>
            )}
          </div>

          {/* Sticky Footer with actions */}
          <div className="sticky bottom-0 bg-neutral-0 border-t border-neutral-300 px-1.5 py-1 flex gap-0.75">
            <Button
              variant="secondary"
              onClick={handleClearFields}
              className="flex-1"
              disabled={activeFiltersCount === 0}
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsFilterDrawerOpen(false)}
              className="flex-1 text-neutral-0 relative"
            >
              Show Results
              {activeFiltersCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 text-body-tiny bg-neutral-0 text-accent-primary rounded-full font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Goal Cards with gap */}
      <div className="flex flex-col gap-1 md:gap-1.5">
        <GoalCard {...goalTeamMock} />
        <GoalCard {...goalPersonalMock} />
        <GoalCard {...goalMock3} />
        <GoalCard {...goalMock4} />
        <GoalCard {...goalMock5} />
        <GoalCard {...goalTeamMock} />
        <GoalCard {...goalPersonalMock} />
      </div>
    </div>
  )
}
