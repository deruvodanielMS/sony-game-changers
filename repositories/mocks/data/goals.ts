import { GoalUI } from '@/domain/goal'

export const goals: GoalUI[] = [
  {
    id: 'cmkwz0wde000bn7km5qc9wwoh',
    title: 'Improve team performance',
    status: 'awaiting_approval',
    uid: 'cmkwz0wd50008n7km99rzndfe',
    progress: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'Manager User',
    goalType: 'manager_effectiveness',
    description: 'Increase efficiency and quality of delivery',
    avatarUrl: '/profile-img/profile.png',
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
        uid: 'cmkwz0wcz0006n7kmkgrisysw',
        userName: 'David Brown User',
        avatarUrl: '/profile-img/lars-van-der-zee.png',
      },
      {
        id: 'cmkwz0wdr000hn7km5xth0pzd',
        title: 'Improve test coverage',
        status: 'completed',
        progress: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uid: 'cmkwz0wcw0004n7kmc795a27a',
        userName: 'Sarah Miller User',
        avatarUrl: '/profile-img/sarah-miller.png',
      },
    ],
  },
  {
    id: 'cmkwz0wdj000dn7km8icmh4cz',
    title: 'Improve team delivery predictability',
    status: 'awaiting_approval',
    uid: 'cmkwz0wd50008n7km99rzndfe',
    progress: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'Manager User',
    goalType: 'manager_effectiveness',
    description:
      'Ensure the team consistently meets commitments by improving planning and estimation',
    avatarUrl: '/profile-img/profile.png',
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
