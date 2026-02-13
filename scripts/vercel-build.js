/**
 * Vercel build script
 * Runs migrations and seeds the database if empty (only in production)
 */
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
const isPrismaSource =
  process.env.USERS_SOURCE === 'prisma' || process.env.GOALS_SOURCE === 'prisma'

// Support multiple DATABASE_URL variable names (Vercel Prisma integration uses DB_ prefix)
function getDatabaseUrl() {
  return (
    process.env.DB_DATABASE_URL ||
    process.env.DATABASE_URL
  )
}

function getPrismaAccelerateUrl() {
  return (
    process.env.DB_PRISMA_DATABASE_URL ||
    process.env.PRISMA_DATABASE_URL
  )
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
    console.log('\n🔄 Running database migrations...')
    try {
      execSync('npx prisma migrate deploy', { stdio: 'inherit' })
      console.log('✅ Migrations applied successfully')
    } catch (error) {
      console.error('⚠️ Migration failed, continuing with build...', error.message)
    }

    // 3. Seed if database is empty
    console.log('\n🌱 Checking if database needs seeding...')
    const prisma = new PrismaClient()

    try {
      const userCount = await prisma.people.count()
      console.log(`   Found ${userCount} users in database`)

      if (userCount === 0) {
        console.log('   Database is empty, running seed...')
        execSync('npx prisma db seed', { stdio: 'inherit' })
        console.log('✅ Seed completed')
      } else {
        console.log('   Database already has data, skipping seed')
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
