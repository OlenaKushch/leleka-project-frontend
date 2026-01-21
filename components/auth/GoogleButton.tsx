'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/auth.store'
import toast from 'react-hot-toast'
import { User } from '@/types/user'

type GoogleButtonProps = {
  mode: 'login'| 'register'
}


export function GoogleButton( {mode}: GoogleButtonProps) {
  const setUser = useAuthStore(s => s.setUser)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const google = window.google

    if (!google || !buttonRef.current) return

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    if (!clientId) {
      console.error('Google Client ID is missing in environment variables')
      return
    }

    google.accounts.id.initialize({
      client_id: clientId,
      callback: async res => {
        try {
          const response = await fetch('/api/proxy/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ credential: res.credential }),
          })

          if (!response.ok) {
            const errorData: { message?: string } = await response.json()
            throw new Error(errorData.message || 'Помилка Google авторизації')
          }

          const data: User = await response.json()

          if (data && data.email) {
            setUser(data)
            toast.success('Успішний вхід через Google')
            window.location.href = '/'
          }
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Невідома помилка'
          toast.error(message)
          console.error('Google Auth Error:', error)
        }
      },
    })

    google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'large',
      width: 335,
      text: mode === 'login' ? 'signin_with' : 'signup_with',
      shape:'pill',
    
    })
  }, [setUser, mode])

  return <div ref={buttonRef} style={{ minHeight: '40px' }} />
}
