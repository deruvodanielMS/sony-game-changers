import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

function getDatabaseUrl(): string | undefined {
  // Support multiple variable names for flexibility:
  // 1. DB_PRISMA_DATABASE_URL - Vercel Prisma integration with custom prefix
  // 2. PRISMA_DATABASE_URL - Standard Prisma Accelerate
  // 3. DB_DATABASE_URL - Vercel Prisma integration direct URL
  // 4. DATABASE_URL - Standard direct URL
  return (
    process.env.DB_PRISMA_DATABASE_URL ||
    process.env.PRISMA_DATABASE_URL ||
    process.env.DB_DATABASE_URL ||
    process.env.DATABASE_URL
  )
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error(
      'Database URL not configured. Set PRISMA_DATABASE_URL or DATABASE_URL environment variable.',
    )
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

// Lazy initialization - only create client when actually used
function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}

// Export a proxy that lazily initializes the client
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient()
    const value = client[prop as keyof PrismaClient]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})
