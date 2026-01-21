import { apiClient } from '@/lib/apiClient'

export const protectedApi = {
  get: (url: string) => apiClient.get(`/proxy${url}`),
  post: (url: string, data?: unknown) =>
    apiClient.post(`/proxy${url}`, data),
  put: (url: string, data?: unknown) =>
    apiClient.put(`/proxy${url}`, data),
  delete: (url: string) => apiClient.delete(`/proxy${url}`),
}