import { User } from '@/domain/user'
import { UserRepository } from '@/repositories/UserRepository'

export class VendorUserRepository implements UserRepository {
  private readonly baseUrl = process.env.VENDOR_API_URL!
  async getUser(email: string): Promise<User | null> {
    const res = await fetch(`${this.baseUrl}/user?email=${email}`, {
      headers: {
        Authorization: `Bearer ${process.env.VENDOR_API_TOKEN}`,
      },
    })

    if (res.status === 404) return null
    if (!res.ok) {
      throw new Error('Failed to fetch user info')
    }

    return this.toDomain(await res.json())
  }
  toDomain(apiUser: Partial<User>): User {
    return {
      id: apiUser.id,
      email: apiUser.email || '',
      name: apiUser.name || '',
      lastname: apiUser.lastname || '',
      profileImageUrl: apiUser.profileImageUrl ?? null,
      employeeId: apiUser.employeeId ?? null,
      workdayId: apiUser.workdayId ?? null,
      status: apiUser.status ?? null,
      orgId: apiUser.orgId || '',
      jobId: apiUser.jobId || '',
    }
  }
}
