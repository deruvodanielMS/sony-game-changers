import { GoalUI } from '@/domain/goal'

export type NewAmbitionOwnerOption = {
  value: string
  name: string
  roleKey: 'manager' | 'lead' | 'coordinator'
  avatarUrl: string
}

export type NewAmbitionShareMember = {
  value: string
  name: string
}

export const newAmbitionOwnerOptions: NewAmbitionOwnerOption[] = [
  {
    value: 'user-1',
    name: 'James Miller',
    roleKey: 'manager',
    avatarUrl: '/profile-img/profile.png',
  },
  {
    value: 'user-2',
    name: 'Sarah Miller',
    roleKey: 'coordinator',
    avatarUrl: '/profile-img/sarah-miller.png',
  },
  {
    value: 'user-3',
    name: 'David Brown',
    roleKey: 'lead',
    avatarUrl: '/profile-img/lars-van-der-zee.png',
  },
  {
    value: 'user-4',
    name: 'Nia Washington',
    roleKey: 'lead',
    avatarUrl: '/profile-img/nia-washington.png',
  },
  {
    value: 'user-5',
    name: 'Kylie Davies',
    roleKey: 'coordinator',
    avatarUrl: '/profile-img/kylie-davies.png',
  },
]

export const newAmbitionShareWithOptions: NewAmbitionShareMember[] = [
  { value: 'user-1', name: 'James Miller' },
  { value: 'user-2', name: 'Sarah Miller' },
  { value: 'user-3', name: 'David Brown' },
  { value: 'user-4', name: 'Nia Washington' },
  { value: 'user-5', name: 'Kylie Davies' },
]

export const goals: GoalUI[] = [
  // Division-level ambitions (parents)
  {
    id: 'division-ambition-1',
    title: 'Accelerate platform innovation',
    status: 'awaiting_approval',
    uid: 'user-1',
    progress: 65,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'James Miller',
    goalType: 'business',
    description: 'Drive innovation across the platform to stay competitive',
    avatarUrl: '/profile-img/profile.png',
    ladderedGoals: [],
    goalAchievements: [],
    goalActions: [],
  },
  {
    id: 'division-ambition-2',
    title: 'Improve customer satisfaction',
    status: 'awaiting_approval',
    uid: 'user-1',
    progress: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'James Miller',
    goalType: 'business',
    description: 'Enhance customer experience and satisfaction metrics',
    avatarUrl: '/profile-img/profile.png',
    ladderedGoals: [],
    goalAchievements: [],
    goalActions: [],
  },
  {
    id: 'team-ambition-1',
    title: 'Increase team productivity',
    status: 'awaiting_approval',
    uid: 'user-3',
    progress: 70,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'David Brown',
    goalType: 'business',
    description: 'Optimize team processes to boost overall productivity',
    avatarUrl: '/profile-img/lars-van-der-zee.png',
    ladderedGoals: [],
    goalAchievements: [],
    goalActions: [],
  },
  // Regular goals
  {
    id: 'cmkwz0wde000bn7km5qc9wwoh',
    title: 'Improve team performance',
    status: 'awaiting_approval',
    uid: 'user-1',
    progress: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'James Miller',
    goalType: 'manager_effectiveness',
    description: 'Increase efficiency and quality of delivery',
    avatarUrl: '/profile-img/profile.png',
    parent: {
      id: 'division-ambition-1',
      title: 'Accelerate platform innovation',
    },
    goalAchievements: [
      {
        id: 'cmkwz0wdz0013n7km1m866688',
        title: 'Reduced the number of production bugs reported per release',
        status: 'active',
        progress: 'not-started',
      },
      {
        id: 'cmkwz0wdz0014n7kmas6u9mg6',
        title: 'Lowered severity of production incidents through better prevention',
        status: 'active',
        progress: 'not-started',
      },
      {
        id: 'cmkwz0wdz0015n7kmc5dz8nwk',
        title: 'Improved overall product stability as reflected in fewer customer issuesnpx prisma',
        status: 'active',
        progress: 'on-track',
      },
    ],
    goalActions: [
      {
        id: 'cmkwz0wdv000rn7kme0bysexa',
        title: 'Enforce code reviews and quality checks before any production release',
        status: 'active',
      },
      {
        id: 'cmkwz0wdv000sn7kmcu04003h',
        title: 'Prioritize bug fixes in planning sessions alongside new feature work',
        status: 'active',
      },
      {
        id: 'cmkwz0wdv000tn7kmanuzyfh9',
        title: 'Review production incidents with the team to identify root causes and improvements',
        status: 'active',
      },
    ],
    ladderedGoals: [
      {
        id: 'cmkwz0wdn000fn7kmcre35v38',
        title: 'Reduce bugs in production',
        status: 'draft',
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uid: 'user-3',
        userName: 'David Brown',
        avatarUrl: '/profile-img/lars-van-der-zee.png',
      },
      {
        id: 'cmkwz0wdr000hn7km5xth0pzd',
        title: 'Improve test coverage',
        status: 'completed',
        progress: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uid: 'user-2',
        userName: 'Sarah Miller',
        avatarUrl: '/profile-img/sarah-miller.png',
      },
    ],
  },
  {
    id: 'cmkwz0wdj000dn7km8icmh4cz',
    title: 'Improve team delivery predictability',
    status: 'awaiting_approval',
    uid: 'user-1',
    progress: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'James Miller',
    goalType: 'manager_effectiveness',
    description:
      'Ensure the team consistently meets commitments by improving planning and estimation',
    avatarUrl: '/profile-img/profile.png',
    parent: {
      id: 'division-ambition-2',
      title: 'Improve customer satisfaction',
    },
    ladderedGoals: [],
    goalAchievements: [
      {
        id: 'cmkwz0wdz0010n7km6vye03r0',
        title: 'Increased sprint commitment completion rate across the team',
        status: 'active',
        progress: 'off-track',
      },
      {
        id: 'cmkwz0wdz0011n7km1z53hp4f',
        title: 'Reduced carry-over work between sprints',
        status: 'active',
        progress: 'off-track',
      },
      {
        id: 'cmkwz0wdz0012n7kmq4cgom4y',
        title: 'Improved accuracy of delivery estimates, leading to more reliable timelines',
        status: 'active',
        progress: 'not-started',
      },
    ],
    goalActions: [
      {
        id: 'cmkwz0wdv000on7km7uj66fxy',
        title: 'Run regular sprint planning sessions with clear scope and priorities',
        status: 'active',
      },
      {
        id: 'cmkwz0wdv000pn7km5jcuq280',
        title: 'Break work into smaller, well-defined tasks to improve estimation accuracy',
        status: 'active',
      },
      {
        id: 'cmkwz0wdv000qn7kmv7xyy08a',
        title: 'Review past sprint results to adjust estimates and planning practices',
        status: 'active',
      },
    ],
  },
]

export default goals
