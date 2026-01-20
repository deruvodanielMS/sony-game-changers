import { Skeleton } from '@/components/ui/atoms/Skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-1_5 p-1_5" role="status" aria-label="Loading">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <Skeleton variant="h2" width="200px" />
        <Skeleton variant="button" width="120px" />
      </div>

      {/* Notifications list */}
      <div className="flex flex-col gap-0_75">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-1 p-1 border border-neutral-200 rounded-default"
          >
            <Skeleton variant="circular" width="var(--space-2_75)" height="var(--space-2_75)" />
            <div className="flex-1 flex flex-col gap-0_5">
              <Skeleton variant="h6" width="70%" />
              <Skeleton variant="body" width="100%" />
              <Skeleton variant="body" width="40%" />
            </div>
            <Skeleton variant="circular" width="var(--space-0_5)" height="var(--space-0_5)" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading notifications...</span>
    </div>
  )
}
