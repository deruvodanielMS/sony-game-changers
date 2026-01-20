import { EMPLOYEE_EMAIL_BY_ROLE } from '@/common/constants'
import { AMBITION_STATUSES, AMBITION_TYPES } from '@/domain/ambition'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedBase(prisma: PrismaClient) {
  // Organization
  const org = await prisma.organization.create({
    data: {
      code: 'ORG-ROOT',
      path: 'ORG-ROOT',
    },
  })

  // Job
  const job = await prisma.jobs.create({
    data: {
      name: 'Software Engineer',
      code: 'SE',
      level: 3,
      orgId: org.id,
    },
  })

  // People
  const sarahMiller = await prisma.people.create({
    data: {
      email: 'smiller@test.com',
      name: 'Sarah Miller',
      lastname: 'User',
      status: 'active',
      profileImageUrl: 'sarah-miller.png',
      orgId: org.id,
      jobId: job.id,
    },
  })

  const davidBrown = await prisma.people.create({
    data: {
      email: EMPLOYEE_EMAIL_BY_ROLE.IC,
      name: 'David Brown',
      lastname: 'User',
      status: 'active',
      profileImageUrl: 'lars-van-der-zee.png',
      orgId: org.id,
      jobId: job.id,
    },
  })

  const manager = await prisma.people.create({
    data: {
      email: EMPLOYEE_EMAIL_BY_ROLE.MANAGER,
      name: 'Manager',
      lastname: 'User',
      profileImageUrl: 'profile.png',
      status: 'active',
      orgId: org.id,
      jobId: job.id,
    },
  })

  // Performance period
  const period = await prisma.performance_periods.create({
    data: {
      name: 'H1 2025',
      fiscalYear: 2025,
      start: new Date('2025-01-01'),
      end: new Date('2025-06-30'),
      active: true,
    },
  })

  return {
    org,
    job,
    sarahMiller,
    davidBrown,
    manager,
    period,
  }
}

type SeedContext = {
  ciId: string[]
  managerId: string
  periodId: string
}

async function seedDemo(prisma: PrismaClient, ctx: SeedContext) {
  // Goal padre
  const mainGoal = await prisma.goals.create({
    data: {
      title: 'Mejorar performance del equipo',
      body: 'Incrementar eficiencia y calidad del delivery',
      type: AMBITION_TYPES.MANAGER_EFFECTIVENESS,
      status: AMBITION_STATUSES.AWAITING_APPROVAL,
      assignedTo: ctx.ciId[0],
      createdBy: ctx.managerId,
      periodId: ctx.periodId,
    },
  })

  // Goals hijos
  const childGoal1 = await prisma.goals.create({
    data: {
      title: 'Reducir bugs en producción',
      body: 'Bajar incidentes críticos un 30%',
      type: AMBITION_TYPES.BUSINESS,
      status: AMBITION_STATUSES.DRAFT,
      parentId: mainGoal.id,
      assignedTo: ctx.ciId[1],
      createdBy: ctx.managerId,
      periodId: ctx.periodId,
    },
  })

  const childGoal2 = await prisma.goals.create({
    data: {
      title: 'Mejorar cobertura de tests',
      body: 'Alcanzar 80% de coverage',
      type: AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      status: AMBITION_STATUSES.COMPLETED,
      parentId: mainGoal.id,
      assignedTo: ctx.managerId,
      createdBy: ctx.ciId[0],
      periodId: ctx.periodId,
    },
  })

  // Ambitions
  await prisma.goal_ambitions.createMany({
    data: [
      {
        title: 'Adoptar mejores prácticas',
        body: 'Definir estándares de calidad',
        status: AMBITION_STATUSES.AWAITING_APPROVAL,
        goalId: mainGoal.id,
      },
    ],
  })

  // Actions
  await prisma.goal_actions.createMany({
    data: [
      {
        title: 'Agregar pipeline de CI',
        body: 'Automatizar tests y lint',
        status: 'active',
        goalId: childGoal2.id,
      },
    ],
  })

  // Achievements
  await prisma.goal_achievements.createMany({
    data: [
      {
        title: 'Primer release estable',
        body: 'Release sin hotfixes',
        status: 'done',
        goalId: childGoal1.id,
      },
    ],
  })
}

async function main() {
  console.log('🌱 Seeding database...')

  const base = await seedBase(prisma)

  await seedDemo(prisma, {
    ciId: [base.sarahMiller.id, base.davidBrown.id],
    managerId: base.manager.id,
    periodId: base.period.id,
  })

  console.log('✅ Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
