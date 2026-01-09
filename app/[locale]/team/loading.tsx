import { Skeleton } from '@/components/ui/atoms/Skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-1_5 p-1_5" role="status" aria-label="Loading">
      {/* Page header */}
      <Skeleton variant="heading" width="150px" />

      {/* Team members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-0_75 p-1 border border-neutral-200 rounded-default"
          >
            <Skeleton variant="avatar" width="80px" />
            <Skeleton variant="title" width="120px" />
            <Skeleton variant="text" width="100px" />
            <Skeleton variant="text" width="80px" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading team...</span>
    </div>
  )
}
