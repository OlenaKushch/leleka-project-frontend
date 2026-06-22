'use client'

import { useEffect } from 'react'
import AddTaskForm from './AddTaskForm'
import styles from './AddTaskModal.module.css'
import { CloseButton } from '@/components/ui/CloseButton'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskSaved: () => void
  taskToEdit?: {
    id: string
    name: string
    date: string
  } | null
}

const AddTaskModal = ({ isOpen, onClose, taskToEdit, onTaskSaved }: AddTaskModalProps) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', onEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSuccess = () => {
    onTaskSaved()
    onClose()
  }

  return (
    <div className={styles.backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <CloseButton className={styles.closeBtn} onClick={onClose} />
        <h2 className={styles.title}>{taskToEdit ? 'Редагувати завдання' : 'Нове завдання'}</h2>
        <AddTaskForm taskToEdit={taskToEdit} onTaskSaved={handleSuccess} />
      </div>
    </div>
  )
}

export default AddTaskModal
