import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/services/api'
import axios, { AxiosError } from 'axios'
import { appendBackendCookies } from '@/lib/authCookies'

interface BackendErrorResponse {
  message?: string
  error?: string
}

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin

  try {
    const apiRes = await api.get('/auth/google/callback', {
      params: Object.fromEntries(req.nextUrl.searchParams),
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    })

    const res = NextResponse.redirect(new URL('/', appUrl))
    appendBackendCookies(res, apiRes.headers['set-cookie'])
    return res
  } catch (error: unknown) {
    const loginUrl = new URL('/auth/login', appUrl)
    loginUrl.searchParams.set('error', 'google')

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<BackendErrorResponse>
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'Помилка Google авторизації'

      loginUrl.searchParams.set('message', message)
    }

    return NextResponse.redirect(loginUrl)
  }
}
