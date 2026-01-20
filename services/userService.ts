import { UserRepository } from '@/repositories/UserRepository'

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  getUser(email: string) {
    return this.userRepo.getUser(email)
  }
}
