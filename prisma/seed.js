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
    },
  })

  // user-2: Sarah Miller (Senior Engineer) - ic@employee.test
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
    },
  })

  // user-3: David Brown (Tech Lead) - david.brown@employee.test
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
    },
  })

  // user-4: Nia Washington (Senior Software Engineer) - nia.washington@employee.test
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
    },
  })

  // user-5: Kylie Davies (Product Manager) - kylie.davies@employee.test
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
      jamesMiller,  // Manager
      sarahMiller,  // IC (Senior Engineer)
      davidBrown,   // Tech Lead
      niaWashington, // Senior SWE
      kylieDavies,   // PM
    },
    period,
  }
}

async function seedDemo(prisma, ctx) {
  console.log('   Creating demo goals...')
  
  // Manager's goal (can be laddered to)
  const managerGoal = await prisma.goals.create({
    data: {
      title: 'Improve team performance',
      body: 'Increase efficiency and quality of delivery',
      type: GOAL_TYPES.MANAGER_EFFECTIVENESS,
      status: GOAL_STATUSES.AWAITING_APPROVAL,
      progress: 50,
      assignedTo: ctx.users.jamesMiller.id,
      createdBy: ctx.users.jamesMiller.id,
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
      assignedTo: ctx.users.jamesMiller.id,
      createdBy: ctx.users.jamesMiller.id,
      periodId: ctx.periodId,
    },
  })

  // IC Goals (laddered to manager)
  const davidGoal = await prisma.goals.create({
    data: {
      title: 'Reduce bugs in production',
      body: 'Reduce critical incidents by 30%',
      type: GOAL_TYPES.BUSINESS,
      status: GOAL_STATUSES.DRAFT,
      progress: 0,
      assignedTo: ctx.users.davidBrown.id,
      createdBy: ctx.users.jamesMiller.id,
      periodId: ctx.periodId,
      parentId: managerGoal.id,
    },
  })

  const sarahGoal = await prisma.goals.create({
    data: {
      title: 'Improve test coverage',
      body: 'Achieve 80% coverage on all services',
      type: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
      status: GOAL_STATUSES.COMPLETED,
      progress: 100,
      parentId: managerGoal.id,
      assignedTo: ctx.users.sarahMiller.id,
      createdBy: ctx.users.sarahMiller.id,
      periodId: ctx.periodId,
    },
  })

  console.log('   Creating goal actions...')
  await prisma.goal_actions.createMany({
    data: [
      // David's goal actions
      { title: 'Add a mandatory code review before merging any change', body: '', status: 'active', goalId: davidGoal.id },
      { title: 'Fix the top recurring bugs first by reviewing recent production issues', body: '', status: 'active', goalId: davidGoal.id },
      { title: 'Deploy smaller, more frequent changes instead of large releases', body: '', status: 'active', goalId: davidGoal.id },
      // Sarah's goal actions
      { title: 'Write tests for every new feature before considering it done', body: '', status: 'active', goalId: sarahGoal.id },
      { title: 'Add tests when fixing bugs to prevent regressions', body: '', status: 'active', goalId: sarahGoal.id },
      { title: 'Track coverage in the CI pipeline and review it regularly', body: '', status: 'active', goalId: sarahGoal.id },
      // Manager self goal actions
      { title: 'Run regular sprint planning sessions with clear scope and priorities', body: '', status: 'active', goalId: managerSelfGoal.id },
      { title: 'Break work into smaller, well-defined tasks to improve estimation accuracy', body: '', status: 'active', goalId: managerSelfGoal.id },
      { title: 'Review past sprint results to adjust estimates and planning practices', body: '', status: 'active', goalId: managerSelfGoal.id },
      // Manager goal actions
      { title: 'Enforce code reviews and quality checks before any production release', body: '', status: 'active', goalId: managerGoal.id },
      { title: 'Prioritize bug fixes in planning sessions alongside new feature work', body: '', status: 'active', goalId: managerGoal.id },
      { title: 'Review production incidents with the team to identify root causes and improvements', body: '', status: 'active', goalId: managerGoal.id },
    ],
  })

  console.log('   Creating goal achievements...')
  await prisma.goal_achievements.createMany({
    data: [
      // David's goal achievements
      { title: 'Decreased production bugs by X% compared to the previous period', body: '', status: 'active', goalId: davidGoal.id, progress: 'not-started' },
      { title: 'Reduced critical incidents by addressing the most frequent root causes', body: '', status: 'active', goalId: davidGoal.id, progress: 'not-started' },
      { title: 'Improved release stability through smaller and safer deployments', body: '', status: 'active', goalId: davidGoal.id, progress: 'on-track' },
      // Sarah's goal achievements
      { title: 'Increased automated test coverage across key modules', body: '', status: 'active', goalId: sarahGoal.id, progress: 'on-track' },
      { title: 'Added regression tests for previously untested critical paths', body: '', status: 'active', goalId: sarahGoal.id, progress: 'not-started' },
      { title: 'Improved build reliability by catching issues earlier with tests', body: '', status: 'active', goalId: sarahGoal.id, progress: 'not-started' },
      // Manager self goal achievements
      { title: 'Increased sprint commitment completion rate across the team', body: '', status: 'active', goalId: managerSelfGoal.id, progress: 'off-track' },
      { title: 'Reduced carry-over work between sprints', body: '', status: 'active', goalId: managerSelfGoal.id, progress: 'off-track' },
      { title: 'Improved accuracy of delivery estimates, leading to more reliable timelines', body: '', status: 'active', goalId: managerSelfGoal.id, progress: 'not-started' },
      // Manager goal achievements
      { title: 'Reduced the number of production bugs reported per release', body: '', status: 'active', goalId: managerGoal.id, progress: 'not-started' },
      { title: 'Lowered severity of production incidents through better prevention', body: '', status: 'active', goalId: managerGoal.id, progress: 'not-started' },
      { title: 'Improved overall product stability as reflected in fewer customer issues', body: '', status: 'active', goalId: managerGoal.id, progress: 'on-track' },
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
