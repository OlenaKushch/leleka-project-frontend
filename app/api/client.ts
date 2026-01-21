import axios, { AxiosInstance, AxiosError } from 'axios';
import {apiError} from '@/utils/error'

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const BASE_URL: string = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'https://stork-helpers-api.onrender.com/api')
  : '/api/proxy'; 

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const backendMessage=
    error.response?.data?.message ||
    error.response?.data?.error;

    if(backendMessage && apiError[backendMessage]) {
      error.message = apiError[backendMessage];
    }
    if (error.response?.status === 401) {
      console.warn('⚠️ Сесія недійсна або користувач не залогінений');
    }
    return Promise.reject(error);
  }
);