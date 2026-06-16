import { NextResponse } from 'next/server'
import { parse } from 'cookie'

const META_KEYS = new Set(['Path', 'Max-Age', 'Expires', 'HttpOnly', 'Secure', 'SameSite', 'Domain'])

export function appendBackendCookies(
  res: NextResponse,
  setCookie: string | string[] | undefined
): void {
  if (!setCookie) return

  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

  cookieArray.forEach(cookieStr => {
    const parsed = parse(cookieStr)
    const cookieName = Object.keys(parsed).find(key => !META_KEYS.has(key))
    const cookieValue = cookieName ? parsed[cookieName] : undefined

    if (cookieName && typeof cookieValue === 'string') {
      res.cookies.set(cookieName, cookieValue, {
        path: parsed.Path ?? '/',
        httpOnly: true,
        maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      })
    }
  })
}
