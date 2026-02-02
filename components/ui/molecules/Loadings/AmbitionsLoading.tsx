import { Card } from '@/components/ui/atoms/Card'
import { Skeleton } from '@/components/ui/atoms/Skeleton'

export function AmbitionsLoading() {
  return (
    <div className="flex flex-col w-full pt-1 md:pt-1_5" role="status" aria-label="Loading">
      {/* Header skeleton */}
      <div className="flex justify-between mb-3">
        <div>
          <Skeleton variant="h1" width="400px" />
          <Skeleton variant="body" width="250px" className="mt-0_5" />
        </div>
        <div className="flex gap-1">
          <Skeleton variant="button" width="212px" height="72px" />
          <Skeleton variant="button" width="212px" height="72px" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-1 items-center mb-1">
        <Skeleton variant="button" width="132px" height="40px" />
        <Skeleton variant="button" width="132px" height="40px" />
        <div className="flex items-center gap-0_25">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="circular" width="32px" height="32px" />
          ))}
          <Skeleton variant="circular" width="32px" height="32px" />
        </div>
        <Skeleton variant="rectangular" width="240px" height="40px" />
        <div className="flex-1" />
        <Skeleton variant="button" width="190px" height="44px" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-0_5 items-center border-b border-neutral-300 pb-0_75 mb-1">
        <Skeleton variant="body" width="64px" />
        <Skeleton variant="body" width="88px" />
      </div>

      {/* Cards grid skeleton */}
      <div className="flex flex-col gap-1_5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="w-full flex flex-col gap-1 p-1_5">
            <Skeleton variant="body" width="60%" className="mb-0_5" />
            <div className="flex items-center gap-1 mb-1">
              <Skeleton variant="circular" width="48px" height="48px" />
              <div className="flex-1 flex justify-between gap-0_5">
                <Skeleton variant="h6" width="70%" />
                <Skeleton variant="body" width="20%" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton variant="body" width="40%" />
            </div>
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
