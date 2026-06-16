import axios, { AxiosError } from 'axios'
import { apiError } from '@/utils/error'

interface ApiErrorResponse {
  message?: string
  error?: string
}

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const backendMessage = error.response?.data?.message || error.response?.data?.error

    if (backendMessage && apiError[backendMessage]) {
      error.message = apiError[backendMessage]
    } else if (backendMessage) {
      error.message = backendMessage
    }

    return Promise.reject(error)
  }
)
