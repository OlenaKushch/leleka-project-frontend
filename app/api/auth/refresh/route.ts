import { NextResponse } from 'next/server'
import { api } from '../../../../services/api'
import { parse } from 'cookie'
import { isAxiosError } from 'axios'

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const apiRes = await api.post(
      '/auth/refresh',
      {},
      {
        headers: {
          cookie: req.headers.get('cookie') || '',
        },
      }
    )

    const res = NextResponse.json(apiRes.data, { status: apiRes.status })

    const setCookie = apiRes.headers['set-cookie']
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr)

        const options: Parameters<typeof res.cookies.set>[2] = {
          path: parsed.Path ?? '/',
          httpOnly: true,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        }

        if (parsed.accessToken) {
          res.cookies.set('accessToken', parsed.accessToken, options)
        }

        if (parsed.refreshToken) {
          res.cookies.set('refreshToken', parsed.refreshToken, options)
        }
      }
    }

    return res
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error ?? error.message },
        { status: error.response?.status ?? 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}