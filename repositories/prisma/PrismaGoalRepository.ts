import { prisma } from '@/lib/prisma'
import { GoalRepository } from '@/repositories/GoalRepository'
import { GoalAmbitionsResponse, GoalUI } from '@/domain/goal'

const goalMapper = (goal: GoalAmbitionsResponse): GoalUI => {
  const hasParent = goal.parent ? { parent: { id: goal.parent.id, title: goal.parent.title } } : {}
  return {
    ...hasParent,
    id: goal.id,
    title: goal.title,
    status: goal.status,
    userName:
      `${goal.people_assignedTo?.name || ''} ${goal.people_assignedTo?.lastname || ''}`.trim() ||
      'Unassigned',
    goalType: goal.type,
    description: goal.body,
    avatarUrl: goal.people_assignedTo?.profileImageUrl
      ? `/profile-img/${goal.people_assignedTo.profileImageUrl}`
      : null,
    ladderedGoals: (goal.relations || []).map((relation) => ({
      id: relation.id,
      title: relation.title,
      status: relation.status,
      userName:
        `${relation.people_assignedTo?.name || ''} ${relation.people_assignedTo?.lastname || ''}`.trim() ||
        'Unassigned',
      avatarUrl: goal.people_assignedTo?.profileImageUrl
        ? `/profile-img/${relation.people_assignedTo.profileImageUrl}`
        : null,
    })),
  }
}

export class PrismaGoalRepository implements GoalRepository {
  async findMany(email?: string): Promise<GoalUI[]> {
    const list = (await prisma.goals.findMany({
      where: email
        ? {
            people_assignedTo: {
              is: {
                email: email,
              },
            },
          }
        : undefined,
      include: {
        people_assignedTo: {
          select: {
            id: true,
            name: true,
            lastname: true,
            profileImageUrl: true,
          },
        },
        parent: {
          select: { id: true, title: true },
        },
        relations: {
          include: {
            people_assignedTo: {
              select: {
                id: true,
                name: true,
                lastname: true,
                profileImageUrl: true,
              },
            },
          },
        },
      },
    })) as unknown as GoalAmbitionsResponse[]
    return list.map(goalMapper)
  }

  async findById(id: string): Promise<GoalUI | null> {
    const goal = (await prisma.goals.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        body: true,
        type: true,
        status: true,
        people_assignedTo: {
          select: {
            name: true,
            profileImageUrl: true,
          },
        },
        goal_ambitions: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    })) as unknown as GoalAmbitionsResponse | null
    return goal ? goalMapper(goal) : null
  }
}
