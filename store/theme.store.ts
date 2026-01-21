import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeType = 'boy' | 'girl' | 'neutral'

interface ThemeState {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'neutral',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage', // Ключ у localStorage
    }
  )
)
