import { User } from '@/domain/user'

export interface UserRepository {
  getUser(email: string): Promise<User | null>
}
