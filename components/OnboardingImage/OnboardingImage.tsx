'use client'

import Image from 'next/image'
import styles from './OnboardingImage.module.css'

export default function OnboardingImage() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/plant/plant.jpg"
        alt="Onboarding illustration"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}