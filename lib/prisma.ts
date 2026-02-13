import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

function createPrismaClient(): PrismaClient {
  // In production (Vercel), use PRISMA_DATABASE_URL for Prisma Accelerate connection pooling
  // Locally, fall back to DATABASE_URL
  const databaseUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error(
      'Database URL not configured. Set PRISMA_DATABASE_URL (for Vercel/production) or DATABASE_URL (for local development).',
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

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
