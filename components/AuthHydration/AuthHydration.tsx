'use client'

import { useMe } from '@/hooks/useMe'

export function AuthHydration() {
  useMe()
  return null
}
