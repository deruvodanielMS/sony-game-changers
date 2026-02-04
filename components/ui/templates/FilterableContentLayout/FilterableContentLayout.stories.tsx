import type { Meta, StoryObj } from '@storybook/react'
import { FilterableContentLayout } from './FilterableContentLayout'
import { GoalCard } from '@/components/ui/organisms/GoalCard'
import { Button } from '@/components/ui/atoms/Button'
import { Typography } from '@/components/ui/foundations/Typography'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { GOAL_STATUSES, GOAL_TYPES } from '@/domain/goal'
import type { FilterableContentLayoutProps } from './FilterableContentLayout.types'

const meta = {
  title: 'Templates/FilterableContentLayout',
  component: FilterableContentLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reusable template for pages with sticky header, filters, and mobile drawer. Provides responsive filtering with scroll-aware header behavior.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterableContentLayout>

export default meta
type Story = StoryObj<typeof FilterableContentLayout>

// Mock data
const mockGoal = {
  goal: {
    id: 'goal-1',
    uid: 'user-1',
    userName: 'Alice Williams',
    title: 'Improve team collaboration and communication',
    status: GOAL_STATUSES.AWAITING_APPROVAL,
    goalType: GOAL_TYPES.BUSINESS,
    avatarUrl: '/profile-img/profile.png',
    progress: 50,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  ladderGoals: [],
  'data-testid': 'goal-1',
  allowAddChildrenGoals: true,
}

const mockFilters = [
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
    'data-testid': 'filter-type',
    options: [
      { label: 'Team', value: GOAL_TYPES.BUSINESS },
      { label: 'Personal', value: GOAL_TYPES.MANAGER_EFFECTIVENESS },
    ],
  },
]

const mockAvatarSelector = {
  options: [
    { uid: 'nn0098', name: 'Nia Washington', url: '/profile-img/nia-washington.png' },
    { uid: 'nn0099', name: 'Sarah Miller', url: '/profile-img/sarah-miller.png' },
    { uid: 'nn0100', name: 'Kylie Davies', url: '/profile-img/kylie-davies.png' },
    { uid: 'nn0101', name: 'Lars van der Zee', url: '/profile-img/lars-van-der-zee.png' },
  ],
  showItems: 4,
}

const mockTranslations = {
  filtersButton: 'Filters',
  searchLabel: 'Search',
  filterByLabel: 'Filter by',
  teamMembersLabel: 'Team Members',
  clearAll: 'Clear All',
  showResults: 'Show Results',
}

const SampleHeader = () => (
  <div className="p-3 bg-neutral-100">
    <Typography variant="h1" fontWeight="bold">
      Goals
    </Typography>
    <Typography variant="body" color="neutral600">
      Track and manage your team goals
    </Typography>
  </div>
)

const DefaultStory = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')

  const filters = [
    { onSelect: setSelectedStatus, selected: selectedStatus, ...mockFilters[0] },
    { onSelect: setSelectedType, selected: selectedType, ...mockFilters[1] },
  ]

  const avatarSelector = {
    onAvatarSelect: setSelectedAvatars,
    selected: selectedAvatars,
    ...mockAvatarSelector,
  }

  const activeFiltersCount =
    selectedStatus.length + selectedType.length + selectedAvatars.length + (searchValue ? 1 : 0)

  return (
    <FilterableContentLayout
      header={<SampleHeader />}
      filters={filters}
      avatarSelector={avatarSelector}
      searchField={{
        value: searchValue,
        onChange: setSearchValue,
        placeholder: 'Search goals...',
        label: 'Search',
      }}
      drawerTitle="Filter Goals"
      translations={mockTranslations}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={() => {
        setSelectedStatus([])
        setSelectedType([])
        setSelectedAvatars([])
        setSearchValue('')
      }}
      primaryAction={
        <Button variant="primary" className="text-neutral-0" leftIcon={<CirclePlus width={24} />}>
          New Goal
        </Button>
      }
    >
      <GoalCard {...mockGoal} />
      <GoalCard {...mockGoal} />
      <GoalCard {...mockGoal} />
    </FilterableContentLayout>
  )
}

export const Default: Story = {
  render: () => <DefaultStory />,
}

const WithActiveFiltersStory = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([GOAL_STATUSES.COMPLETED])
  const [selectedType, setSelectedType] = useState<string[]>([GOAL_TYPES.BUSINESS])
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>(['nn0098'])
  const [searchValue, setSearchValue] = useState('collaboration')

  const filters = [
    { onSelect: setSelectedStatus, selected: selectedStatus, ...mockFilters[0] },
    { onSelect: setSelectedType, selected: selectedType, ...mockFilters[1] },
  ]

  const avatarSelector = {
    onAvatarSelect: setSelectedAvatars,
    selected: selectedAvatars,
    ...mockAvatarSelector,
  }

  const activeFiltersCount =
    selectedStatus.length + selectedType.length + selectedAvatars.length + 1

  return (
    <FilterableContentLayout
      header={<SampleHeader />}
      filters={filters}
      avatarSelector={avatarSelector}
      searchField={{
        value: searchValue,
        onChange: setSearchValue,
        placeholder: 'Search goals...',
        label: 'Search',
      }}
      drawerTitle="Filter Goals"
      translations={mockTranslations}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={() => {
        setSelectedStatus([])
        setSelectedType([])
        setSelectedAvatars([])
        setSearchValue('')
      }}
      primaryAction={
        <Button variant="primary" className="text-neutral-0" leftIcon={<CirclePlus width={24} />}>
          New Goal
        </Button>
      }
    >
      <GoalCard {...mockGoal} />
    </FilterableContentLayout>
  )
}

export const WithActiveFilters: Story = {
  render: () => <WithActiveFiltersStory />,
}

const WithoutAvatarSelectorStory = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')

  const filters = [
    { onSelect: setSelectedStatus, selected: selectedStatus, ...mockFilters[0] },
    { onSelect: setSelectedType, selected: selectedType, ...mockFilters[1] },
  ]

  const activeFiltersCount = selectedStatus.length + selectedType.length + (searchValue ? 1 : 0)

  return (
    <FilterableContentLayout
      header={<SampleHeader />}
      filters={filters}
      searchField={{
        value: searchValue,
        onChange: setSearchValue,
        placeholder: 'Search goals...',
        label: 'Search',
      }}
      drawerTitle="Filter Goals"
      translations={mockTranslations}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={() => {
        setSelectedStatus([])
        setSelectedType([])
        setSearchValue('')
      }}
      primaryAction={
        <Button variant="primary" className="text-neutral-0" leftIcon={<CirclePlus width={24} />}>
          New Goal
        </Button>
      }
    >
      <GoalCard {...mockGoal} />
      <GoalCard {...mockGoal} />
    </FilterableContentLayout>
  )
}

export const WithoutAvatarSelector: Story = {
  render: () => <WithoutAvatarSelectorStory />,
}

const WithoutSearchStory = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([])

  const filters = [
    { onSelect: setSelectedStatus, selected: selectedStatus, ...mockFilters[0] },
    { onSelect: setSelectedType, selected: selectedType, ...mockFilters[1] },
  ]

  const avatarSelector = {
    onAvatarSelect: setSelectedAvatars,
    selected: selectedAvatars,
    ...mockAvatarSelector,
  }

  const activeFiltersCount = selectedStatus.length + selectedType.length + selectedAvatars.length

  return (
    <FilterableContentLayout
      header={<SampleHeader />}
      filters={filters}
      avatarSelector={avatarSelector}
      drawerTitle="Filter Goals"
      translations={mockTranslations}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={() => {
        setSelectedStatus([])
        setSelectedType([])
        setSelectedAvatars([])
      }}
      primaryAction={
        <Button variant="primary" className="text-neutral-0" leftIcon={<CirclePlus width={24} />}>
          New Goal
        </Button>
      }
    >
      <GoalCard {...mockGoal} />
    </FilterableContentLayout>
  )
}

export const WithoutSearch: Story = {
  render: () => <WithoutSearchStory />,
}

const MinimalConfigurationStory = () => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])

  const filters = [{ onSelect: setSelectedStatus, selected: selectedStatus, ...mockFilters[0] }]

  return (
    <FilterableContentLayout
      header={<SampleHeader />}
      filters={filters}
      drawerTitle="Filter"
      translations={mockTranslations}
      activeFiltersCount={selectedStatus.length}
      onClearFilters={() => setSelectedStatus([])}
    >
      <GoalCard {...mockGoal} />
    </FilterableContentLayout>
  )
}

export const MinimalConfiguration: Story = {
  render: () => <MinimalConfigurationStory />,
}
