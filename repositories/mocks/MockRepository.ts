import { GoalRepository } from '@/repositories/GoalRepository'
import { UserRepository } from '@/repositories/UserRepository'
import {
  CreateGoalDTO,
  UpdateGoalDTO,
  GoalUI,
  ManagerAmbitionsData,
  GoalFiltersData,
  GoalStatus,
} from '@/domain/goal'
import { User } from '@/domain/user'
import { managerAmbitions, goalFilters } from '@/repositories/mocks/data/filters'
import {
  getGoals,
  getGoalById,
  createGoal as dbCreateGoal,
  updateGoal as dbUpdateGoal,
  deleteGoal as dbDeleteGoal,
  getUsers,
  getUserByEmail,
  getUserById,
} from './mockDB'

function nowIso() {
  return new Date().toISOString()
}

function generateId() {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export class MockRepository implements GoalRepository, UserRepository {
  // UserRepository
  async getUser(email: string): Promise<User | null> {
    return getUserByEmail(email)
  }

  // GoalRepository
  async findGoals(_email?: string): Promise<GoalUI[]> {
    return getGoals()
  }

  async findGoalById(id: string): Promise<GoalUI | null> {
    return getGoalById(id)
  }

  async createGoal(goal: CreateGoalDTO): Promise<GoalUI> {
    const id = generateId()
    const assignedUser = getUserById(goal.assignedTo)

    const newGoal: GoalUI = {
      id,
      title: goal.title,
      status: goal.status as string,
      goalType: goal.goalType as string,
      description: goal.description ?? '',
      uid: assignedUser?.id ?? goal.assignedTo,
      userName: assignedUser ? `${assignedUser.name} ${assignedUser.lastname}` : 'Unassigned',
      avatarUrl: assignedUser?.profileImageUrl ?? null,
      progress: goal.progress ?? 0,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ladderedGoals: [],
      parent: goal.parentId ? { id: goal.parentId, title: '' } : undefined,
      goalAchievements:
        goal.goalAchievements?.map((achievement, index) => ({
          id: `ach-${id}-${index}`,
          title: achievement.title,
          status: achievement.status ?? 'pending',
          progress: null,
        })) ?? [],
      goalActions:
        goal.goalActions?.map((action, index) => ({
          id: `act-${id}-${index}`,
          title: action.title,
          status: action.status ?? 'pending',
        })) ?? [],
    }

    // If there's a parent, get its title
    if (goal.parentId) {
      const parent = getGoalById(goal.parentId)
      if (parent) {
        newGoal.parent = { id: parent.id, title: parent.title }
      }
    }

    return dbCreateGoal(newGoal)
  }

  async updateGoal(id: string, updates: UpdateGoalDTO): Promise<GoalUI> {
    const goalUpdates: Partial<GoalUI> = {}

    if (updates.title !== undefined) goalUpdates.title = updates.title
    if (updates.description !== undefined) goalUpdates.description = updates.description
    if (updates.goalType !== undefined) goalUpdates.goalType = updates.goalType as string
    if (updates.status !== undefined) goalUpdates.status = updates.status as string
    if (updates.progress !== undefined) goalUpdates.progress = updates.progress

    if (updates.goalAchievements !== undefined) {
      goalUpdates.goalAchievements = updates.goalAchievements.map((a, index) => ({
        id: `ach-${id}-${index}`,
        title: a.title,
        status: a.status ?? 'pending',
        progress: null,
      }))
    }

    if (updates.goalActions !== undefined) {
      goalUpdates.goalActions = updates.goalActions.map((a, index) => ({
        id: `act-${id}-${index}`,
        title: a.title,
        status: a.status ?? 'pending',
      }))
    }

    const updated = dbUpdateGoal(id, goalUpdates)

    if (!updated) {
      throw new Error('Goal not found')
    }

    return updated
  }

  async deleteGoal(id: string): Promise<void> {
    dbDeleteGoal(id)
  }

  async getManagerAmbitions(_email?: string): Promise<ManagerAmbitionsData | null> {
    return managerAmbitions
  }

  async getGoalFilters(): Promise<GoalFiltersData> {
    return goalFilters
  }

  async updateGoalStatus(id: string, status: GoalStatus): Promise<GoalUI> {
    const updated = dbUpdateGoal(id, { status: status as string })

    if (!updated) {
      throw new Error('Goal not found')
    }

    return updated
  }
}

// Legacy exports for backwards compatibility
export const mockAvatarOptions = [
  { uid: '1', name: 'Sarah Miller', url: '/profile-img/sarah-miller.png' },
  { uid: '2', name: 'Lars van der Zee', url: '/profile-img/lars-van-der-zee.png' },
  { uid: '3', name: 'Nia Washington', url: '/profile-img/nia-washington.png' },
  { uid: '4', name: 'Kylie Davies', url: '/profile-img/kylie-davies.png' },
  { uid: '5', name: 'Profile User', url: '/profile-img/profile.png' },
]

export const mockActivityFeed = [
  {
    id: '1',
    user: { name: 'Sarah Miller', avatar: '/profile-img/sarah-miller.png' },
    action: 'created' as const,
    status: 'Draft',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    user: { name: 'Lars van der Zee', avatar: '/profile-img/lars-van-der-zee.png' },
    action: 'statusChange' as const,
    from: 'Draft',
    to: 'Awaiting Approval',
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    user: { name: 'Nia Washington', avatar: '/profile-img/nia-washington.png' },
    action: 'approved' as const,
    date: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '4',
    user: { name: 'Kylie Davies', avatar: '/profile-img/kylie-davies.png' },
    action: 'completed' as const,
    target: 'Q4 Sales Target',
    date: new Date(Date.now() - 345600000).toISOString(),
  },
]

export default MockRepository
