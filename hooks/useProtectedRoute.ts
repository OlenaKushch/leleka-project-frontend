'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

const PUBLIC_ROUTES = ['/auth/login', '/auth/register']

export const useProtectedRoute = () => {
  const { isAuthenticated, hydrated } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!hydrated) return

    const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

    if (!isAuthenticated && !isPublic) {
      router.replace('/auth/login')
    }

    if (isAuthenticated && isPublic) {
      router.replace('/')
    }
  }, [hydrated, isAuthenticated, pathname, router])
}