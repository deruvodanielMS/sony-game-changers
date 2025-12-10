import { cn } from '@/utils/cn'

export function Card({
  children,
  className,
  'data-testid': dataTestId,
}: {
  children: React.ReactNode
  'data-testid'?: string
  className?: string
}) {
  const hasDataTestId = dataTestId ? { 'data-testid': dataTestId } : {}
  return (
    <div
      className={cn('bg-neutral-0 rounded-default border border-neutral-300 p-1_5', className)}
      {...hasDataTestId}
    >
      {children}
    </div>
  )
}
