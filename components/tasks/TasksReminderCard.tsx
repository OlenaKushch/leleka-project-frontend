'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth.store'
import type { Task } from '@/types/task'
import AddTaskModal from '../add-task-modal/AddTaskModal'
import styles from './TasksReminderCard.module.css'
import { getTasks, updateTasksStatus } from '@/services/tasks.service'

const TasksList = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAuthenticated, hydrated } = useAuthStore()

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    enabled: hydrated && isAuthenticated,
  })

  const { mutate: toggleTask } = useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) => updateTasksStatus(id, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  if (!hydrated) {
    return (
      <section className={styles.card}>
        <p>Завантаження сесії...</p>
      </section>
    )
  }

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      router.push('/auth/register')
      return
    }
    setIsModalOpen(true)
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Важливі завдання</h3>
        <button className={styles.plusBtn} onClick={handleOpenModal}>
          <svg className={styles.icon} width="21" height="21">
            <use href="/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>

      {!isAuthenticated && (
        <>
          <p className={styles.emptyBold}>Наразі немає жодних завдань</p>
          <p className={styles.emptyText}>Увійдіть, щоб створювати завдання!</p>
          {/* <button className={styles.createBtn} onClick={() => router.push('/auth/register')}>
            Створити завдання
          </button> */}
        </>
      )}

      {isAuthenticated && tasks.length === 0 && !isLoading && (
        <>
          <p className={styles.emptyBold}>Наразі немає жодних завдань</p>
          <p className={styles.emptyText}>Створіть мерщій нове завдання!</p>
          {/* <button className={styles.createBtn} onClick={handleOpenModal}>
            Створити завдання
          </button> */}
        </>
      )}

    {isAuthenticated && tasks.length > 0 && (
  <ul className={styles.list}>
    {tasks.map(task => (
      <li key={task._id} className={styles.item}>
        
        <span className={styles.date}>
          {new Date(task.date).toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
          })}
        </span>

        
        <div className={styles.taskRow}>
    <input
      type="checkbox"
      checked={task.isDone}
      onChange={() =>
        toggleTask({ id: task._id, isDone: !task.isDone })
      }
      className={styles.checkbox}
    />
    <span className={`${styles.taskText} ${task.isDone ? styles.done : ""}`}>
      {task.name}
    </span>
  </div>
</li>
    ))}
  </ul>
)}


      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskSaved={() => queryClient.invalidateQueries({ queryKey: ['tasks'] })}
      />
    </section>
  )
}

export default TasksList