'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DiaryEntry, DiaryListProps } from '../../interfaces/diary'
import { AddDiaryEntryModal } from '../add-diary-entry-modal/AddDiaryEntryModal'
import styles from './diary-list.module.css'

export const DiaryList: React.FC<DiaryListProps & { onEntryAdd: (entry: DiaryEntry) => void }> = ({
  entries,
  allEmotions,
  onSelect,
  onEntryAdd,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const getEmotionTitle = (id: string): string => {
    const emotion = allEmotions.find(e => e._id === id)
    return emotion ? emotion.title : '...'
  }

  const handleEntryClick = (entry: DiaryEntry) => {
    if (window.innerWidth < 1440) {
      router.push(`/diary/${entry._id}`)
    } else {
      onSelect(entry)
    }
  }

  return (
    <div className={styles.diaryListContainer}>
      <div className={styles.firstColumn}>
        <div className={styles.topContainer}>
          <h3 className={styles.title}>Ваші записи</h3>
          <button className={styles.addEntryButton} onClick={() => setIsModalOpen(true)}>
            <span className={styles.newEntry}>Новий запис</span>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-add_circle" />
            </svg>
          </button>
        </div>

        <div className={styles.listContainer}>
          {entries.length === 0 ? (
            <p className={styles.emptyText}>Порожньо</p>
          ) : (
            entries.map(entry => (
              <div
                key={entry._id}
                className={styles.entryCard}
                onClick={() => handleEntryClick(entry)}
              >
                <div className={styles.entryHeader}>
                  <h4 className={styles.entryTitle}>{entry.title}</h4>
                  <span className={styles.entryDate}>
                    {new Date(entry.date)
                      .toLocaleDateString('uk-UA', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                      .replace(/\s*р\.?$/, '')}
                  </span>
                </div>

                {entry.emotions.length > 0 && (
                  <div className={styles.emotionsWrapper}>
                    {entry.emotions.map(id => (
                      <span key={id} className={styles.emotionTag}>
                        {getEmotionTitle(id)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <AddDiaryEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={onEntryAdd}
      />
    </div>
  )
}
