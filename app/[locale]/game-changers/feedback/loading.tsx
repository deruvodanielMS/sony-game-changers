import { Card } from '@/components/ui/atoms/Card'
import { Skeleton } from '@/components/ui/atoms/Skeleton'

export default function Loading() {
  return (
    <div
      className="flex flex-col gap-1_5 px-1 md:px-3 pt-1 md:pt-1_5"
      role="status"
      aria-label="Loading"
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-1">
        <Skeleton variant="h2" width="200px" />
        <Skeleton variant="button" width="160px" height="40px" />
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-1 items-center mb-1">
        <Skeleton variant="button" width="120px" height="40px" />
        <Skeleton variant="rectangular" width="250px" height="40px" />
        <Skeleton variant="button" width="100px" height="40px" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1_5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col gap-1 p-1_5">
            <div className="flex items-center gap-1 mb-1">
              <Skeleton variant="circular" width="48px" height="48px" />
              <div className="flex-1 flex flex-col gap-0_5">
                <Skeleton variant="h6" width="70%" />
                <Skeleton variant="body" width="110px" />
              </div>
            </div>
            <Skeleton variant="body" width="100%" />
            <Skeleton variant="body" width="85%" />
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
