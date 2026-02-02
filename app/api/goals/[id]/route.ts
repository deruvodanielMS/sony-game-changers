import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { GoalService } from '@/services/goalService'
import { createRepository } from '@/factories/createRepository'
import { GoalRepository } from '@/repositories/GoalRepository'
import { PrismaGoalRepository } from '@/repositories/prisma/PrismaGoalRepository'
import { VendorGoalRepository } from '@/repositories/vendor/VendorGoalRepository'
import { MockRepository } from '@/repositories/mocks/MockRepository'

const goalRepository = createRepository<GoalRepository>(
  {
    prisma: PrismaGoalRepository,
    vendor: VendorGoalRepository,
    mock: MockRepository as unknown as new () => GoalRepository,
  },
  {
    envKey: 'GOALS_SOURCE',
    defaultKey: 'prisma',
  },
)

const goalService = new GoalService(goalRepository)

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const goal = await goalService.getGoal(id)
    return NextResponse.json(goal)
  } catch (error) {
    console.error('[GET /goal]', error)

    return NextResponse.json({ error: 'Failed to fetch goal with ID ' + id }, { status: 500 })
  }
}
