import axios, { AxiosError, AxiosInstance } from 'axios'
import { API_URL, API_TIMEOUT_MS } from '@/lib/apiConfig'
import { apiError } from '@/utils/error'

interface ApiErrorResponse {
  message?: string
  error?: string
}

function applyErrorInterceptor(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorResponse>) => {
      if (error.code === 'ECONNABORTED') {
        error.message =
          'Сервер довго не відповідає. Можливо, він прокидається — спробуйте ще раз через хвилину.'
      }

      const backendMessage = error.response?.data?.message || error.response?.data?.error

      if (backendMessage && apiError[backendMessage]) {
        error.message = apiError[backendMessage]
      } else if (backendMessage) {
        error.message = backendMessage
      }

      return Promise.reject(error)
    }
  )

  return instance
}

export const apiClient = applyErrorInterceptor(
  axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT_MS,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
)

export const api = apiClient
