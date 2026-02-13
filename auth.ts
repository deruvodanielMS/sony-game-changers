import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { EMPLOYEE_EMAIL_BY_ROLE } from './common/constants'
import { decrypt, encrypt } from './utils/simpleCrypto'

// Demo password handling:
// - `DEMO_PASSWORD_KEY` (server) is used to XOR-encrypt passwords
// - You can provide `DEMO_IC_PASSWORD_ENC` / `DEMO_MANAGER_PASSWORD_ENC` (encrypted base64)
//   or they default to encrypting the literal 'password' with the key.
const DEMO_KEY = process.env.DEMO_PASSWORD_KEY ?? 'dev-demo-key'

const DEFAULT_ENC = (plain: string) => encrypt(plain, DEMO_KEY)

const ENC_IC = process.env.DEMO_IC_PASSWORD_ENC ?? DEFAULT_ENC('ic-pass')
const ENC_MANAGER = process.env.DEMO_MANAGER_PASSWORD_ENC ?? DEFAULT_ENC('manager-pass')

const credentialsProvider = CredentialsProvider({
  id: 'credentials',
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    if (!credentials) return null
    const { email, password } = credentials as { email?: string; password?: string }

    if (!email || !password) return null
    // Per-role password check using the demo encryption key
    if (email === EMPLOYEE_EMAIL_BY_ROLE.IC) {
      try {
        const expected = decrypt(ENC_IC, DEMO_KEY)
        if (password !== expected) return null
        return {
          id: 'ic-user',
          email,
          name: 'Individual Contributor',
          role: 'IC',
        }
      } catch (err) {
        console.error('Error decrypting IC password:', err)
        return null
      }
    }

    if (email === EMPLOYEE_EMAIL_BY_ROLE.MANAGER) {
      try {
        const expected = decrypt(ENC_MANAGER, DEMO_KEY)
        if (password !== expected) return null
        return {
          id: 'manager-user',
          email,
          name: 'Manager',
          role: 'MANAGER',
        }
      } catch (err) {
        console.error('Error decrypting Manager password:', err)
        return null
      }
    }

    return null
  },
})

const providers = [credentialsProvider]

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as { role?: string }).role) token.role = (user as { role?: string }).role
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        ;(session.user as { role?: string }).role = token.role as string | undefined
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
