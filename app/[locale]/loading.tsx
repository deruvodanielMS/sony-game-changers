import { Spinner } from '@/components/ui/atoms/Spinner'

export default function Loading() {
  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-var(--space-8))]"
      role="status"
      aria-label="Loading"
    >
      <Spinner size="large" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
