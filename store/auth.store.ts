import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/user'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  hydrated: boolean 
  
  setUser: (userData: Partial<User> | User | null) => void
  clearAuth: () => void
  setHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,

      setUser: (userData) =>
        set((state) => {
          if (userData === null) {
            return { user: null, isAuthenticated: false }
          }
          const updatedUser = state.user 
            ? { ...state.user, ...userData } 
            : (userData as User)

          return {
            user: updatedUser,
            isAuthenticated: !!updatedUser,
          }
        }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      setHydrated: (state) => set({ hydrated: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)