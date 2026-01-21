'use client'

import styles from './GreetingBlock.module.css'
import { useAuthStore } from '@/store/auth.store'

const getGreetingByTime = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'Доброго ранку'
  if (hour >= 12 && hour < 18) return 'Доброго дня'
  if (hour >= 18 && hour < 24) return 'Доброго вечора'
  return 'Доброї ночі'
}

export const GreetingBlock = () => {
  const user = useAuthStore(state => state.user)
  const greeting = getGreetingByTime()

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        {greeting}
        {user?.name && (
          <>
            , <span className={styles.name}>{user.name}</span>
          </>
        )}
        !
      </h2>
    </section>
  )
}
