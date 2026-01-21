'use client'

import styles from './ProfilePage.module.css'
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar'
import { ProfileEditForm } from '@/components/ProfileEditForm/ProfileEditForm'
import { useAuthStore } from '@/store/auth.store'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

export default function ProfilePage() {
  useProtectedRoute()
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <ProfileAvatar />
        <ProfileEditForm />
      </div>
    </main>
  )
}
