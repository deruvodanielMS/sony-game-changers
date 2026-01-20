import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { createRepository } from '@/factories/createRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { VendorUserRepository } from '@/repositories/vendor/VendorUserRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { UserService } from '@/services/userService'

const userRepository = createRepository<UserRepository>(
  {
    prisma: PrismaUserRepository,
    vendor: VendorUserRepository,
  },
  {
    envKey: 'GOALS_SOURCE',
    defaultKey: 'prisma',
  },
)

const userService = new UserService(userRepository)

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const email = searchParams.get('email')

  if (!email) {
    return Response.json({ error: 'Email is required' }, { status: 400 })
  }

  const user = await userService.getUser(email)
  return Response.json(user)
}
