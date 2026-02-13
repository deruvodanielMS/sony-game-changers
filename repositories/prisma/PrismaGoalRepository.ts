import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { GoalRepository } from '@/repositories/GoalRepository'
import { getProfileImageUrl, getProfileImageUrlOrNull } from '@/utils/profileImage'
import {
  ACHIEVEMENT_PROGRESS_STATUSES,
  CreateGoalDTO,
  UpdateGoalDTO,
  GOAL_STATUSES,
  GOAL_TYPES,
  GoalAmbitionsResponse,
  GoalUI,
  ManagerAmbitionsData,
  GoalFiltersData,
  GoalStatus,
} from '@/domain/goal'

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
    avatarUrl: getProfileImageUrlOrNull(goal.people_assignedTo?.profileImageUrl),
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
      avatarUrl: getProfileImageUrlOrNull(relation.people_assignedTo?.profileImageUrl),
    })),
  }
}

export class PrismaGoalRepository implements GoalRepository {
  async findGoals(email?: string): Promise<GoalUI[]> {
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
      orderBy: {
        createdAt: 'desc',
      },
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

  async findGoalById(id: string): Promise<GoalUI | null> {
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

  async createGoal(goal: CreateGoalDTO): Promise<GoalUI> {
    const data: Prisma.goalsCreateInput = {
      title: goal.title,
      body: goal.description ?? '',
      type: goal.goalType as string,
      status: goal.status as string,
      progress: goal.progress ?? 0,
      people_assignedTo: { connect: { id: goal.assignedTo } },
      people_createdBy: { connect: { id: goal.createdBy } },
      performance_periods: { connect: { id: goal.periodId } },
      ...(!!goal.parentId ? { parent: { connect: { id: goal.parentId } } } : {}),
      ...(goal.goalAchievements.length > 0
        ? {
            goal_achievements: {
              create: goal.goalAchievements.map((a) => ({
                title: a.title,
                body: a.body ?? '',
                status: a.status ?? GOAL_STATUSES.DRAFT,
                progress: a.progress ?? ACHIEVEMENT_PROGRESS_STATUSES.NOT_STARTED,
              })),
            },
          }
        : {}),
      ...(goal.goalActions.length > 0
        ? {
            goal_actions: {
              create: goal.goalActions.map((a) => ({
                title: a.title,
                body: a.body ?? '',
                status: a.status ?? GOAL_STATUSES.DRAFT,
              })),
            },
          }
        : {}),
    }

    const createdGoal = (await prisma.goals.create({
      data,
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
    })) as unknown as GoalAmbitionsResponse
    return goalMapper(createdGoal)
  }

  async updateGoal(id: string, goal: UpdateGoalDTO): Promise<GoalUI> {
    const data: Prisma.goalsUpdateInput = {
      ...(goal.title !== undefined && { title: goal.title }),
      ...(goal.description !== undefined && { body: goal.description }),
      ...(goal.goalType !== undefined && { type: goal.goalType as string }),
      ...(goal.status !== undefined && { status: goal.status as string }),
      ...(goal.progress !== undefined && { progress: goal.progress }),
      ...(goal.parentId !== undefined
        ? goal.parentId
          ? { parent: { connect: { id: goal.parentId } } }
          : { parent: { disconnect: true } }
        : {}),
      ...(goal.goalAchievements !== undefined && {
        goal_achievements: {
          deleteMany: {},
          create: goal.goalAchievements.map((a) => ({
            title: a.title,
            body: a.body ?? '',
            status: a.status ?? GOAL_STATUSES.DRAFT,
            progress: a.progress ?? ACHIEVEMENT_PROGRESS_STATUSES.NOT_STARTED,
          })),
        },
      }),
      ...(goal.goalActions !== undefined && {
        goal_actions: {
          deleteMany: {},
          create: goal.goalActions.map((a) => ({
            title: a.title,
            body: a.body ?? '',
            status: a.status ?? GOAL_STATUSES.DRAFT,
          })),
        },
      }),
      updatedAt: new Date(),
    }

    const updatedGoal = (await prisma.goals.update({
      where: { id },
      data,
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
    })) as unknown as GoalAmbitionsResponse

    return goalMapper(updatedGoal)
  }

  async deleteGoal(id: string): Promise<void> {
    await prisma.$transaction([
      prisma.goal_achievements.deleteMany({ where: { goalId: id } }),
      prisma.goal_actions.deleteMany({ where: { goalId: id } }),
      prisma.goals.delete({ where: { id } }),
    ])
  }

  async getManagerAmbitions(_email?: string): Promise<ManagerAmbitionsData | null> {
    // TODO: Implement real logic to fetch manager's ambitions
    // This would query goals created by the user's manager
    return null
  }

  async getGoalFilters(): Promise<GoalFiltersData> {
    // Fetch all active users from database for avatar selector
    const users = await prisma.people.findMany({
      where: { status: 'active' },
      select: {
        id: true,
        name: true,
        lastname: true,
        profileImageUrl: true,
        jobs: {
          select: { name: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    // Fetch active performance period
    const activePeriod = await prisma.performance_periods.findFirst({
      where: { active: true },
      select: { id: true },
    })

    const avatarOptions = users.map((user) => ({
      uid: user.id,
      name: `${user.name} ${user.lastname}`.trim(),
      url: getProfileImageUrl(user.profileImageUrl),
      role: user.jobs?.name || 'Employee',
    }))

    return {
      avatarSelector: {
        options: avatarOptions,
        showItems: 4,
      },
      filters: [
        {
          label: 'Status',
          'data-testid': 'filter-status',
          options: [
            { label: 'Draft', value: GOAL_STATUSES.DRAFT },
            { label: 'Awaiting Approval', value: GOAL_STATUSES.AWAITING_APPROVAL },
            { label: 'In Progress', value: GOAL_STATUSES.APPROVED },
            { label: 'Completed', value: GOAL_STATUSES.COMPLETED },
            { label: 'Archived', value: GOAL_STATUSES.ARCHIVED },
          ],
          single: true,
        },
        {
          label: 'Type',
          'data-testid': 'filter-category',
          options: [
            { label: 'Business', value: GOAL_TYPES.BUSINESS },
            { label: 'Manager effectiveness', value: GOAL_TYPES.MANAGER_EFFECTIVENESS },
            {
              label: 'Personal growth and development',
              value: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
            },
          ],
          single: true,
        },
      ],
      activePeriodId: activePeriod?.id || null,
    }
  }

  async updateGoalStatus(id: string, status: GoalStatus): Promise<GoalUI> {
    const updatedGoal = (await prisma.goals.update({
      where: { id },
      data: {
        status: status as string,
        updatedAt: new Date(),
      },
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
    })) as unknown as GoalAmbitionsResponse

    return goalMapper(updatedGoal)
  }
}
