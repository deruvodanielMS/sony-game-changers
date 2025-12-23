import { prisma } from '@/lib/prisma'
import { GoalRepository } from '../GoalRepository'
import { Goal } from '@/domain/goal'

export class PrismaGoalRepository implements GoalRepository {
  findMany(): Promise<Goal[]> {
    return prisma.goals.findMany({
      orderBy: { createdBy: 'desc' },
    })
  }

  findById(id: number): Promise<Goal | null> {
    return prisma.goals.findUnique({
      where: { id },
    })
  }
}
