'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme.store'

export default function ThemeSync() {
  const theme = useThemeStore(state => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}
