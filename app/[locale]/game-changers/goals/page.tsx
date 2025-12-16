'use client'

import { GoalsHeader } from '@/components/game-changers/goals/GoalsHeader'
import { Button } from '@/components/ui/atoms/Button'
import { AvatarSelectProps } from '@/components/ui/molecules/AvatarSelect/AvatarSelect.types'
import { FilterMultiSelectProps } from '@/components/ui/molecules/FilterMultiSelect/FilterMultiSelect.types'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { FilterBar } from '@/components/ui/organisms/GoalFilters/FilterBar'
import { GOAL_STATUSES, GOAL_TYPES } from '@/types/goals'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

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

  return (
    <div className="flex flex-col gap-3">
      <GoalsHeader />
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
      <GoalCard {...goalTeamMock} />
      <GoalCard {...goalPersonalMock} />
    </div>
  )
}
