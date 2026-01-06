import { prisma } from '@/lib/prisma'
import { GoalRepository } from '@/repositories/GoalRepository'
import { AmbitionGoalResponse, AmbitionUI } from '@/domain/ambition'

const ambitionMapper = (goal: AmbitionGoalResponse): AmbitionUI => {
  return {
    id: goal.id,
    title: goal.title,
    status: goal.status,
    userName:
      `${goal.people_assignedTo?.name || ''} ${goal.people_assignedTo?.lastname || ''}`.trim() ||
      'Unassigned',
    ambitionType: goal.type,
    description: goal.body,
    avatarUrl: goal.people_assignedTo?.profileImageUrl
      ? `/profile-img/${goal.people_assignedTo.profileImageUrl}`
      : null,
    ladderedGoals: (goal.goal_ambitions || []).map((ambition) => ({
      id: ambition.id,
      title: ambition.title,
      status: ambition.status,
      userName:
        `${goal.people_assignedTo?.name || ''} ${goal.people_assignedTo?.lastname || ''}`.trim() ||
        'Unassigned',
    })),
  }
}

export class PrismaGoalRepository implements GoalRepository {
  async findMany(): Promise<AmbitionUI[]> {
    const list = (await prisma.goals.findMany({
      orderBy: { createdBy: 'desc' },
      select: {
        id: true,
        title: true,
        body: true,
        type: true,
        status: true,
        people_assignedTo: {
          select: {
            name: true,
            lastname: true,
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
    })) as unknown as AmbitionGoalResponse[]
    return list.map(ambitionMapper)
  }

  async findById(id: string): Promise<AmbitionUI | null> {
    const ambition = (await prisma.goals.findUnique({
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
    })) as unknown as AmbitionGoalResponse | null
    return ambition ? ambitionMapper(ambition) : null
  }
}
