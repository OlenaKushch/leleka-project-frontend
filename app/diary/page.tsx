'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { DiaryService } from '@/services/diary.service'
import { DiaryList } from '@/components/diary-page/diary-list.component'
import { DiaryEntryDetails } from '@/components/diary-page/diary-entry-details.component'
import { AddDiaryEntryModal } from '@/components/add-diary-entry-modal/AddDiaryEntryModal'
import { GreetingBlock } from '@/components/GreetingBlock/GreetingBlock'
import { DiaryEntry, Emotion } from '@/interfaces/diary'
import styles from './styles.module.css'

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [allEmotions, setAllEmotions] = useState<Emotion[]>([])
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1440
      setIsDesktop(desktop)
      if (!desktop) {
        setSelectedEntry(null)
      } else if (desktop && !selectedEntry && entries.length > 0) {
        setSelectedEntry(entries[0])
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(() => {
    let isIgnore = false

    async function initData() {
      try {
        const [emotions, data] = await Promise.all([
          DiaryService.getEmotions(),
          DiaryService.getEntries(),
        ])

        if (!isIgnore) {
          setAllEmotions(emotions)
          setEntries(data)
          if (window.innerWidth >= 1440 && data.length > 0) {
            setSelectedEntry(data[0])
          }
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error('Помилка ініціалізації:', e.response?.status)
        }
      }
    }

    initData()

    return () => {
      isIgnore = true
    }
  }, [])

  const handleEntrySaved = (savedEntry: DiaryEntry) => {
    setEntries(prevEntries => {
      const exists = prevEntries.some(e => e._id === savedEntry._id)

      if (exists) {
        return prevEntries.map(e => (e._id === savedEntry._id ? savedEntry : e))
      } else {
        return [savedEntry, ...prevEntries]
      }
    })

    if (selectedEntry && selectedEntry._id === savedEntry._id) {
      setSelectedEntry(savedEntry)
    }

    setIsEditModalOpen(false)
  }

  const handleEntryDeleted = () => {
    if (!selectedEntry) return
    const newEntries = entries.filter(e => e._id !== selectedEntry._id)
    setEntries(newEntries)
    setSelectedEntry(null)
    if (isDesktop && newEntries.length > 0) {
      setSelectedEntry(newEntries[0])
    }
  }

  return (
    <>
      <div className={styles.greetingBlock}>
        <GreetingBlock />
      </div>
      <div className={styles.containersGroup}>
        <div className={styles.columnLeft}>
          <DiaryList
            entries={entries}
            allEmotions={allEmotions}
            onSelect={setSelectedEntry}
            onEntryAdd={handleEntrySaved}
            onRefresh={() => {}}
          />
        </div>

        {isDesktop && (
          <div className={styles.columnRight}>
            <DiaryEntryDetails
              entry={selectedEntry}
              allEmotions={allEmotions}
              onDeleteSuccess={handleEntryDeleted}
              onEditTrigger={(entry: DiaryEntry) => {
                setSelectedEntry(entry)
                setIsEditModalOpen(true)
              }}
            />
          </div>
        )}

        <AddDiaryEntryModal
          isOpen={isEditModalOpen}
          isEdit={true}
          initialData={selectedEntry}
          onClose={() => setIsEditModalOpen(false)}
          onSubmitSuccess={handleEntrySaved}
        />
      </div>
    </>
  )
}
