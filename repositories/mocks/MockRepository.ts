import { GoalRepository } from '@/repositories/GoalRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { CreateGoalDTO, GoalUI } from '@/domain/goal'
import { User } from '@/domain/user'
import { goals as initialGoals } from '@/repositories/mocks/data/goals'
import { users as initialUsers } from '@/repositories/mocks/data/users'

function nowIso() {
  return new Date().toISOString()
}

// Singleton pattern: shared data across all instances
let sharedGoals: GoalUI[] | null = null
let sharedUsers: User[] | null = null

function getSharedGoals(): GoalUI[] {
  if (!sharedGoals) {
    sharedGoals = JSON.parse(JSON.stringify(initialGoals))
  }
  return sharedGoals!
}

function getSharedUsers(): User[] {
  if (!sharedUsers) {
    sharedUsers = JSON.parse(JSON.stringify(initialUsers))
  }
  return sharedUsers!
}

export class MockRepository implements GoalRepository, UserRepository {
  private goals: GoalUI[] = getSharedGoals()
  private users: User[] = getSharedUsers()

  // UserRepository
  async getUser(email: string): Promise<User | null> {
    const found = this.users.find((u) => u.email === email)
    return found || null
  }

  // GoalRepository
  async findGoals(email?: string): Promise<GoalUI[]> {
    return this.goals
  }

  async findGoalById(id: string): Promise<GoalUI | null> {
    const found = this.goals.find((g) => g.id === id)
    return found || null
  }

  async createGoal(goal: CreateGoalDTO): Promise<GoalUI> {
    const id = `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const assigned = this.users.find((u) => u.id === goal.assignedTo)

    const created: GoalUI = {
      id,
      title: goal.title,
      status: goal.status as string,
      goalType: goal.goalType as string,
      description: goal.description ?? '',
      uid: assigned?.id ?? '',
      userName: assigned ? `${assigned.name} ${assigned.lastname}` : 'Unassigned',
      avatarUrl: assigned?.profileImageUrl ?? null,
      progress: goal.progress ?? 0,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ladderedGoals: [],
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

    this.goals.push(created)

    // If this goal has a parent, add it to parent's ladderedGoals
    if (goal.parentId) {
      const parentIdx = this.goals.findIndex((g) => g.id === goal.parentId)
      if (parentIdx !== -1) {
        const ladderedChild = {
          id: created.id,
          title: created.title,
          status: created.status,
          progress: created.progress,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
          uid: created.uid,
          userName: created.userName,
          avatarUrl: created.avatarUrl,
        }

        if (!this.goals[parentIdx].ladderedGoals) {
          this.goals[parentIdx].ladderedGoals = []
        }
        this.goals[parentIdx].ladderedGoals.push(ladderedChild)
      }
    }

    return created
  }

  async updateGoal(id: string, goal: CreateGoalDTO): Promise<GoalUI> {
    const idx = this.goals.findIndex((g) => g.id === id)
    if (idx === -1) {
      throw new Error('Not found')
    }

    const assigned = this.users.find((u) => u.id === goal.assignedTo)

    const updated: GoalUI = {
      ...this.goals[idx],
      title: goal.title,
      status: goal.status as string,
      goalType: goal.goalType as string,
      description: goal.description ?? '',
      uid: assigned?.id ?? this.goals[idx].uid,
      userName: assigned ? `${assigned.name} ${assigned.lastname}` : this.goals[idx].userName,
      avatarUrl: assigned?.profileImageUrl ?? this.goals[idx].avatarUrl,
      progress: goal.progress ?? this.goals[idx].progress,
      updatedAt: nowIso(),
    }

    this.goals[idx] = updated

    return updated
  }

  async deleteGoal(id: string): Promise<void> {
    this.goals = this.goals.filter((g) => g.id !== id)
  }
}

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
