import { prisma } from '@/lib/prisma'
import { GoalRepository } from '@/repositories/GoalRepository'
import { GoalAmbitionsResponse, GoalUI } from '@/domain/goal'

const goalMapper = (goal: GoalAmbitionsResponse): GoalUI => {
  const hasParent = goal.parent ? { parent: { id: goal.parent.id, title: goal.parent.title } } : {}
  const hasAmbitions = goal.goal_ambitions ? { goalAmbitions: goal.goal_ambitions } : {}
  const hasAchievements = goal.goal_achievements ? { goalAchievements: goal.goal_achievements } : {}
  const hasActions = goal.goal_actions ? { goalActions: goal.goal_actions } : {}
  return {
    ...hasParent,
    ...hasAmbitions,
    ...hasAchievements,
    ...hasActions,
    id: goal.id,
    title: goal.title,
    status: goal.status,
    uid: goal.people_assignedTo?.id || '',
    progress: goal.progress ?? 0,
    createdAt: goal.createdAt,
    updatedAt: goal.updatedAt,
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
      progress: relation.progress,
      createdAt: relation.createdAt,
      updatedAt: relation.updatedAt,
      uid: relation.people_assignedTo?.id || '',
      userName:
        `${relation.people_assignedTo?.name || ''} ${relation.people_assignedTo?.lastname || ''}`.trim() ||
        'Unassigned',
      avatarUrl: relation.people_assignedTo?.profileImageUrl
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
        goal_achievements: {
          select: {
            id: true,
            title: true,
            status: true,
            progress: true,
          },
        },
        goal_actions: {
          select: {
            id: true,
            title: true,
            status: true,
          },
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
    })) as unknown as GoalAmbitionsResponse | null
    return goal ? goalMapper(goal) : null
  }
}
