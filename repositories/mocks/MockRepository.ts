import { GoalRepository } from '@/repositories/GoalRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { CreateGoalDTO, GoalUI } from '@/domain/goal'
import { User } from '@/domain/user'
import { goals as initialGoals } from '@/repositories/mocks/data/goals'
import { users as initialUsers } from '@/repositories/mocks/data/users'

function nowIso() {
  return new Date().toISOString()
}

export class MockRepository implements GoalRepository, UserRepository {
  private goals: GoalUI[] = JSON.parse(JSON.stringify(initialGoals))
  private users: User[] = JSON.parse(JSON.stringify(initialUsers))

  // UserRepository
  async getUser(email: string): Promise<User | null> {
    const found = this.users.find((u) => u.email === email)
    return found || null
  }

  // GoalRepository
  async findMany(email?: string): Promise<GoalUI[]> {
    console.log('MockRepository.findMany called with email:', email)
    return this.goals
  }

  async findById(id: string): Promise<GoalUI | null> {
    const found = this.goals.find((g) => g.id === id)
    return found || null
  }

  async create(goal: CreateGoalDTO): Promise<GoalUI> {
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
    }

    this.goals.push(created)

    return created
  }

  async update(id: string, goal: CreateGoalDTO): Promise<GoalUI> {
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

  async delete(id: string): Promise<void> {
    this.goals = this.goals.filter((g) => g.id !== id)
  }
}

export default MockRepository
