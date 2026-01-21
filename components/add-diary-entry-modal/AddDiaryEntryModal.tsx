'use client'

import React, { useEffect, useState } from 'react'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { DiaryEntry } from '@/interfaces/diary'
import AddDiaryEntryForm from './AddDiaryEntryForm'
import styles from './add-diary-entry-modal.module.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#FEF1DB' }} spin />

interface AddDiaryEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: (entry: DiaryEntry) => void
  isEdit?: boolean
  initialData?: DiaryEntry | null
}

export const AddDiaryEntryModal: React.FC<AddDiaryEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  isEdit = false,
  initialData = null,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, isLoading])

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={!isLoading ? onClose : undefined}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loaderContainer}>
              <Spin indicator={antIcon} tip="Зберігаємо..." />
            </div>
          </div>
        )}

        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрити"
          disabled={isLoading}
        >
          <CloseOutlined />
        </button>

        <h2 className={styles.title}>{isEdit ? 'Редагувати запис' : 'Новий запис'}</h2>

        <AddDiaryEntryForm
          isEdit={isEdit}
          initialData={initialData}
          onSubmitSuccess={onSubmitSuccess}
          onClose={onClose}
          setLoading={setIsLoading}
        />
      </div>
    </div>
  )
}
