'use client'

import { create } from 'zustand'
import {
  GoalDraft,
  GoalUI,
  CreateGoalDTO,
  ManagerAmbitionsData,
  GoalFiltersData,
} from '@/domain/goal'
import { API_ROUTES } from '@/common/routes'

type GoalsState = {
  // Estado visible
  list: GoalUI[] | null
  selected: GoalUI | null
  listError: string | null

  // Manager ambitions
  managerAmbitions: ManagerAmbitionsData | null
  managerAmbitionsError: string | null

  // Goal filters
  goalFilters: GoalFiltersData | null
  goalFiltersError: string | null

  // Estado de edición
  draft: GoalDraft | null
  editingGoalId: string | null

  // List / selection
  setList: (goals: GoalUI[]) => void
  selectGoal: (goal: GoalUI | null) => void
  clearListError: () => void

  // Edit flow
  startEdit: (goal: GoalUI) => void
  updateDraft: (data: Partial<GoalDraft>) => void
  cancelEdit: () => void

  // Sync con backend
  applyUpdate: (goal: GoalUI) => void
  removeGoal: (id: string) => void
  createGoal: (
    goalData: CreateGoalDTO,
    userData?: { name: string; avatarUrl: string | null },
  ) => Promise<GoalUI | null>

  fetchList: () => void
  fetchGoal: (id: string) => void
  fetchManagerAmbitions: () => void
  fetchGoalFilters: () => void
}

export const useGoalsStore = create<GoalsState>((set) => {
  const upsertGoal = (list: GoalUI[] | null, goal: GoalUI) => {
    if (!list) return [goal]
    let found = false
    const next = list.map((g) => {
      if (g.id === goal.id) {
        found = true
        return { ...g, ...goal }
      }
      return g
    })
    if (!found) next.push(goal)
    return next
  }

  return {
    list: null,
    selected: null,
    listError: null,

    managerAmbitions: null,
    managerAmbitionsError: null,

    goalFilters: null,
    goalFiltersError: null,

    draft: null,
    editingGoalId: null,

    // List / selection
    setList: (goals) => set({ list: goals }),

    selectGoal: (goal) => set({ selected: goal }),

    clearListError: () => set({ listError: null }),

    // Edit flow
    startEdit: (goal) =>
      set({
        editingGoalId: goal.id,
        draft: {
          title: goal.title,
          status: goal.status,
          goalType: goal.goalType,
          description: goal.description,
        },
      }),

    updateDraft: (data) =>
      set((state) => {
        if (!state.draft) return state

        return {
          draft: {
            ...state.draft,
            ...data,
          },
        }
      }),

    cancelEdit: () =>
      set({
        draft: null,
        editingGoalId: null,
      }),

    // Sync con backend
    applyUpdate: (goal) =>
      set((state) => ({
        list: state.list?.map((a) => (a.id === goal.id ? goal : a)),
        selected: state.selected?.id === goal.id ? goal : state.selected,
        draft: null,
        editingGoalId: null,
      })),

    removeGoal: (id) =>
      set((state) => ({
        list: state.list?.filter((a) => a.id !== id),
        selected: state.selected?.id === id ? null : state.selected,
        draft: null,
        editingGoalId: null,
      })),

    createGoal: async (goalData, userData) => {
      try {
        const res = await fetch(API_ROUTES.GOALS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(goalData),
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to create goal')
        }

        const newGoal = await res.json()

        set((state) => ({
          list: state.list ? [newGoal, ...state.list] : [newGoal],
        }))

        return newGoal
      } catch (error) {
        // Create mock goal locally
        const id = `mock-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        const newGoal: GoalUI = {
          id,
          title: goalData.title,
          status: goalData.status as string,
          goalType: goalData.goalType as string,
          description: goalData.description ?? '',
          uid: goalData.assignedTo,
          userName: userData?.name ?? 'Current User',
          avatarUrl: userData?.avatarUrl ?? null,
          progress: goalData.progress ?? 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ladderedGoals: [],
          goalAchievements:
            goalData.goalAchievements?.map((achievement, index) => ({
              id: `ach-${id}-${index}`,
              title: achievement.title,
              status: achievement.status ?? 'pending',
              progress: null,
            })) ?? [],
          goalActions:
            goalData.goalActions?.map((action, index) => ({
              id: `act-${id}-${index}`,
              title: action.title,
              status: action.status ?? 'pending',
            })) ?? [],
        }

        set((state) => {
          let updatedList = state.list ? [newGoal, ...state.list] : [newGoal]

          // If this goal has a parent, add it to parent's ladderedGoals
          if (goalData.parentId) {
            updatedList = updatedList.map((goal) => {
              if (goal.id === goalData.parentId) {
                const ladderedChild = {
                  id: newGoal.id,
                  title: newGoal.title,
                  status: newGoal.status,
                  progress: newGoal.progress,
                  createdAt: newGoal.createdAt,
                  updatedAt: newGoal.updatedAt,
                  uid: newGoal.uid,
                  userName: newGoal.userName,
                  avatarUrl: newGoal.avatarUrl,
                }

                return {
                  ...goal,
                  ladderedGoals: [...(goal.ladderedGoals || []), ladderedChild],
                }
              }
              return goal
            })
          }

          return { list: updatedList }
        })

        return newGoal
      }
    },

    fetchList: async () => {
      try {
        const res = await fetch(API_ROUTES.GOALS)

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to fetch goals')
        }
        const goals = await res.json()
        set({ list: goals, listError: null })
      } catch (error) {
        console.error('[fetchList] Error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch goals'
        set({ list: [], listError: errorMessage })
      }
    },
    fetchGoal: async (id: string) => {
      try {
        const res = await fetch(`${API_ROUTES.GOALS}/${id}`)

        if (!res.ok) {
          throw new Error('Failed to fetch goal')
        }
        const goal = await res.json()
        set((state) => ({
          list: upsertGoal(state.list, goal),
          selected: state.selected?.id === goal.id ? { ...state.selected, ...goal } : goal,
        }))
      } catch {
        // Fallback: Search in local list if API call fails
        set((state) => {
          const localGoal = state.list?.find((g) => g.id === id)
          if (localGoal) {
            return { selected: localGoal }
          }
          return state
        })
      }
    },

    fetchManagerAmbitions: async () => {
      try {
        const res = await fetch(API_ROUTES.GOALS_MANAGER_AMBITIONS)

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to fetch manager ambitions')
        }
        const data = await res.json()
        set({ managerAmbitions: data, managerAmbitionsError: null })
      } catch (error) {
        console.error('[fetchManagerAmbitions] Error:', error)
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch manager ambitions'
        set({ managerAmbitions: null, managerAmbitionsError: errorMessage })
      }
    },

    fetchGoalFilters: async () => {
      try {
        const res = await fetch(API_ROUTES.GOALS_FILTERS)

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to fetch goal filters')
        }
        const data = await res.json()
        set({ goalFilters: data, goalFiltersError: null })
      } catch (error) {
        console.error('[fetchGoalFilters] Error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch goal filters'
        set({ goalFilters: null, goalFiltersError: errorMessage })
      }
    },
  }
})
