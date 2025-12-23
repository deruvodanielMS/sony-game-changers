export type RepositoryMap<T> = {
  [key: string]: new (...args: unknown[]) => T
}
