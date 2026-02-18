import { GoalUI } from '@/domain/goal'
import { User } from '@/domain/user'
import { goals as initialGoals } from '@/repositories/mocks/data/goals'
import { users as initialUsers } from '@/repositories/mocks/data/users'

// Server-side in-memory storage (persists across requests in the same process)
// In development with hot reload, this will reset when files change
// In production, this persists for the lifetime of the serverless function instance

interface MockDBData {
  goals: GoalUI[]
  users: User[]
}

// Use global to persist across hot reloads in development
const globalForMockDB = globalThis as unknown as {
  mockDBData: MockDBData | undefined
}

function getInitialData(): MockDBData {
  return {
    goals: JSON.parse(JSON.stringify(initialGoals)), // Deep clone
    users: JSON.parse(JSON.stringify(initialUsers)),
  }
}

function getData(): MockDBData {
  if (!globalForMockDB.mockDBData) {
    globalForMockDB.mockDBData = getInitialData()
  }
  return globalForMockDB.mockDBData
}

// Goals operations
export function getGoals(): GoalUI[] {
  const { goals } = getData()
  return [...goals].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateB - dateA
  })
}

export function getGoalById(id: string): GoalUI | null {
  const { goals } = getData()
  return goals.find((g) => g.id === id) || null
}

export function createGoal(goal: GoalUI): GoalUI {
  const data = getData()

  // Add to beginning (newest first)
  data.goals.unshift(goal)

  // If goal has a parentId, update parent's ladderedGoals
  if (goal.parent?.id) {
    const parentIdx = data.goals.findIndex((g) => g.id === goal.parent?.id)
    if (parentIdx !== -1) {
      const ladderedChild = {
        id: goal.id,
        title: goal.title,
        status: goal.status,
        progress: goal.progress,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt,
        uid: goal.uid,
        userName: goal.userName,
        avatarUrl: goal.avatarUrl,
      }

      if (!data.goals[parentIdx].ladderedGoals) {
        data.goals[parentIdx].ladderedGoals = []
      }
      data.goals[parentIdx].ladderedGoals.push(ladderedChild)
    }
  }

  return goal
}

export function updateGoal(id: string, updates: Partial<GoalUI>): GoalUI | null {
  const data = getData()
  const idx = data.goals.findIndex((g) => g.id === id)

  if (idx === -1) return null

  const updatedGoal: GoalUI = {
    ...data.goals[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  data.goals[idx] = updatedGoal

  // Also update this goal in any parent's ladderedGoals
  data.goals.forEach((g, i) => {
    if (g.ladderedGoals?.some((lg) => lg.id === id)) {
      data.goals[i] = {
        ...g,
        ladderedGoals: g.ladderedGoals.map((lg) =>
          lg.id === id
            ? {
                ...lg,
                title: updatedGoal.title,
                status: updatedGoal.status,
                goalType: updatedGoal.goalType,
                description: updatedGoal.description,
                uid: updatedGoal.uid,
                userName: updatedGoal.userName,
                avatarUrl: updatedGoal.avatarUrl,
                progress: updatedGoal.progress,
                updatedAt: updatedGoal.updatedAt,
              }
            : lg,
        ),
      }
    }
  })

  return updatedGoal
}

export function deleteGoal(id: string): boolean {
  const data = getData()
  const initialLength = data.goals.length
  data.goals = data.goals.filter((g) => g.id !== id)
  return data.goals.length < initialLength
}

// Users operations
export function getUsers(): User[] {
  return getData().users
}

export function getUserByEmail(email: string): User | null {
  const { users } = getData()
  return users.find((u) => u.email === email) || null
}

export function getUserById(id: string): User | null {
  const { users } = getData()
  return users.find((u) => u.id === id) || null
}

// Reset to initial data (useful for testing)
export function resetMockDB(): void {
  globalForMockDB.mockDBData = getInitialData()
}
