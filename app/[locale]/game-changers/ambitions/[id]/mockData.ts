import type { Achievement } from '@/components/game-changers/ambitions/AmbitionAchievements'
import type {
  LadderedAmbition,
  AvatarOption,
} from '@/components/game-changers/ambitions/AmbitionLaddering'
import type { ActivityItem } from '@/components/game-changers/ambitions/AmbitionActivityFeed'

// Mock achievements data - TODO: Replace with real data from Prisma
export const mockAchievements: Achievement[] = [
  {
    id: 1,
    text: 'Lead a cross-functional project',
    completed: true,
    progress: null,
  },
  {
    id: 2,
    text: 'Mentor a junior team member',
    completed: false,
    progress: null,
  },
  {
    id: 3,
    text: 'Complete advanced leadership training',
    completed: false,
    progress: null,
  },
]

// Mock laddered ambitions data - TODO: Replace with real data from Prisma
export const mockLadderedAmbitions: LadderedAmbition[] = [
  {
    id: '1',
    title:
      'Optimize the cross-platform entitlement engine to ensure seamless delivery of digital service benefits to device owners.',
    assignee: {
      uid: '2',
      name: 'Lars van der Zee',
      avatar: '/profile-img/lars-van-der-zee.png',
    },
    progress: 33,
  },
  {
    id: '2',
    title:
      'Integrate all mandatory feedback from playtests into level design by the end of each sprint.',
    assignee: {
      uid: '5',
      name: 'Jürgen Schneider',
      avatar: '/profile-img/profile.png',
    },
    progress: 66,
  },
  {
    id: '3',
    title:
      'Scale the cross-platform entitlement engine to facilitate frictionless monetization and the automated provisioning of premium service tiers across the global device footprint.',
    assignee: {
      uid: '4',
      name: 'Amélie Martin',
      avatar: '/profile-img/sarah-miller.png',
    },
    progress: 33,
  },
]

// Mock avatar options for filters
export const mockAvatarOptions: AvatarOption[] = [
  { uid: '1', name: 'Nia Washington', url: '/profile-img/nia-washington.png' },
  { uid: '2', name: 'Lars van der Zee', url: '/profile-img/lars-van-der-zee.png' },
  { uid: '3', name: 'Kylie Davies', url: '/profile-img/kylie-davies.png' },
  { uid: '4', name: 'Sarah Miller', url: '/profile-img/sarah-miller.png' },
  { uid: '5', name: 'Profile', url: '/profile-img/profile.png' },
]

// Mock activity feed data - TODO: Replace with real data from Prisma
export const mockActivityFeed: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
    action: 'completed',
    target: 'the Ambition',
    date: 'Dec 15, 2025',
  },
  {
    id: '2',
    user: { name: 'Rupert Sterling', avatar: '/profile-img/lars-van-der-zee.png' },
    action: 'approved',
    date: 'Dec 14, 2025',
  },
  {
    id: '3',
    user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
    action: 'statusChange',
    from: 'Draft',
    to: 'Awaiting Approval',
    date: 'Dec 13, 2025',
  },
  {
    id: '4',
    user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
    action: 'created',
    status: 'Draft',
    date: 'Dec 10, 2025',
  },
]

// Mock actions data - TODO: Replace with real data from Prisma
export const mockActions: string[] = [
  'Launch exclusive cross-platform content bundles that leverage internal media production assets to drive deeper user engagement within the ecosystem.',
  'Deploy unified loyalty programs that reward users for engagement across both physical and digital products while ensuring scalable backend integration.',
  'Enhance the global distribution infrastructure to ensure low-latency delivery of high-fidelity digital media across all regional server nodes efficiently.',
]
