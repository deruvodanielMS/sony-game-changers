'use client'

import { useSession, signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/atoms/Spinner'
import { useUserStore } from '@/stores/user.store'
import { DEFAULT_EMPLOYEE_EMAIL } from '@/common/constants'
import { Session } from 'next-auth'

type AuthGuardProps = {
  children: React.ReactNode
  provider?: string
}

export function AuthGuard({ children, provider = 'okta' }: AuthGuardProps) {
  const { status, data } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(provider, {
        callbackUrl: pathname,
      })
    }
  }, [status, pathname, provider])

  const { getUser } = useUserStore()

  useEffect(() => {
    if (status === 'authenticated' && data) {
      getUser((data as Session).user?.email || DEFAULT_EMPLOYEE_EMAIL)
    }
  }, [status, data, getUser])

  if (status !== 'authenticated') {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner size="large" />
      </div>
    )
  }

  return <>{children}</>
}
