import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { GoalService } from '@/services/goalService'
import { createRepository } from '@/factories/createRepository'
import { GoalRepository } from '@/repositories/GoalRepository'
import { PrismaGoalRepository } from '@/repositories/prisma/PrismaGoalRepository'
import { VendorGoalRepository } from '@/repositories/vendor/VendorGoalRepository'

const goalRepository = createRepository<GoalRepository>(
  {
    prisma: PrismaGoalRepository,
    vendor: VendorGoalRepository,
  },
  {
    envKey: 'GOALS_SOURCE',
    defaultKey: 'prisma',
  },
)

const goalService = new GoalService(goalRepository)

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const goals = await goalService.listGoals(session?.user?.email || undefined)
    return NextResponse.json(goals)
  } catch (error) {
    console.error('[GET /goals]', error)

    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
  }
}
