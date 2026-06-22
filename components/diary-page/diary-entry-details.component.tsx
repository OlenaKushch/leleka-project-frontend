'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { DiaryEntry, Emotion } from '../../interfaces/diary'
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal.component'
import { DiaryService } from '@/services/diary.service'
import styles from './diary-entry-details.module.css'

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null
  allEmotions: Emotion[]
  onDeleteSuccess: () => void
  onEditTrigger: (entry: DiaryEntry) => void
}

export const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({
  entry,
  allEmotions,
  onDeleteSuccess,
  onEditTrigger,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  if (!entry) return null

  const getEmotionTitle = (id: string) =>
    allEmotions.find((e: Emotion) => e._id === id)?.title || '...'

  const handleDeleteConfirm = async () => {
    try {
      await DiaryService.deleteEntry(entry._id)

      setIsDeleteModalOpen(false)
      onDeleteSuccess()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Помилка при видаленні:', error.response?.status)
      }
      toast.error('Не вдалося видалити запис.')
    }
  }

  return (
    <>
      <div className={styles.detailsContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{entry.title}</h2>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={() => onEditTrigger(entry)} aria-label="Редагувати">
              <svg className={styles.buttonIcon} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.middleContainer}>
          <p className={styles.date}>
            {new Date(entry.date)
              .toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
              .replace(/\s*р\.?$/, '')}
          </p>
          <button className={styles.deleteButton} onClick={() => setIsDeleteModalOpen(true)}>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-delete_forever" />
            </svg>
          </button>
        </div>

        <div className={styles.emotionsList}>
          <p className={styles.mainText}>{entry.description}</p>

          {entry.emotions.length > 0 && (
            <div className={styles.emotions}>
              {entry.emotions.map((id: string) => (
                <span key={id} className={styles.emotionBadge}>
                  {getEmotionTitle(id)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Видалити цей запис?"
        confirmText="Видалити"
        cancelText="Скасувати"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  )
}
