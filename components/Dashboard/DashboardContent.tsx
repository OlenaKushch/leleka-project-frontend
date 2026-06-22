'use client'

import { GreetingBlock } from '@/components/GreetingBlock/GreetingBlock'
import { MomTipCard } from '@/components/MomTipCard/mom-tip-card'
import { BabyTodayCard } from '@/components/BabyTodayCard/baby-today-card'
import StatusBlock from '@/components/StatusBlock/StatusBlock'
import { FeelingCheckCard } from '@/components/FeelingCheckCard/FeelingCheckCard'
import TasksList from '@/components/tasks/TasksReminderCard'
import { useWeekData } from '@/hooks/useWeekData'
import { DashboardSkeleton } from './DashboardSkeleton'
import css from '@/app/page.module.css'

export function DashboardContent() {
  const { data: weekData, isLoading, isError, refetch } = useWeekData()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (isError || !weekData) {
    return (
      <div className={css.container}>
        <GreetingBlock />
        <div className={css.errorState}>
          <p>Не вдалося завантажити дані. Сервер може прокидатися.</p>
          <button type="button" onClick={() => refetch()}>
            Спробувати ще раз
          </button>
        </div>
      </div>
    )
  }

  const tipIndex = 6 - (weekData.daysToMeeting % 7)

  return (
    <div className={css.container}>
      <GreetingBlock />
      <div className={css.column}>
        <div className={css.left}>
          <StatusBlock currentWeek={weekData.weekNumber} daysLeft={weekData.daysToMeeting} />
          <BabyTodayCard
            image={weekData.image}
            imageAlt={weekData.imageAlt}
            babySize={weekData.babySize}
            babyWeight={weekData.babyWeight}
            babyActivity={weekData.babyActivity}
            babyDevelopment={weekData.babyDevelopment}
          />
          <MomTipCard tipIndex={tipIndex} momDailyTips={weekData.momDailyTips} />
        </div>
        <div className={css.right}>
          <TasksList />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  )
}
