'use client'

import { create } from 'zustand'
import { AmbitionDraft, AmbitionUI } from '@/domain/ambition'
import { API_ROUTES } from '@/common/routes'

type AmbitionsState = {
  // Estado visible
  list: AmbitionUI[] | null
  selected: AmbitionUI | null

  // Estado de edición
  draft: AmbitionDraft | null
  editingAmbitionId: string | null

  // List / selection
  setList: (ambitions: AmbitionUI[]) => void
  selectAmbition: (ambition: AmbitionUI | null) => void

  // Edit flow
  startEdit: (ambition: AmbitionUI) => void
  updateDraft: (data: Partial<AmbitionDraft>) => void
  cancelEdit: () => void

  // Sync con backend
  applyUpdate: (ambition: AmbitionUI) => void
  removeAmbition: (id: string) => void

  fetchList: () => void
}

export const useAmbitionsStore = create<AmbitionsState>((set) => ({
  list: null,
  selected: null,

  draft: null,
  editingAmbitionId: null,

  // List / selection
  setList: (ambitions) => set({ list: ambitions }),

  selectAmbition: (ambition) => set({ selected: ambition }),

  // Edit flow
  startEdit: (ambition) =>
    set({
      editingAmbitionId: ambition.id,
      draft: {
        title: ambition.title,
        status: ambition.status,
        ambitionType: ambition.ambitionType,
        description: ambition.description,
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
      editingAmbitionId: null,
    }),

  // Sync con backend
  applyUpdate: (ambition) =>
    set((state) => ({
      list: state.list?.map((a) => (a.id === ambition.id ? ambition : a)),
      selected: state.selected?.id === ambition.id ? ambition : state.selected,
      draft: null,
      editingAmbitionId: null,
    })),

  removeAmbition: (id) =>
    set((state) => ({
      list: state.list?.filter((a) => a.id !== id),
      selected: state.selected?.id === id ? null : state.selected,
      draft: null,
      editingAmbitionId: null,
    })),
  fetchList: async () => {
    try {
      const res = await fetch(API_ROUTES.AMBITIONS)

      if (!res.ok) {
        throw new Error('Failed to fetch ambitions')
      }
      const ambitions = await res.json()
      set({ list: ambitions })
    } catch {
      // Handle error as needed
    }
  },
}))
