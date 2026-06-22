'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { DiaryService } from '@/services/diary.service'
import { DiaryEntryDetails } from '@/components/diary-page/diary-entry-details.component'
import { AddDiaryEntryModal } from '@/components/add-diary-entry-modal/AddDiaryEntryModal'
import { DiaryEntry, Emotion } from '@/interfaces/diary'
import { Loader } from '@/components/Loader/Loader'
import styles from './styles.module.css'

export default function DiaryEntryPage() {
  const params = useParams()
  const router = useRouter()
  const entryId = params.entryId as string
  const [entry, setEntry] = useState<DiaryEntry | null>(null)
  const [allEmotions, setAllEmotions] = useState<Emotion[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        router.push('/diary')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [router])

  const fetchData = useCallback(async () => {
    try {
      const [emotions, entries] = await Promise.all([
        DiaryService.getEmotions(),
        DiaryService.getEntries(),
      ])

      setAllEmotions(emotions)
      const foundEntry = entries.find((e: DiaryEntry) => e._id === entryId)

      if (foundEntry) {
        setEntry(foundEntry)
      } else {
        router.push('/diary')
      }
    } finally {
      setLoading(false)
    }
  }, [entryId, router])

  useEffect(() => {
    if (entryId) fetchData()
  }, [fetchData, entryId])

  const handleEntryUpdate = (updatedEntry: DiaryEntry) => {
    setEntry(updatedEntry)
    setIsEditModalOpen(false)
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader variant="fullscreen" />
      </div>
    )
  }

  if (!entry) return null

  return (
    <div className={styles.pageContainer}>
      <DiaryEntryDetails
        entry={entry}
        allEmotions={allEmotions}
        onDeleteSuccess={() => router.push('/diary')}
        onEditTrigger={() => setIsEditModalOpen(true)}
      />

      <AddDiaryEntryModal
        isOpen={isEditModalOpen}
        isEdit={true}
        initialData={entry}
        onClose={() => setIsEditModalOpen(false)}
        onSubmitSuccess={handleEntryUpdate}
      />
    </div>
  )
}
