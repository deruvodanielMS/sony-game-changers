import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const skeletonVariants = cva(
  'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%]',
  {
    variants: {
      variant: {
        text: 'h-skeleton-text rounded-tiny',
        title: 'h-skeleton-title rounded-tiny',
        heading: 'h-skeleton-heading rounded-tiny',
        circular: 'rounded-full',
        rectangular: 'rounded-small',
        avatar: 'rounded-full aspect-square',
        button: 'h-skeleton-button rounded-small',
      },
    },
    defaultVariants: {
      variant: 'text',
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
