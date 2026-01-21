export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  theme?: 'boy' | 'girl' | 'neutral'
  dueDate?: string
  hasCompletedOnboarding: boolean
}
