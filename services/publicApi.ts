import { apiClient } from '@/lib/apiClient'

export const publicApi = {
  login: (data: Record<string, unknown>) =>
    apiClient.post('/auth/login', data),

  register: (data: Record<string, unknown>) =>
    apiClient.post('/auth/register', data),
}