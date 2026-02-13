import { NextResponse } from 'next/server'
import { getServerSession } from '@/auth'
import { createRepository } from '@/factories/createRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { VendorUserRepository } from '@/repositories/vendor/VendorUserRepository'
import { MockRepository } from '@/repositories/mocks/MockRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { UserService } from '@/services/userService'

const userRepository = createRepository<UserRepository>(
  {
    prisma: PrismaUserRepository,
    vendor: VendorUserRepository,
    mock: MockRepository as unknown as new () => UserRepository,
  },
  {
    envKey: 'USERS_SOURCE',
    defaultKey: 'prisma',
  },
)

const userService = new UserService(userRepository)

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const email = searchParams.get('email')

  if (!email) {
    return Response.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const user = await userService.getUser(email)
    return Response.json(user)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[GET /user] >', email, errorMessage, error)

    // Check for common database connection issues
    if (errorMessage.includes('Database URL not configured')) {
      return NextResponse.json(
        { error: 'Database configuration error. Check PRISMA_DATABASE_URL environment variable.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
