'use client'

import { useState } from 'react'
import { useFormikContext } from 'formik'
import Image from 'next/image'
import styles from './OnboardingAvatar.module.css'

export interface OnboardingValues {
  avatar: File | null
}

export default function OnboardingAvatar() {
  const { values, setFieldValue } = useFormikContext<OnboardingValues>()
  const [isUploading, setIsUploading] = useState(false)

  const avatarSrc = values.avatar
    ? URL.createObjectURL(values.avatar)
    : '/images/unknownAvatarImage/unknown_avatar_Image.jpg'

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null
    setFieldValue('avatar', file)

    if (file) {
      setIsUploading(true)
      await new Promise(res => setTimeout(res, 1000))
      setIsUploading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={avatarSrc}
          alt="Avatar"
          width={160}
          height={160}
          className={styles.image}
        />
      </div>

      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.input}
      />

      <label
        htmlFor="avatar"
        className={`${styles.button} ${isUploading ? styles.buttonDisabled : ''}`}
      >
        Завантажити
      </label>
    </div>
  )
}