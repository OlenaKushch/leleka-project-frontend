import { useAuthStore } from '@/store/auth.store'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function logout() {
  if (API_BASE_URL) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  // 🔐 чистимо Google one-tap / auto-select
  window.google?.accounts.id.disableAutoSelect?.()

  // 🔄 чистимо client auth
  useAuthStore.getState().setUser(null)
}
