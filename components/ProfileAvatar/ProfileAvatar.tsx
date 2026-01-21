'use client'

import styles from './ProfileAvatar.module.css'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useAuthStore } from '@/store/auth.store'
import { useMutation } from '@tanstack/react-query'
import { updateUserAvatar } from '@/services/users.service'
import type { User } from '@/types/user'

export const ProfileAvatar = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { user, setUser } = useAuthStore()

  const { mutate, isPending } = useMutation<User, Error, File>({
    mutationFn: updateUserAvatar,
    onSuccess: updatedData => {
      if (user) {
        setUser({ ...user, avatar: updatedData.avatar })
      }
      toast.success('Аватар оновлено')
    },
    onError: error => toast.error(error.message || 'Не вдалося завантажити фото'),
  })

  const getAvatarSrc = () => {
    const avatar = user?.avatar

    if (!avatar || avatar === 'avatar') {
      return '/images/unknownAvatarImage/unknown_avatar_Image.jpg'
    }

    if (avatar.length > 100 && !avatar.startsWith('data:image') && !avatar.startsWith('http')) {
      return `data:image/jpeg;base64,${avatar}`
    }

    return avatar
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) mutate(file)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={getAvatarSrc()}
          alt="Avatar"
          width={132}
          height={132}
          className={styles.avatarImg}
          priority
          unoptimized
        />
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{user?.name || 'Гість'}</p>
        <p className={styles.email}>{user?.email}</p>

        <button
          className={styles.uploadBtn}
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
          type="button"
        >
          {isPending ? 'Завантаження...' : 'Завантажити нове фото'}
        </button>
      </div>

      <input ref={inputRef} type="file" hidden onChange={handleFileChange} accept="image/*" />
    </div>
  )
}
