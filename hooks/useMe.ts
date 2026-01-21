'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { User } from '@/types/user'
import { useAuthStore } from '@/store/auth.store'
import { api } from '@/app/api/client'

export function useMe() {
  const setUser = useAuthStore(s => s.setUser)
  const clearAuth = useAuthStore(s => s.clearAuth)

  const query = useQuery<User | null>({
    queryKey: ['me'],
    
    queryFn: async (): Promise<User | null> => {
      try {
        const { data } = await api.get<{ user?: User } & User>('/users/me')
        
        return data?.user ?? data
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return null
          }
        }

        throw error
      }
    },

    retry: false,
    staleTime: Infinity, 
    enabled: true,
  })

  useEffect(() => {
    if (query.isLoading || query.isPlaceholderData) return

    if (query.data) {
      setUser(query.data)
    } else if (query.isFetched && query.data === null) {
      clearAuth()
    }
  }, [
    query.isFetched, 
    query.data, 
    query.isLoading, 
    query.isPlaceholderData,
    setUser, 
    clearAuth
  ])

  return query
}