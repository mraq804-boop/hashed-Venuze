const DEFAULT_AFTER_LOGIN = '/dashboard'

export function safeFrom(from: string | null): string {
  if (!from || !from.startsWith('/') || from.startsWith('//') || from.startsWith('/\\')) return DEFAULT_AFTER_LOGIN
  return from
}

export function resolveAuthRedirect(pathname: string, search: string, hasToken: boolean): string | null {
  const isProtected = pathname === '/dashboard' || pathname.startsWith('/dashboard/')
  if (isProtected && !hasToken) return `/login?from=${encodeURIComponent(pathname + search)}`
  if (pathname === '/login' && hasToken) return DEFAULT_AFTER_LOGIN
  return null
}
