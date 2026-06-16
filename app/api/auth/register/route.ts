import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/services/api'
import { isAxiosError } from 'axios'
import { appendBackendCookies } from '@/lib/authCookies'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const apiRes = await api.post('/auth/register', body, {
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    })

    const res = NextResponse.json(apiRes.data, { status: apiRes.status })
    appendBackendCookies(res, apiRes.headers['set-cookie'])

    return res
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error ?? error.message },
        { status: error.response?.status ?? 500 }
      )
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
