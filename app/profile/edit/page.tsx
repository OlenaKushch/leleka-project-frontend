'use client'

import { useProtectedRoute } from '@/hooks/useProtectedRoute'

import OnboardingForm from '@/components/OnboardingForm/OnboardingForm'
import OnboardingImage from '@/components/OnboardingImage/OnboardingImage'

import styles from './page.module.css'

export default function ProfileEditPage() {
  useProtectedRoute()

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            <span className={styles.word}>Давайте</span>
            <span className={styles.word}>познайомимось</span>
            <span className={styles.word}>ближче</span>
          </h1>

          <OnboardingForm />
        </div>

        <div className={styles.right}>
          <OnboardingImage />
        </div>
      </div>
    </div>
  )
}