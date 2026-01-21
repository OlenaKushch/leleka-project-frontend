import { NextResponse } from 'next/server'
import { api } from '../../../../services/api'
import { isAxiosError } from 'axios'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Frontend sent body:', body)

    const apiRes = await api.post('/auth/register', body, {
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    })
    console.log('Backend response data:', apiRes.data)

    return NextResponse.json(apiRes.data)
  } catch (error) {
    console.error('Proxy error:', error)
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error ?? error.message },
        { status: error.response?.status ?? 500 }
      )
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
