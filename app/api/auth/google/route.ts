import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/services/api'
import axios, { AxiosError } from 'axios'
import { appendBackendCookies } from '@/lib/authCookies'

interface BackendErrorResponse {
  message?: string
  error?: string
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://stork-helpers-api.onrender.com/api'

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin
  const callbackUrl = `${appUrl}/api/auth/google/callback`

  const backendAuthUrl = new URL(`${BACKEND_URL}/auth/google`)
  backendAuthUrl.searchParams.set('redirect_uri', callbackUrl)

  const mode = req.nextUrl.searchParams.get('mode')
  if (mode) {
    backendAuthUrl.searchParams.set('mode', mode)
  }

  return NextResponse.redirect(backendAuthUrl.toString())
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const apiRes = await api.post('/auth/google', body, {
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    })

    const res = NextResponse.json(apiRes.data, { status: apiRes.status })
    appendBackendCookies(res, apiRes.headers['set-cookie'])

    return res
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<BackendErrorResponse>

      return NextResponse.json(
        {
          error:
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            axiosError.message,
        },
        { status: axiosError.response?.status ?? 500 }
      )
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
