import { create } from 'zustand'

type UiState = {
  isAddTaskOpen: boolean
  openAddTask: () => void
  closeAddTask: () => void
  isBurgerMenuOpen: boolean
  openBurgerMenu: () => void
  closeBurgerMenu: () => void
  toggleBurgerMenu: () => void
}

export const useUiStore = create<UiState>(set => ({
  isAddTaskOpen: false,
  openAddTask: () => set({ isAddTaskOpen: true }),
  closeAddTask: () => set({ isAddTaskOpen: false }),

  isBurgerMenuOpen: false,
  openBurgerMenu: () => set({ isBurgerMenuOpen: true }),
  closeBurgerMenu: () => set({ isBurgerMenuOpen: false }),
  toggleBurgerMenu: () => set(state => ({ isBurgerMenuOpen: !state.isBurgerMenuOpen })),
}))