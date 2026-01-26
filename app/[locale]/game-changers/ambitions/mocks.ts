import { GOAL_STATUSES, GOAL_TYPES } from '@/domain/goal'

/**
 * Mock data for development and testing
 * TODO: Replace with real API data
 */

export const goalMocks = [
  {
    goal: {
      id: 'goal-1',
      userName: 'Alice Williams',
      title:
        'Ensure core title features meet established quality bars to achieve a strong critical reception score and boost future sales.',
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      goalType: GOAL_TYPES.BUSINESS,
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
        goalType: GOAL_TYPES.MANAGER_EFFECTIVENESS,
        description: 'Increase conversion from 10% to 15%',
      },
      {
        id: 'goal-3',
        userName: 'Charlie Johnson',
        title:
          'Integrate all mandatory feedback from playtests into level design by the end of each sprint.',
        status: GOAL_STATUSES.COMPLETED,
        goalType: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        avatarUrl: '/profile-img/profile.png',
      },
    ],
    'data-testid': 'goal-team-mock',
    allowAddChildrenGoals: true,
  },
  {
    goal: {
      id: 'goal-4',
      userName: 'David Brown',
      title:
        "Strategically increase The Team's technical expertise by implementing targeted upskilling initiatives in critical architectural domains (e.g., CI/CD).",
      status: GOAL_STATUSES.COMPLETED,
      goalType: GOAL_TYPES.BUSINESS,
      avatarUrl: '/profile-img/profile.png',
    },
    ladderGoals: [],
    'data-testid': 'goal-personal-mock',
    allowAddChildrenGoals: false,
  },
  {
    goal: {
      id: 'goal-5',
      userName: 'Emma Wilson',
      title: 'Develop comprehensive onboarding program for new team members',
      status: GOAL_STATUSES.DRAFT,
      goalType: GOAL_TYPES.MANAGER_EFFECTIVENESS,
      avatarUrl: '/profile-img/profile.png',
    },
    ladderGoals: [],
    'data-testid': 'goal-mock-3',
    allowAddChildrenGoals: true,
  },
  {
    goal: {
      id: 'goal-6',
      userName: 'James Miller',
      title: 'Improve code review process and documentation standards',
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      goalType: GOAL_TYPES.BUSINESS,
      avatarUrl: '/profile-img/profile.png',
    },
    ladderGoals: [],
    'data-testid': 'goal-mock-4',
    allowAddChildrenGoals: false,
  },
  {
    goal: {
      id: 'goal-7',
      userName: 'Sofia Rodriguez',
      title: 'Establish quarterly team retrospectives and continuous improvement initiatives',
      status: GOAL_STATUSES.COMPLETED,
      goalType: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      avatarUrl: '/profile-img/profile.png',
    },
    ladderGoals: [],
    'data-testid': 'goal-mock-5',
    allowAddChildrenGoals: true,
  },
]

export const filterBarMocks = {
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
      single: true,
    },
    {
      label: 'Type',
      'data-testid': 'filter-category',
      options: [
        { label: 'Business', value: GOAL_TYPES.BUSINESS },
        { label: 'Manager effecteviness', value: GOAL_TYPES.MANAGER_EFFECTIVENESS },
        {
          label: 'Personal growth and development',
          value: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        },
      ],
      single: true,
    },
  ],
}
