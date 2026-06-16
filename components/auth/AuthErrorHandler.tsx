'use client'

import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useAuthErrorToast } from '@/hooks/useProtectedRoute'

export function AuthErrorHandler() {
  const showError = useCallback((message: string) => {
    toast.error(message)
  }, [])

  useAuthErrorToast(showError)

  return null
}
