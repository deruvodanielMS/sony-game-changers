import { GoalService } from '@/services/goalService'
import { createRepository } from '@/factories/createRepository'
import { GoalRepository } from '@/repositories/GoalRepository'
import { PrismaGoalRepository } from '@/repositories/prisma/PrismaGoalRepository'
import { VendorGoalRepository } from '@/repositories/vendor/VendorGoalRepository'
import { MockGoalRepository } from '@/repositories/mock/MockGoalRepository'

const goalRepository = createRepository<GoalRepository>(
  {
    prisma: PrismaGoalRepository,
    vendor: VendorGoalRepository,
    mock: MockGoalRepository,
  },
  {
    envKey: 'GOALS_SOURCE',
    defaultKey: 'mock',
  },
)

const goalService = new GoalService(goalRepository)

export async function GET() {
  const goals = await goalService.listGoals()
  return Response.json(goals)
}
