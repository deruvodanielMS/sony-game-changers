import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const skeletonVariants = cva(
  'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%]',
  {
    variants: {
      variant: {
        h1: 'h-skeleton-h1 rounded-tiny',
        h2: 'h-skeleton-h2 rounded-tiny',
        h3: 'h-skeleton-h3 rounded-tiny',
        h4: 'h-skeleton-h4 rounded-tiny',
        h5: 'h-skeleton-h5 rounded-tiny',
        h6: 'h-skeleton-h6 rounded-tiny',
        body: 'h-skeleton-body rounded-tiny',
        bodySmall: 'h-skeleton-body-small rounded-tiny',
        bodyTiny: 'h-skeleton-body-tiny rounded-tiny',
        circular: 'rounded-full',
        rectangular: 'rounded-small',
        avatar: 'rounded-full aspect-square',
        button: 'h-skeleton-button rounded-small',
      },
    },
    defaultVariants: {
      variant: 'body',
    },
  },
)

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  className?: string
  width?: string
  height?: string
  'data-testid'?: string
}

export function Skeleton({
  variant,
  className,
  width,
  height,
  'data-testid': dataTestId,
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={{ width, height }}
      data-testid={dataTestId}
      aria-hidden="true"
    />
  )
}

Skeleton.displayName = 'Skeleton'
