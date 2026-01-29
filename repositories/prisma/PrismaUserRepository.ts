import { User } from '@/domain/user'
import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/UserRepository'

export class PrismaUserRepository implements UserRepository {
  async getUser(email: string): Promise<User | null> {
    const user = await prisma.people.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        lastname: true,
        profileImageUrl: true,
        employeeId: true,
        workdayId: true,
        status: true,
        orgId: true,
        jobId: true,
      },
    })

    return user || null
  }
}
