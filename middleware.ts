import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasAuthSession, isProtectedRoute, isPublicAuthRoute } from '@/lib/routes'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/icon.png'
  ) {
    return NextResponse.next()
  }

  const authenticated = hasAuthSession(request.cookies)

  if (isProtectedRoute(pathname) && !authenticated) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isPublicAuthRoute(pathname) && authenticated) {
    const homeUrl = request.nextUrl.clone()
    homeUrl.pathname = '/'
    homeUrl.search = ''
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
