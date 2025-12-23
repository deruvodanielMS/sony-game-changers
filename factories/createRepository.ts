export function createRepository<T>(
  implementations: Record<string, new () => T>,
  options?: {
    envKey?: string
    defaultKey?: string
  },
): T {
  const envKey = options?.envKey ?? 'REPOSITORY_SOURCE'
  const defaultKey = options?.defaultKey

  const selected = process.env[envKey] ?? defaultKey

  if (!selected) {
    throw new Error(`Missing repository source (${envKey})`)
  }

  const RepoClass = implementations[selected]

  if (!RepoClass) {
    throw new Error(`Repository "${selected}" not registered`)
  }

  return new RepoClass()
}
