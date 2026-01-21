import { NextResponse } from 'next/server'
import { api } from '../../../../services/api'
import { isAxiosError } from 'axios'

export async function POST(req: Request) {
  try {
    await api.post(
  '/auth/logout',
  {},
  {
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  }
)

    const res = NextResponse.json({ message: 'Logged out successfully' })

    const cookiesToClear = ['accessToken', 'refreshToken', 'sessionId']
    cookiesToClear.forEach(name => {
      res.headers.append(
        'Set-Cookie',
        `${name}=; Path=/; Max-Age=0; HttpOnly; ${
          process.env.NODE_ENV === 'production' ? 'Secure; SameSite=None' : 'SameSite=Lax'
        }`
      )
    })

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
