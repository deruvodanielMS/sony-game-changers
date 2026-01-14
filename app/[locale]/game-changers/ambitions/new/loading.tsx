import { Skeleton } from '@/components/ui/atoms/Skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-1_5" role="status" aria-label="Loading">
      {/* Back button skeleton */}
      <div className="flex items-center gap-0_5">
        <Skeleton variant="circular" width="var(--space-1_5)" height="var(--space-1_5)" />
        <Skeleton variant="body" width="80px" />
      </div>

      {/* Title skeleton */}
      <Skeleton variant="h2" width="250px" />

      {/* Description skeleton */}
      <div className="flex flex-col gap-0_5">
        <Skeleton variant="body" width="100%" />
        <Skeleton variant="body" width="60%" />
      </div>

      {/* Form skeleton */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex flex-col gap-0_5">
          <Skeleton variant="body" width="100px" />
          <Skeleton variant="rectangular" width="100%" height="var(--space-3)" />
        </div>
        <div className="flex flex-col gap-0_5">
          <Skeleton variant="body" width="120px" />
          <Skeleton variant="rectangular" width="100%" height="var(--space-3)" />
        </div>
        <div className="flex flex-col gap-0_5">
          <Skeleton variant="body" width="140px" />
          <Skeleton variant="rectangular" width="100%" height="120px" />
        </div>
        <div className="flex gap-0_75 mt-1">
          <Skeleton variant="button" width="120px" />
          <Skeleton variant="button" width="100px" />
        </div>
      </div>
      <span className="sr-only">Loading form...</span>
    </div>
  )
}
