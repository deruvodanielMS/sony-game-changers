import { NextResponse } from 'next/server'
import { getServerSession } from '@/auth'
import { GoalService } from '@/services/goalService'
import { createRepository } from '@/factories/createRepository'
import { GoalRepository } from '@/repositories/GoalRepository'
import { PrismaGoalRepository } from '@/repositories/prisma/PrismaGoalRepository'
import { VendorGoalRepository } from '@/repositories/vendor/VendorGoalRepository'
import { MockRepository } from '@/repositories/mocks/MockRepository'
import type { UpdateGoalDTO } from '@/domain/goal'

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
  const session = await getServerSession()

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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const body = (await request.json()) as UpdateGoalDTO

    const updatedGoal = await goalService.updateGoal(id, body)
    return NextResponse.json(updatedGoal)
  } catch (error) {
    console.error('[PATCH /goal]', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to update goal'
    const status = errorMessage.includes('not found') ? 404 : 500

    return NextResponse.json({ error: errorMessage }, { status })
  }
}
