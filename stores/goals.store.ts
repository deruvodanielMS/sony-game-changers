'use client'

import { create } from 'zustand'
import { GoalDraft, GoalUI } from '@/domain/goal'
import { API_ROUTES } from '@/common/routes'

type GoalsState = {
  // Estado visible
  list: GoalUI[] | null
  selected: GoalUI | null

  // Estado de edición
  draft: GoalDraft | null
  editingGoalId: string | null

  // List / selection
  setList: (goals: GoalUI[]) => void
  selectGoal: (goal: GoalUI | null) => void

  // Edit flow
  startEdit: (goal: GoalUI) => void
  updateDraft: (data: Partial<GoalDraft>) => void
  cancelEdit: () => void

  // Sync con backend
  applyUpdate: (goal: GoalUI) => void
  removeGoal: (id: string) => void

  fetchList: () => void

  fetchGoal: (id: string) => void
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

    draft: null,
    editingGoalId: null,

    // List / selection
    setList: (goals) => set({ list: goals }),

    selectGoal: (goal) => set({ selected: goal }),

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
    fetchList: async () => {
      try {
        const res = await fetch(API_ROUTES.GOALS)

        if (!res.ok) {
          throw new Error('Failed to fetch goals')
        }
        const goals = await res.json()
        set({ list: goals })
      } catch {
        // Handle error as needed
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
        // Handle error as needed
      }
    },
  }
})
