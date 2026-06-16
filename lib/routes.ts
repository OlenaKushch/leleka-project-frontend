export const PUBLIC_AUTH_ROUTES = ['/auth/login', '/auth/register'] as const

export const PROTECTED_ROUTE_PREFIXES = ['/profile', '/diary', '/journey'] as const

const SESSION_COOKIE_NAMES = ['accessToken', 'refreshToken', 'sessionId'] as const

export function isPublicAuthRoute(pathname: string): boolean {
  return PUBLIC_AUTH_ROUTES.some(route => pathname.startsWith(route))
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

export function hasAuthSession(cookies: {
  get: (name: string) => { value: string } | undefined
}): boolean {
  return SESSION_COOKIE_NAMES.some(name => Boolean(cookies.get(name)?.value))
}
