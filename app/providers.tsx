// # ReactQuery, Zustand hydration'use client'

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthHydration } from '@/components/AuthHydration/AuthHydration'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydration />
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}
