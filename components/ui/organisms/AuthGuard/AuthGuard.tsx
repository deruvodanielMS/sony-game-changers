'use client'

import { useSession, signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/atoms/Spinner'

type AuthGuardProps = {
  children: React.ReactNode
  provider?: string
}

export function AuthGuard({ children, provider = 'okta' }: AuthGuardProps) {
  const { status } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(provider, {
        callbackUrl: pathname,
      })
    }
  }, [status, pathname, provider])

  if (status !== 'authenticated') {
    return <Spinner size="large" />
  }

  return <>{children}</>
}
