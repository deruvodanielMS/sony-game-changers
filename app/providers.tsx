'use client'

import { SessionProvider } from 'next-auth/react'
import { DEFAULT_EMPLOYEE_EMAIL } from '@/common/constants'

// Check if auth is enabled (use NEXT_PUBLIC_ prefix for client-side access)
const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

// Dev session for when auth is disabled
// Use a fixed far-future date to avoid hydration mismatch
const devSession = {
  user: {
    name: 'Dev User',
    email: DEFAULT_EMPLOYEE_EMAIL,
  },
  expires: '2099-12-31T23:59:59.999Z',
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={authEnabled ? undefined : devSession}>{children}</SessionProvider>
  )
}
