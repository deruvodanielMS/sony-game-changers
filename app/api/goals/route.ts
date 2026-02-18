import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { GoalService } from '@/services/goalService'
import { CreateGoalDTO } from '@/domain/goal'
import { createRepository } from '@/factories/createRepository'
import { GoalRepository } from '@/repositories/GoalRepository'
import { PrismaGoalRepository } from '@/repositories/prisma/PrismaGoalRepository'
import { VendorGoalRepository } from '@/repositories/vendor/VendorGoalRepository'
import { MockRepository } from '@/repositories/mocks/MockRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { VendorUserRepository } from '@/repositories/vendor/VendorUserRepository'
import { UserService } from '@/services/userService'

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

const goalService = new GoalService(goalRepository, userService)

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const goals = await goalService.listGoals(session?.user?.email || undefined)
    return NextResponse.json(goals)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[GET /goals]', errorMessage, error)

    // Check for common database connection issues
    if (errorMessage.includes('Database URL not configured')) {
      return NextResponse.json(
        { error: 'Database configuration error. Check PRISMA_DATABASE_URL environment variable.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = (await request.json()) as CreateGoalDTO
    const created = await goalService.createGoal(payload, session.user?.email || '')

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('[POST /goals] Error:', error)
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await request.json()) as CreateGoalDTO & { id: string }
    const id: string = body.id

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const { id: _discard, ...payload } = body as CreateGoalDTO & { id: string }

    const updated = await goalService.updateGoal(id, payload)

    return NextResponse.json(updated, { status: 201 })
  } catch (error) {
    console.error('[PUT /goals]', error)
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    let id = url.searchParams.get('id')

    if (!id) {
      const body = (await request.json()) as { id?: string }
      id = body?.id || null
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    await goalService.deleteGoal(id)

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    console.error('[DELETE /goals]', error)
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 })
  }
}
