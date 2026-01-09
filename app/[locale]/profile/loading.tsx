import { Skeleton } from '@/components/ui/atoms/Skeleton'

export default function Loading() {
  return (
    <div
      className="p-1 md:pt-1_5 md:px-3 md:pb-3 mt-4_5 md:mt-0"
      role="status"
      aria-label="Loading"
    >
      {/* Page title skeleton */}
      <Skeleton variant="heading" width="150px" className="mb-1_5" />

      {/* Language settings section */}
      <section className="mb-2">
        <Skeleton variant="title" width="180px" className="mb-1" />
        <div className="max-w-xs flex flex-col gap-0_5">
          <Skeleton variant="rectangular" width="100%" height="var(--space-3)" />
        </div>
      </section>

      {/* Additional sections skeleton */}
      <section className="mb-2">
        <Skeleton variant="title" width="200px" className="mb-1" />
        <div className="flex flex-col gap-0_75">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="85%" />
        </div>
      </section>
      <span className="sr-only">Loading profile...</span>
    </div>
  )
}
