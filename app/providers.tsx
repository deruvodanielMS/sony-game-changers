'use client'

import { SessionProvider } from 'next-auth/react'
import { authEnabled } from '@/auth'
import { DEFAULT_EMPLOYEE_EMAIL } from '@/common/constants'

// Dev session for when auth is disabled
const devSession = {
  user: {
    name: 'Dev User',
    email: DEFAULT_EMPLOYEE_EMAIL,
  },
  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={authEnabled ? undefined : devSession}>{children}</SessionProvider>
  )
}
