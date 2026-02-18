'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { useSession, signIn } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/atoms/Spinner'
import { useUserStore } from '@/stores/user.store'
import { DEFAULT_EMPLOYEE_EMAIL } from '@/common/constants'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}

type AuthGuardProps = {
  children: React.ReactNode
  provider?: string
}

export function AuthGuard({ children, provider = 'credentials' }: AuthGuardProps) {
  const { status, data } = useSession()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Wait for pathname, and skip redirect when already on a login page.
    if (!pathname) return
    const p = pathname.toLowerCase()
    if (p === '/login' || p.endsWith('/login')) return
    if (status === 'unauthenticated') {
      const callbackUrl = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      signIn(provider, { callbackUrl })
    }
  }, [status, pathname, provider, searchParams])

  const { getUser } = useUserStore()

  useEffect(() => {
    if (status === 'authenticated' && data) {
      getUser((data as Session).user?.email || DEFAULT_EMPLOYEE_EMAIL)
    }
  }, [status, data, getUser])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner size="large" />
      </div>
    )
  }

  return <>{children}</>
}
