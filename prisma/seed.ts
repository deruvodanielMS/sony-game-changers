import { PrismaClient } from '@prisma/client'

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
  const admin = await prisma.people.create({
    data: {
      email: 'admin@test.com',
      name: 'Admin',
      lastname: 'User',
      status: 'active',
      orgId: org.id,
      jobId: job.id,
    },
  })

  const manager = await prisma.people.create({
    data: {
      email: 'manager@test.com',
      name: 'Manager',
      lastname: 'User',
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
    admin,
    manager,
    period,
  }
}

type SeedContext = {
  adminId: number
  managerId: number
  periodId: number
}

async function seedDemo(prisma: PrismaClient, ctx: SeedContext) {
  // Goal padre
  const mainGoal = await prisma.goals.create({
    data: {
      title: 'Mejorar performance del equipo',
      body: 'Incrementar eficiencia y calidad del delivery',
      type: 'team',
      status: 'active',
      assignedTo: ctx.managerId,
      createdBy: ctx.adminId,
      periodId: ctx.periodId,
    },
  })

  // Goals hijos
  const childGoal1 = await prisma.goals.create({
    data: {
      title: 'Reducir bugs en producción',
      body: 'Bajar incidentes críticos un 30%',
      type: 'team',
      status: 'active',
      parentId: mainGoal.id,
      assignedTo: ctx.managerId,
      createdBy: ctx.adminId,
      periodId: ctx.periodId,
    },
  })

  const childGoal2 = await prisma.goals.create({
    data: {
      title: 'Mejorar cobertura de tests',
      body: 'Alcanzar 80% de coverage',
      type: 'individual',
      status: 'draft',
      parentId: mainGoal.id,
      assignedTo: ctx.adminId,
      createdBy: ctx.managerId,
      periodId: ctx.periodId,
    },
  })

  // Ambitions
  await prisma.goal_ambitions.createMany({
    data: [
      {
        title: 'Adoptar mejores prácticas',
        body: 'Definir estándares de calidad',
        status: 'active',
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

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const base = await seedBase(prisma)

  await seedDemo(prisma, {
    adminId: base.admin.id,
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
