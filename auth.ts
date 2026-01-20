import NextAuth, { type NextAuthOptions } from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'
import CredentialsProvider from 'next-auth/providers/credentials'
import { EMPLOYEE_EMAIL_BY_ROLE } from './common/constants'

export const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

const oktaProvider = OktaProvider({
  clientId: process.env.OKTA_CLIENT_ID!,
  clientSecret: process.env.OKTA_CLIENT_SECRET!,
  issuer: process.env.OKTA_ISSUER!,
})

const icProvider = CredentialsProvider({
  id: 'ic-credentials',
  name: 'Individual contributor',
  credentials: {},
  async authorize() {
    return {
      id: 'ic-user',
      email: EMPLOYEE_EMAIL_BY_ROLE.IC,
      name: 'Individual Contributor',
    }
  },
})

const managerProvider = CredentialsProvider({
  id: 'managher-credentials',
  name: 'Manager',
  credentials: {},
  async authorize() {
    return {
      id: 'manager-user',
      email: EMPLOYEE_EMAIL_BY_ROLE.MANAGER,
      name: 'Manager',
    }
  },
})

const providers = authEnabled ? [oktaProvider] : [icProvider, managerProvider]

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
