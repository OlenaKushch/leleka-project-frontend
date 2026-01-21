import { api } from '@/app/api/client'
import { AxiosError } from 'axios'
import type { User } from '@/types/user'

interface BackendResponse {
  message: string
}

interface BackendAvatarResponse {
  avatar: string
}

interface ApiError {
  message: string
}

export const updateUser = async (data: Partial<User>): Promise<Partial<User>> => {
  try {
    await api.patch<BackendResponse>('/users/me', data)
    return data 
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>
    const message = axiosError.response?.data?.message || 'Помилка оновлення профілю'
    throw new Error(message)
  }
}

export const updateUserAvatar = async (file: File): Promise<User> => {
  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const res = await api.patch<BackendAvatarResponse>('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return { avatar: res.data.avatar } as User
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>
    throw new Error(axiosError.response?.data?.message || 'Не вдалося завантажити фото')
  }
}

export const sendVerificationEmail = async (email: string): Promise<void> => {
  try {
    await api.post('/users/verify', { email })
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>
    throw new Error(axiosError.response?.data?.message || 'Помилка верифікації')
  }
}

export const updateProfile = updateUser