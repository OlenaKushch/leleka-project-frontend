'use client'

import { LoginForm } from '@/components/auth/LoginForm'
import { RegistrationForm } from '@/components/auth/RegistrationForm'

type Props = {
  authType: 'login' | 'register'
}

export const AuthPage = ({ authType }: Props) => {
  return (
    <div>
      {authType === 'login' && <LoginForm />}
      {authType === 'register' && <RegistrationForm />}
    </div>
  )
}
