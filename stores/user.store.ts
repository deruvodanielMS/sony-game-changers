import { create } from 'zustand'
import { User } from '@/domain/user'
import { API_ROUTES } from '@/common/routes'

type UserState = {
  user: User | null
  getUser: (email: string) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  clearUser: () => set({ user: null }),
  getUser: async (email: string) => {
    try {
      const res = await fetch(`${API_ROUTES.USER}?email=${email}`)

      if (!res.ok) {
        throw new Error('Failed to fetch user')
      }
      const user = await res.json()
      set({ user })
    } catch {
      // Handle error as needed
    }
  },
}))
