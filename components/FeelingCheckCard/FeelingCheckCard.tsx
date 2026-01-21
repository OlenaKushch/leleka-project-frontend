'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/auth.store'
import { AddDiaryEntryModal } from '@/components/add-diary-entry-modal/AddDiaryEntryModal'

import css from './FeelingCheckCard.module.css'

export const FeelingCheckCard = () => {
  const router = useRouter()
  const user = useAuthStore(state => state.user)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (!user) {
      router.push('/auth/register')
      return
    }

    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className={css.feelingcheck_section}>
      <h2 className={css.feelingcheck_title}>Як ви себе почуваєте?</h2>

      <p className={css.feelingcheck_recommendation}>
        Рекомендація на сьогодні: <br />
        <span className={css.feelingcheck_span}>Занотуйте незвичні відчуття у тілі.</span>
      </p>

      <button type="button" className={css.feelingcheck_button} onClick={handleClick}>
        Зробити запис у щоденник
      </button>

      {user && isModalOpen && (
        <AddDiaryEntryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmitSuccess={handleCloseModal}
        />
      )}
    </section>
  )
}
