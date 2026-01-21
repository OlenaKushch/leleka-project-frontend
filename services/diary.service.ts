import { api } from '@/app/api/client'
import { DiaryEntry, Emotion } from '@/interfaces/diary'

export interface DiaryEntryDTO {
  title: string
  emotions: string[]
  description: string
}

export const DiaryService = {

  async getEntries(): Promise<DiaryEntry[]> {
    const { data } = await api.get<DiaryEntry[]>('/diaries/me')
    return data
  },

  async getEmotions(): Promise<Emotion[]> {
    const { data } = await api.get<Emotion[]>('/emotions/emotions')
    return data
  },

  async createEntry(payload: DiaryEntryDTO): Promise<DiaryEntry> {
    const { data } = await api.post<DiaryEntry>('/diaries/me', payload)
    return data
  },

  async updateEntry(id: string, payload: DiaryEntryDTO): Promise<DiaryEntry> {
    const { data } = await api.patch<DiaryEntry>(`/diaries/me/${id}`, payload)
    return data
  },

  async deleteEntry(id: string): Promise<void> {
    await api.delete(`/diaries/me/${id}`)
  },
}