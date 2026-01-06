import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse, type NextRequest } from 'next/server'
import { ROUTES } from '@/common/routes'

const nextIntlMiddleware = createMiddleware(routing)

export function getRedirectPath(pathname: string): string | null {
  return pathname === ROUTES.ROOT ? ROUTES.GAME_CHANGERS_AMBITIONS : null
}

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl?.pathname ?? ''
  const redirectPath = getRedirectPath(pathname)
  if (redirectPath) {
    const url = req.nextUrl.clone()
    url.pathname = redirectPath
    return NextResponse.redirect(url)
  }

  // Delegate to next-intl middleware for non-redirect requests
  // `nextIntlMiddleware` expects a NextRequest-like object; pass through.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  return nextIntlMiddleware(req)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
