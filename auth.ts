import NextAuth, { type NextAuthOptions } from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'

export const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

const oktaProvider = OktaProvider({
  clientId: process.env.OKTA_CLIENT_ID!,
  clientSecret: process.env.OKTA_CLIENT_SECRET!,
  issuer: process.env.OKTA_ISSUER!,
})

const providers = authEnabled ? [oktaProvider] : []

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
