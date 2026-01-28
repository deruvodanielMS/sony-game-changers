import { PrismaClient } from '@prisma/client'

const EMPLOYEE_EMAIL_BY_ROLE = {
  MANAGER: 'manager@employee.test',
  IC: 'ic@employee.test',
} as const

const GOAL_STATUSES = {
  COMPLETED: 'completed',
  DRAFT: 'draft',
  AWAITING_APPROVAL: 'awaiting_approval',
} as const

const GOAL_TYPES = {
  BUSINESS: 'business',
  PERSONAL_GROWTH_AND_DEVELOPMENT: 'personal_growth_and_development',
  MANAGER_EFFECTIVENESS: 'manager_effectiveness',
} as const

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
  // parent Goal For Manager, allowed to ladder
  const managerGoal = await prisma.goals.create({
    data: {
      title: 'Improve team performance',
      body: 'Increase efficiency and quality of delivery',
      type: GOAL_TYPES.MANAGER_EFFECTIVENESS,
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      progress: 50,
      assignedTo: ctx.managerId,
      createdBy: ctx.managerId,
      periodId: ctx.periodId,
    },
  })

  const managerSelfGoal = await prisma.goals.create({
    data: {
      title: 'Improve team delivery predictability',
      body: 'Ensure the team consistently meets commitments by improving planning and estimation',
      type: GOAL_TYPES.MANAGER_EFFECTIVENESS,
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      progress: 80,
      assignedTo: ctx.managerId,
      createdBy: ctx.managerId,
      periodId: ctx.periodId,
    },
  })

  // Child Goals
  const managerIcGoal = await prisma.goals.create({
    data: {
      title: 'Reduce bugs in production',
      body: 'Reduce critical incidents by 30%',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.DRAFT,
      progress: 0,
      assignedTo: ctx.ciId[1],
      createdBy: ctx.managerId,
      periodId: ctx.periodId,
      parentId: managerGoal.id,
    },
  })

  const icGoal = await prisma.goals.create({
    data: {
      title: 'Improve test coverage',
      body: 'Achieve 80% coverage on all services',
      type: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      status: GOAL_STATUSES.COMPLETED,
      progress: 100,
      parentId: managerGoal.id,
      assignedTo: ctx.ciId[0],
      createdBy: ctx.ciId[0],
      periodId: ctx.periodId,
    },
  })

  // Actions
  await prisma.goal_actions.createMany({
    data: [
      {
        title: 'Add a mandatory code review before merging any change',
        body: '',
        status: 'active',
        goalId: managerIcGoal.id,
      },
      {
        title: 'Fix the top recurring bugs first by reviewing recent production issues',
        body: '',
        status: 'active',
        goalId: managerIcGoal.id,
      },
      {
        title: 'Deploy smaller, more frequent changes instead of large releases',
        body: '',
        status: 'active',
        goalId: managerIcGoal.id,
      },
      {
        title: 'Write tests for every new feature before considering it done',
        body: '',
        status: 'active',
        goalId: icGoal.id,
      },
      {
        title: 'Add tests when fixing bugs to prevent regressions',
        body: '',
        status: 'active',
        goalId: icGoal.id,
      },
      {
        title: 'Track coverage in the CI pipeline and review it regularly',
        body: '',
        status: 'active',
        goalId: icGoal.id,
      },
      {
        title: 'Run regular sprint planning sessions with clear scope and priorities',
        body: '',
        status: 'active',
        goalId: managerSelfGoal.id,
      },
      {
        title: 'Break work into smaller, well-defined tasks to improve estimation accuracy',
        body: '',
        status: 'active',
        goalId: managerSelfGoal.id,
      },
      {
        title: 'Review past sprint results to adjust estimates and planning practices',
        body: '',
        status: 'active',
        goalId: managerSelfGoal.id,
      },
      {
        title: 'Enforce code reviews and quality checks before any production release',
        body: '',
        status: 'active',
        goalId: managerGoal.id,
      },
      {
        title: 'Prioritize bug fixes in planning sessions alongside new feature work',
        body: '',
        status: 'active',
        goalId: managerGoal.id,
      },
      {
        title: 'Review production incidents with the team to identify root causes and improvements',
        body: '',
        status: 'active',
        goalId: managerGoal.id,
      },
    ],
  })

  // Achievements
  await prisma.goal_achievements.createMany({
    data: [
      {
        title: 'Decreased production bugs by X% compared to the previous period',
        body: '',
        status: 'active',
        goalId: managerIcGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Reduced critical incidents by addressing the most frequent root causes',
        body: '',
        status: 'active',
        goalId: managerIcGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Improved release stability through smaller and safer deployments',
        body: '',
        status: 'active',
        goalId: managerIcGoal.id,
        progress: 'on-track',
      },
      {
        title: 'Increased automated test coverage across key modules',
        body: '',
        status: 'active',
        goalId: icGoal.id,
        progress: 'on-track',
      },
      {
        title: 'Added regression tests for previously untested critical paths',
        body: '',
        status: 'active',
        goalId: icGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Improved build reliability by catching issues earlier with tests',
        body: '',
        status: 'active',
        goalId: icGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Increased sprint commitment completion rate across the team',
        body: '',
        status: 'active',
        goalId: managerSelfGoal.id,
        progress: 'off-track',
      },
      {
        title: 'Reduced carry-over work between sprints',
        body: '',
        status: 'active',
        goalId: managerSelfGoal.id,
        progress: 'off-track',
      },
      {
        title: 'Improved accuracy of delivery estimates, leading to more reliable timelines',
        body: '',
        status: 'active',
        goalId: managerSelfGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Reduced the number of production bugs reported per release',
        body: '',
        status: 'active',
        goalId: managerGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Lowered severity of production incidents through better prevention',
        body: '',
        status: 'active',
        goalId: managerGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Improved overall product stability as reflected in fewer customer issuesnpx prisma',
        body: '',
        status: 'active',
        goalId: managerGoal.id,
        progress: 'on-track',
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
