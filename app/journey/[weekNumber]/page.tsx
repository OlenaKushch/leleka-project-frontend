'use client'

import { useState } from 'react'
import WeekSelector from '@/components/WeekSelector/WeekSelector'
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails'
import { GreetingBlock } from '@/components/GreetingBlock/GreetingBlock'
import css from './weekNumber.module.css'

interface PageProps {
  params: {
    weekNumber: string
  }
}

export default function JourneyPage({ params }: PageProps) {
  const weekNum = Number(params.weekNumber)

  const [selectedWeek, setSelectedWeek] = useState<number>(weekNum)

  return (
    <div className={css.container}>
      <GreetingBlock />

      <div className={css.week}>
        <WeekSelector
          currentWeek={weekNum}
          selectedWeek={selectedWeek}
          onWeekSelect={setSelectedWeek}
        />
      </div>

      <JourneyDetails weekNumber={selectedWeek} />
    </div>
  )
}
