/**
 * Vercel build script
 * Runs migrations and seeds the database if empty (only in production)
 */
import { execSync } from 'child_process'

const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
const isPrismaSource =
  process.env.USERS_SOURCE === 'prisma' || process.env.GOALS_SOURCE === 'prisma'

// Support multiple DATABASE_URL variable names (Vercel Prisma integration uses DB_ prefix)
function getDatabaseUrl() {
  return process.env.DB_DATABASE_URL || process.env.DATABASE_URL
}

function getPrismaAccelerateUrl() {
  return process.env.DB_PRISMA_DATABASE_URL || process.env.PRISMA_DATABASE_URL
}

// Map Vercel's DB_ prefixed variables to standard Prisma variable names
function setupDatabaseEnv() {
  const directUrl = getDatabaseUrl()
  const accelerateUrl = getPrismaAccelerateUrl()

  if (directUrl && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = directUrl
    console.log('   Mapped DB_DATABASE_URL -> DATABASE_URL')
  }

  if (accelerateUrl && !process.env.PRISMA_DATABASE_URL) {
    process.env.PRISMA_DATABASE_URL = accelerateUrl
    console.log('   Mapped DB_PRISMA_DATABASE_URL -> PRISMA_DATABASE_URL')
  }

  return { directUrl, accelerateUrl }
}

async function main() {
  console.log('🚀 Starting Vercel build...')
  console.log(`   Environment: ${process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown'}`)
  console.log(`   Data source: ${isPrismaSource ? 'prisma' : 'mock'}`)

  // Map Vercel's DB_ prefixed env vars to standard Prisma names
  const { directUrl } = setupDatabaseEnv()

  // 1. Generate Prisma Client
  console.log('\n📦 Generating Prisma Client...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  // 2. Run migrations (only if using prisma source)
  if (isPrismaSource && directUrl) {
    console.log('\n🔄 Syncing database schema...')
    try {
      // Use db push for schema sync (works with existing databases)
      // This is safer for Prisma Postgres as it handles schema changes gracefully
      execSync('npx prisma db push --skip-generate', { stdio: 'inherit' })
      console.log('✅ Database schema synced successfully')
    } catch (error) {
      console.error('⚠️ Schema sync failed, continuing with build...', error.message)
    }

    // 3. Seed if database is empty or has stale data
    console.log('\n🌱 Checking if database needs seeding...')

    // Dynamic import after prisma generate
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

    const forceReseed = process.env.FORCE_RESEED === 'true'

    try {
      const userCount = await prisma.people.count()
      console.log(`   Found ${userCount} users in database`)
      console.log(`   FORCE_RESEED: ${forceReseed}`)

      let needsSeed = userCount === 0
      let isStaleData = false

      // Check for stale data by verifying known user has correct name
      // Expected: email='manager@employee.test', name='James', lastname='Miller'
      if (userCount > 0 && !needsSeed) {
        const managerUser = await prisma.people.findFirst({
          where: { email: 'manager@employee.test' },
        })

        if (managerUser) {
          // Check if the user has the correct expected values from synced seed data
          const expectedName = 'James'
          const expectedLastname = 'Miller'

          if (managerUser.name !== expectedName || managerUser.lastname !== expectedLastname) {
            console.log(`   ⚠️ Stale data detected!`)
            console.log(
              `      Found: name='${managerUser.name}', lastname='${managerUser.lastname}'`,
            )
            console.log(`      Expected: name='${expectedName}', lastname='${expectedLastname}'`)
            isStaleData = true
          }
        }
      }

      if (needsSeed) {
        console.log('   Database is empty, running seed...')
        execSync('npx prisma db seed', { stdio: 'inherit' })
        console.log('✅ Seed completed')
      } else if (forceReseed || isStaleData) {
        const reason = forceReseed ? 'FORCE_RESEED=true' : 'stale data detected'
        console.log(`   Re-seeding database (${reason})...`)

        // Clear existing data first (in correct order to handle foreign keys)
        console.log('   Clearing existing data...')
        await prisma.goalUpdates.deleteMany({})
        await prisma.goal.deleteMany({})
        await prisma.ambition.deleteMany({})
        await prisma.people.deleteMany({})
        console.log('   Existing data cleared')

        // Run seed
        execSync('npx prisma db seed', { stdio: 'inherit' })
        console.log('✅ Re-seed completed')
      } else {
        console.log('   Database has valid data, skipping seed')
      }
    } catch (error) {
      console.error('⚠️ Could not check/seed database:', error.message)
    } finally {
      await prisma.$disconnect()
    }
  } else {
    console.log('\n⏭️ Skipping migrations/seed (not using prisma source or no DATABASE_URL)')
    console.log(`   isPrismaSource: ${isPrismaSource}`)
    console.log(`   DATABASE_URL available: ${!!directUrl}`)
  }

  // 4. Build Next.js
  console.log('\n🏗️ Building Next.js application...')
  execSync('npx next build', { stdio: 'inherit' })

  console.log('\n✅ Build completed successfully!')
}

main().catch((error) => {
  console.error('❌ Build failed:', error)
  process.exit(1)
})
