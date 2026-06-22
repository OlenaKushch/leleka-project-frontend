import { apiClient } from '@/lib/apiClient'
import type { WeekData } from '@/types/babyData'

export async function fetchMyDayWeek(): Promise<WeekData> {
  const { data } = await apiClient.get<WeekData>('/weeks/me/my-day')
  return data
}

export async function fetchPublicWeek(): Promise<WeekData> {
  const { data } = await apiClient.get<WeekData>('/weeks/public/my-day')
  return data
}

export async function fetchWeekData(): Promise<WeekData> {
  try {
    return await fetchMyDayWeek()
  } catch {
    return fetchPublicWeek()
  }
}
