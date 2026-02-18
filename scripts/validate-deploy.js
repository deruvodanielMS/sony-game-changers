/**
 * Pre-deployment validation script
 * Run before pushing to catch common issues
 * 
 * Usage: node scripts/validate-deploy.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const errors = []
const warnings = []

function checkFile(filePath, description) {
  if (!fs.existsSync(path.join(rootDir, filePath))) {
    errors.push(`Missing ${description}: ${filePath}`)
    return false
  }
  return true
}

function checkEnvVar(content, varName, file) {
  if (!content.includes(varName)) {
    warnings.push(`${file} doesn't reference ${varName}`)
  }
}

console.log('🔍 Running pre-deployment validation...\n')

// 1. Check required files exist
console.log('📁 Checking required files...')
checkFile('prisma/schema.prisma', 'Prisma schema')
checkFile('prisma/seed.js', 'Database seed script')
checkFile('prisma/migrations/migration_lock.toml', 'Migration lock')
checkFile('scripts/vercel-build.js', 'Vercel build script')
checkFile('vercel.json', 'Vercel config')

// 2. Check migration lock is PostgreSQL
console.log('🗄️  Checking database provider...')
const lockPath = path.join(rootDir, 'prisma/migrations/migration_lock.toml')
if (fs.existsSync(lockPath)) {
  const lockContent = fs.readFileSync(lockPath, 'utf-8')
  if (lockContent.includes('sqlite')) {
    errors.push('migration_lock.toml is set to SQLite but should be PostgreSQL')
  } else if (lockContent.includes('postgresql')) {
    console.log('   ✅ Provider is PostgreSQL')
  }
}

// 3. Check vercel.json has correct build command
console.log('⚙️  Checking Vercel config...')
const vercelPath = path.join(rootDir, 'vercel.json')
if (fs.existsSync(vercelPath)) {
  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'))
  if (vercelConfig.buildCommand !== 'npm run build:vercel') {
    errors.push('vercel.json buildCommand should be "npm run build:vercel"')
  } else {
    console.log('   ✅ Build command is correct')
  }
}

// 4. Check seed.js has all expected users
console.log('👥 Checking seed data consistency...')
const seedPath = path.join(rootDir, 'prisma/seed.js')
if (fs.existsSync(seedPath)) {
  const seedContent = fs.readFileSync(seedPath, 'utf-8')
  const expectedEmails = [
    'manager@employee.test',
    'ic@employee.test',
    'david.brown@employee.test',
    'nia.washington@employee.test',
    'kylie.davies@employee.test',
  ]
  
  const missingEmails = expectedEmails.filter(email => !seedContent.includes(email))
  if (missingEmails.length > 0) {
    warnings.push(`seed.js is missing users: ${missingEmails.join(', ')}`)
  } else {
    console.log('   ✅ All expected users are in seed.js')
  }
}

// 5. Check PrismaGoalRepository implements getGoalFilters
console.log('🔧 Checking Prisma repositories...')
const prismaGoalRepoPath = path.join(rootDir, 'repositories/prisma/PrismaGoalRepository.ts')
if (fs.existsSync(prismaGoalRepoPath)) {
  const repoContent = fs.readFileSync(prismaGoalRepoPath, 'utf-8')
  if (repoContent.includes('options: []') && repoContent.includes('avatarSelector')) {
    errors.push('PrismaGoalRepository.getGoalFilters() returns empty avatarSelector options')
  } else if (repoContent.includes('prisma.people.findMany')) {
    console.log('   ✅ getGoalFilters fetches users from database')
  }
}

// 6. Check package.json scripts
console.log('📦 Checking package.json scripts...')
const packagePath = path.join(rootDir, 'package.json')
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
  
  if (!pkg.scripts.build?.includes('next build')) {
    errors.push('package.json "build" script should run next build')
  }
  if (!pkg.scripts['build:vercel']?.includes('vercel-build.js')) {
    errors.push('package.json "build:vercel" script should run vercel-build.js')
  }
  
  if (pkg.scripts.build && pkg.scripts['build:vercel']) {
    console.log('   ✅ Build scripts are configured')
  }
}

// Print results
console.log('\n' + '='.repeat(50))

if (errors.length > 0) {
  console.log('\n❌ ERRORS (must fix before deploying):')
  errors.forEach(err => console.log(`   • ${err}`))
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (should review):')
  warnings.forEach(warn => console.log(`   • ${warn}`))
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ All checks passed! Ready to deploy.')
}

console.log('')

// Exit with error code if there are errors
process.exit(errors.length > 0 ? 1 : 0)
