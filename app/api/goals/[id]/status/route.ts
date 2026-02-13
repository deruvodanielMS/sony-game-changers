import { NextResponse } from 'next/server'
import { getServerSession } from '@/auth'
import { GoalService } from '@/services/goalService'
import { createRepository } from '@/factories/createRepository'
import { GoalRepository } from '@/repositories/GoalRepository'
import { PrismaGoalRepository } from '@/repositories/prisma/PrismaGoalRepository'
import { VendorGoalRepository } from '@/repositories/vendor/VendorGoalRepository'
import { MockRepository } from '@/repositories/mocks/MockRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { PrismaUserRepository } from '@/repositories/prisma/PrismaUserRepository'
import { VendorUserRepository } from '@/repositories/vendor/VendorUserRepository'
import { UserService } from '@/services/userService'
import { GoalStatus, UpdateGoalStatusDTO, GOAL_STATUSES } from '@/domain/goal'

// Manager email for mock authorization (temporary)
const MANAGER_EMAIL = 'manager@employee.test'

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

/**
 * PATCH /api/goals/[id]/status
 * Update the status of a goal
 *
 * Body: { status: GoalStatus, comment?: string }
 *
 * Status transitions:
 * - draft -> awaiting_approval (owner)
 * - draft -> archived (owner)
 * - awaiting_approval -> approved (manager only)
 * - awaiting_approval -> draft (manager only - send back)
 * - awaiting_approval -> archived (owner/manager)
 * - approved -> archived (owner)
 * - approved -> completed (owner)
 * - archived -> draft (owner - unarchive)
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing goal ID' }, { status: 400 })
  }

  try {
    const body = (await request.json()) as UpdateGoalStatusDTO

    if (!body.status) {
      return NextResponse.json({ error: 'Missing status in request body' }, { status: 400 })
    }

    // Validate status is a valid GoalStatus
    const validStatuses = Object.values(GOAL_STATUSES)
    if (!validStatuses.includes(body.status as GoalStatus)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 },
      )
    }

    // Mock: Check if current user is a manager
    // In production, this would check the user's role or relationship with goal owner
    const isManager = session.user?.email === MANAGER_EMAIL

    const updatedGoal = await goalService.updateGoalStatus(
      id,
      body.status as GoalStatus,
      session.user?.email || '',
      isManager,
    )

    return NextResponse.json(updatedGoal)
  } catch (error) {
    console.error('[PATCH /goals/[id]/status] Error:', error)

    // Return specific error messages for known errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid status transition')) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      if (error.message.includes('manager privileges')) {
        return NextResponse.json({ error: error.message }, { status: 403 })
      }
      if (error.message.includes('not found')) {
        return NextResponse.json({ error: error.message }, { status: 404 })
      }
    }

    return NextResponse.json({ error: 'Failed to update goal status' }, { status: 500 })
  }
}
