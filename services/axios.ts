import axios from 'axios'
import { apiClient } from '@/lib/apiClient'

let isRefreshing = false
let queue: (() => void)[] = []

export const protectedApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

protectedApi.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          await apiClient.post('/auth/refresh')
          queue.forEach(cb => cb())
          queue = []
        } catch (refreshError) {
          // If refresh fails, we just want to redirect to login or let the app handle it.
          // We suppress the error log by not re-throwing it for the original request if possible,
          // or by returning a specific rejected promise that doesn't log.
          // Ideally, we might want to window.location.href = '/auth/login' here if client-side.

          isRefreshing = false
          queue = []
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return new Promise(resolve => {
        queue.push(() => resolve(protectedApi(original)))
      })
    }

    return Promise.reject(error)
  }
)