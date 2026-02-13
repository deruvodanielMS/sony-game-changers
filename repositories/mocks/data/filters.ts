import { ManagerAmbitionsData, GoalFiltersData, GOAL_STATUSES, GOAL_TYPES } from '@/domain/goal'

export const managerAmbitions: ManagerAmbitionsData = {
  title: 'Your manager has created business Ambitions that may interest you!',
  ambitions: [
    {
      id: 'manager-ambition-1',
      title:
        'Deliver all assigned project milestones for the current fiscal year while maintaining the quality standards defined by Sony Interactive Entertainment.',
    },
    {
      id: 'manager-ambition-2',
      title: 'This is the space for an amazing Ambition name from your Manager.',
    },
  ],
}

export const goalFilters: GoalFiltersData = {
  avatarSelector: {
    options: [
      {
        uid: 'user-1',
        name: 'James Miller',
        url: '/profile-img/profile.png',
        role: 'Manager',
      },
      {
        uid: 'user-2',
        name: 'Sarah Miller',
        url: '/profile-img/sarah-miller.png',
        role: 'Senior Engineer',
      },
      {
        uid: 'user-3',
        name: 'David Brown',
        url: '/profile-img/lars-van-der-zee.png',
        role: 'Tech Lead',
      },
      {
        uid: 'user-4',
        name: 'Nia Washington',
        url: '/profile-img/nia-washington.png',
        role: 'Senior Software Engineer',
      },
      {
        uid: 'user-5',
        name: 'Kylie Davies',
        url: '/profile-img/kylie-davies.png',
        role: 'Product Manager',
      },
    ],
    showItems: 4,
  },
  filters: [
    {
      label: 'Status',
      'data-testid': 'filter-status',
      options: [
        { label: 'Draft', value: GOAL_STATUSES.DRAFT },
        { label: 'Awaiting Approval', value: GOAL_STATUSES.AWAITING_APPROVAL },
        { label: 'In Progress', value: GOAL_STATUSES.APPROVED },
        { label: 'Completed', value: GOAL_STATUSES.COMPLETED },
        { label: 'Archived', value: GOAL_STATUSES.ARCHIVED },
      ],
      single: true,
    },
    {
      label: 'Type',
      'data-testid': 'filter-category',
      options: [
        { label: 'Business', value: GOAL_TYPES.BUSINESS },
        { label: 'Manager effectiveness', value: GOAL_TYPES.MANAGER_EFFECTIVENESS },
        {
          label: 'Personal growth and development',
          value: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        },
      ],
      single: true,
    },
  ],
  activePeriodId: 'mock-period-2025-h1',
}

export default { managerAmbitions, goalFilters }
