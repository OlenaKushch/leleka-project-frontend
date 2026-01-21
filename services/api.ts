import axios from 'axios'

const isServer = typeof window === 'undefined'
const BASE_URL = isServer
  ? process.env.NEXT_PUBLIC_API_URL || 'https://stork-helpers-api.onrender.com/api'
  : '/api'

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
