import NextAuth, { type NextAuthOptions, Session } from 'next-auth'
import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'
import CredentialsProvider from 'next-auth/providers/credentials'
import { EMPLOYEE_EMAIL_BY_ROLE, DEFAULT_EMPLOYEE_EMAIL } from './common/constants'

export const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

// Dev session for when auth is disabled (server-side)
const devSession: Session = {
  user: {
    name: 'Dev User',
    email: DEFAULT_EMPLOYEE_EMAIL,
  },
  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
}

/**
 * Get server session - returns dev session when auth is disabled
 */
export async function getServerSession(): Promise<Session | null> {
  if (!authEnabled) {
    return devSession
  }
  return nextAuthGetServerSession(authOptions)
}

const getOktaProvider = () => {
  if (!authEnabled) return null

  const clientId = process.env.OKTA_CLIENT_ID
  const clientSecret = process.env.OKTA_CLIENT_SECRET
  const issuer = process.env.OKTA_ISSUER

  if (!clientId || !clientSecret || !issuer) {
    console.warn('Okta environment variables are not configured')
    return null
  }

  return OktaProvider({
    clientId,
    clientSecret,
    issuer,
  })
}

const icProvider = CredentialsProvider({
  id: 'ic-credentials',
  name: 'Individual contributor',
  credentials: {},
  async authorize() {
    return {
      id: 'user-2',
      email: EMPLOYEE_EMAIL_BY_ROLE.IC,
      name: 'Sarah Miller',
    }
  },
})

const managerProvider = CredentialsProvider({
  id: 'managher-credentials',
  name: 'Manager',
  credentials: {},
  async authorize() {
    return {
      id: 'user-1',
      email: EMPLOYEE_EMAIL_BY_ROLE.MANAGER,
      name: 'James Miller',
    }
  },
})

const oktaProvider = getOktaProvider()
const providers = authEnabled && oktaProvider ? [oktaProvider] : [icProvider, managerProvider]

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
