'use client'

import { SessionProvider } from 'next-auth/react'
import { authEnabled } from '@/auth'

const devSession = {
  user: {
    id: 'dev-user',
    email: 'dev@local',
    name: 'James Miller',
  },
  expires: '2099-01-01T00:00:00.000Z',
}

export function Providers({ children }: { children: React.ReactNode }) {
  if (!authEnabled) {
    return <SessionProvider session={devSession}>{children}</SessionProvider>
  }

  return <SessionProvider>{children}</SessionProvider>
}
