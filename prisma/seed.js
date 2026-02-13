import { PrismaClient } from '@prisma/client'

/**
 * Seed data that matches repositories/mocks/data/users.ts and filters.ts
 * This ensures consistency between local development (mock) and production (prisma)
 */

const EMAILS = {
  MANAGER: 'manager@employee.test',
  IC: 'ic@employee.test',
  DAVID: 'david.brown@employee.test',
  NIA: 'nia.washington@employee.test',
  KYLIE: 'kylie.davies@employee.test',
}

const GOAL_STATUSES = {
  COMPLETED: 'completed',
  DRAFT: 'draft',
  AWAITING_APPROVAL: 'awaiting_approval',
  APPROVED: 'approved',
  ARCHIVED: 'archived',
}

const GOAL_TYPES = {
  BUSINESS: 'business',
  PERSONAL_GROWTH_AND_DEVELOPMENT: 'personal_growth_and_development',
  MANAGER_EFFECTIVENESS: 'manager_effectiveness',
}

const prisma = new PrismaClient()

async function seedBase(prisma) {
  console.log('   Creating organization...')
  const org = await prisma.organization.create({
    data: {
      code: 'ORG-ROOT',
      path: 'ORG-ROOT',
    },
  })

  console.log('   Creating jobs...')
  const jobManager = await prisma.jobs.create({
    data: { name: 'Manager', code: 'MGR', level: 4, orgId: org.id },
  })
  const jobSeniorEngineer = await prisma.jobs.create({
    data: { name: 'Senior Engineer', code: 'SE', level: 3, orgId: org.id },
  })
  const jobTechLead = await prisma.jobs.create({
    data: { name: 'Tech Lead', code: 'TL', level: 3, orgId: org.id },
  })
  const jobSeniorSWE = await prisma.jobs.create({
    data: { name: 'Senior Software Engineer', code: 'SSE', level: 3, orgId: org.id },
  })
  const jobPM = await prisma.jobs.create({
    data: { name: 'Product Manager', code: 'PM', level: 3, orgId: org.id },
  })

  console.log('   Creating users (matching mockDB)...')

  // user-1: James Miller (Manager) - manager@employee.test
  // This is the team manager, no managerId (top of hierarchy)
  const jamesMiller = await prisma.people.create({
    data: {
      email: EMAILS.MANAGER,
      name: 'James',
      lastname: 'Miller',
      status: 'active',
      profileImageUrl: '/profile-img/profile.png',
      employeeId: 'E001',
      orgId: org.id,
      jobId: jobManager.id,
      // No managerId - James is the top manager
    },
  })

  // user-2: Sarah Miller (Senior Engineer) - ic@employee.test
  // Reports to James Miller
  const sarahMiller = await prisma.people.create({
    data: {
      email: EMAILS.IC,
      name: 'Sarah',
      lastname: 'Miller',
      status: 'active',
      profileImageUrl: '/profile-img/sarah-miller.png',
      employeeId: 'E002',
      orgId: org.id,
      jobId: jobSeniorEngineer.id,
      managerId: jamesMiller.id, // Reports to James
    },
  })

  // user-3: David Brown (Tech Lead) - david.brown@employee.test
  // Reports to James Miller
  const davidBrown = await prisma.people.create({
    data: {
      email: EMAILS.DAVID,
      name: 'David',
      lastname: 'Brown',
      status: 'active',
      profileImageUrl: '/profile-img/lars-van-der-zee.png',
      employeeId: 'E003',
      orgId: org.id,
      jobId: jobTechLead.id,
      managerId: jamesMiller.id, // Reports to James
    },
  })

  // user-4: Nia Washington (Senior Software Engineer) - nia.washington@employee.test
  // Reports to James Miller
  const niaWashington = await prisma.people.create({
    data: {
      email: EMAILS.NIA,
      name: 'Nia',
      lastname: 'Washington',
      status: 'active',
      profileImageUrl: '/profile-img/nia-washington.png',
      employeeId: 'E004',
      orgId: org.id,
      jobId: jobSeniorSWE.id,
      managerId: jamesMiller.id, // Reports to James
    },
  })

  // user-5: Kylie Davies (Product Manager) - kylie.davies@employee.test
  // Reports to James Miller
  const kylieDavies = await prisma.people.create({
    data: {
      email: EMAILS.KYLIE,
      name: 'Kylie',
      lastname: 'Davies',
      status: 'active',
      profileImageUrl: '/profile-img/kylie-davies.png',
      employeeId: 'E005',
      orgId: org.id,
      jobId: jobPM.id,
      managerId: jamesMiller.id, // Reports to James
    },
  })

  console.log('   Creating performance period...')
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
    users: {
      jamesMiller, // Manager
      sarahMiller, // IC (Senior Engineer)
      davidBrown, // Tech Lead
      niaWashington, // Senior SWE
      kylieDavies, // PM
    },
    period,
  }
}

async function seedDemo(prisma, ctx) {
  console.log('   Creating demo goals...')

  // =====================================================
  // PARENT GOALS (Top-level, no parentId)
  // =====================================================

  // Parent Goal 1: Manager's strategic goal (Business)
  const strategicGoal = await prisma.goals.create({
    data: {
      title: 'Deliver all Q1 milestones on time with high quality',
      body: 'Ensure the team delivers all committed features for Q1 while maintaining code quality standards',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.APPROVED,
      progress: 60,
      assignedTo: ctx.users.jamesMiller.id,
      createdBy: ctx.users.jamesMiller.id,
      periodId: ctx.periodId,
    },
  })

  // Parent Goal 2: Manager effectiveness goal
  const managerEffectivenessGoal = await prisma.goals.create({
    data: {
      title: 'Improve team collaboration and communication',
      body: 'Foster better teamwork through improved processes and regular feedback sessions',
      type: GOAL_TYPES.MANAGER_EFFECTIVENESS,
      status: GOAL_STATUSES.APPROVED,
      progress: 40,
      assignedTo: ctx.users.jamesMiller.id,
      createdBy: ctx.users.jamesMiller.id,
      periodId: ctx.periodId,
    },
  })

  // =====================================================
  // CHILD GOALS (With parentId - laddered to parent goals)
  // =====================================================

  // Child of strategicGoal - assigned to Sarah (IC)
  const sarahBusinessGoal = await prisma.goals.create({
    data: {
      title: 'Implement new authentication system',
      body: 'Build and deploy the new OAuth2-based authentication system',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      progress: 30,
      parentId: strategicGoal.id, // <-- Laddered to strategic goal
      assignedTo: ctx.users.sarahMiller.id,
      createdBy: ctx.users.sarahMiller.id,
      periodId: ctx.periodId,
    },
  })

  // Child of strategicGoal - assigned to David
  const davidBusinessGoal = await prisma.goals.create({
    data: {
      title: 'Reduce API response times by 40%',
      body: 'Optimize database queries and implement caching to improve API performance',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.APPROVED,
      progress: 75,
      parentId: strategicGoal.id, // <-- Laddered to strategic goal
      assignedTo: ctx.users.davidBrown.id,
      createdBy: ctx.users.davidBrown.id,
      periodId: ctx.periodId,
    },
  })

  // Child of managerEffectivenessGoal - assigned to Nia
  const niaCollabGoal = await prisma.goals.create({
    data: {
      title: 'Lead weekly knowledge sharing sessions',
      body: 'Organize and lead technical presentations to share expertise across the team',
      type: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      status: GOAL_STATUSES.DRAFT,
      progress: 0,
      parentId: managerEffectivenessGoal.id, // <-- Laddered to manager effectiveness goal
      assignedTo: ctx.users.niaWashington.id,
      createdBy: ctx.users.niaWashington.id,
      periodId: ctx.periodId,
    },
  })

  // =====================================================
  // STANDALONE GOALS (No parent - top level)
  // =====================================================

  // Sarah's personal growth goal (no parent)
  const sarahGrowthGoal = await prisma.goals.create({
    data: {
      title: 'Obtain AWS Solutions Architect certification',
      body: 'Complete training and pass the AWS certification exam',
      type: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      status: GOAL_STATUSES.APPROVED,
      progress: 50,
      assignedTo: ctx.users.sarahMiller.id,
      createdBy: ctx.users.sarahMiller.id,
      periodId: ctx.periodId,
    },
  })

  // Kylie's business goal (no parent)
  const kylieGoal = await prisma.goals.create({
    data: {
      title: 'Launch new product feature by end of Q1',
      body: 'Coordinate with engineering and design to ship the analytics dashboard',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      progress: 20,
      assignedTo: ctx.users.kylieDavies.id,
      createdBy: ctx.users.kylieDavies.id,
      periodId: ctx.periodId,
    },
  })

  // Archived goal example
  const archivedGoal = await prisma.goals.create({
    data: {
      title: 'Legacy system migration (Archived)',
      body: 'This goal was archived as priorities changed',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.ARCHIVED,
      progress: 10,
      assignedTo: ctx.users.davidBrown.id,
      createdBy: ctx.users.davidBrown.id,
      periodId: ctx.periodId,
    },
  })

  console.log('   Creating goal actions...')
  await prisma.goal_actions.createMany({
    data: [
      // Sarah's business goal actions
      {
        title: 'Design OAuth2 flow and token management',
        body: '',
        status: 'active',
        goalId: sarahBusinessGoal.id,
      },
      {
        title: 'Implement login/logout endpoints',
        body: '',
        status: 'active',
        goalId: sarahBusinessGoal.id,
      },
      {
        title: 'Add session management and refresh tokens',
        body: '',
        status: 'active',
        goalId: sarahBusinessGoal.id,
      },
      // David's business goal actions
      {
        title: 'Profile and identify slow database queries',
        body: '',
        status: 'active',
        goalId: davidBusinessGoal.id,
      },
      {
        title: 'Implement Redis caching layer',
        body: '',
        status: 'active',
        goalId: davidBusinessGoal.id,
      },
      {
        title: 'Add query optimization indexes',
        body: '',
        status: 'active',
        goalId: davidBusinessGoal.id,
      },
      // Nia's collaboration goal actions
      {
        title: 'Prepare presentation materials',
        body: '',
        status: 'active',
        goalId: niaCollabGoal.id,
      },
      {
        title: 'Schedule recurring meeting slots',
        body: '',
        status: 'active',
        goalId: niaCollabGoal.id,
      },
      {
        title: 'Collect feedback after each session',
        body: '',
        status: 'active',
        goalId: niaCollabGoal.id,
      },
      // Sarah's growth goal actions
      {
        title: 'Complete AWS training course',
        body: '',
        status: 'active',
        goalId: sarahGrowthGoal.id,
      },
      {
        title: 'Practice with sample exams',
        body: '',
        status: 'active',
        goalId: sarahGrowthGoal.id,
      },
      {
        title: 'Schedule and take certification exam',
        body: '',
        status: 'active',
        goalId: sarahGrowthGoal.id,
      },
      // Strategic goal actions
      {
        title: 'Define clear sprint goals aligned with Q1 milestones',
        body: '',
        status: 'active',
        goalId: strategicGoal.id,
      },
      {
        title: 'Monitor progress weekly and address blockers',
        body: '',
        status: 'active',
        goalId: strategicGoal.id,
      },
      {
        title: 'Ensure code review standards are maintained',
        body: '',
        status: 'active',
        goalId: strategicGoal.id,
      },
    ],
  })

  console.log('   Creating goal achievements...')
  await prisma.goal_achievements.createMany({
    data: [
      // Sarah's business goal achievements
      {
        title: 'Authentication system deployed to staging',
        body: '',
        status: 'active',
        goalId: sarahBusinessGoal.id,
        progress: 'on-track',
      },
      {
        title: 'All security requirements met and verified',
        body: '',
        status: 'active',
        goalId: sarahBusinessGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Production rollout completed successfully',
        body: '',
        status: 'active',
        goalId: sarahBusinessGoal.id,
        progress: 'not-started',
      },
      // David's business goal achievements
      {
        title: 'API response time reduced by 20%',
        body: '',
        status: 'active',
        goalId: davidBusinessGoal.id,
        progress: 'on-track',
      },
      {
        title: 'Cache hit rate above 80%',
        body: '',
        status: 'active',
        goalId: davidBusinessGoal.id,
        progress: 'on-track',
      },
      {
        title: 'Zero performance regressions in monitoring',
        body: '',
        status: 'active',
        goalId: davidBusinessGoal.id,
        progress: 'not-started',
      },
      // Nia's collaboration goal achievements
      {
        title: 'Conducted at least 4 knowledge sharing sessions',
        body: '',
        status: 'active',
        goalId: niaCollabGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Average feedback score above 4/5',
        body: '',
        status: 'active',
        goalId: niaCollabGoal.id,
        progress: 'not-started',
      },
      {
        title: 'Documentation created for shared topics',
        body: '',
        status: 'active',
        goalId: niaCollabGoal.id,
        progress: 'not-started',
      },
      // Sarah's growth goal achievements
      {
        title: 'Training course completed',
        body: '',
        status: 'active',
        goalId: sarahGrowthGoal.id,
        progress: 'on-track',
      },
      {
        title: 'Practice exam score above 80%',
        body: '',
        status: 'active',
        goalId: sarahGrowthGoal.id,
        progress: 'not-started',
      },
      {
        title: 'AWS certification obtained',
        body: '',
        status: 'active',
        goalId: sarahGrowthGoal.id,
        progress: 'not-started',
      },
      // Strategic goal achievements
      {
        title: 'All Q1 features delivered on schedule',
        body: '',
        status: 'active',
        goalId: strategicGoal.id,
        progress: 'on-track',
      },
      {
        title: 'Code quality metrics maintained above threshold',
        body: '',
        status: 'active',
        goalId: strategicGoal.id,
        progress: 'on-track',
      },
      {
        title: 'No critical bugs in production releases',
        body: '',
        status: 'active',
        goalId: strategicGoal.id,
        progress: 'off-track',
      },
    ],
  })
}

async function main() {
  console.log('🌱 Seeding database...')
  console.log('   (Data matches repositories/mocks/data/users.ts)')

  const base = await seedBase(prisma)

  await seedDemo(prisma, {
    users: base.users,
    periodId: base.period.id,
  })

  console.log('')
  console.log('✅ Seed completed!')
  console.log('   Users created:')
  console.log('   - manager@employee.test (James Miller - Manager)')
  console.log('   - ic@employee.test (Sarah Miller - Senior Engineer)')
  console.log('   - david.brown@employee.test (David Brown - Tech Lead)')
  console.log('   - nia.washington@employee.test (Nia Washington - Senior SWE)')
  console.log('   - kylie.davies@employee.test (Kylie Davies - Product Manager)')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
