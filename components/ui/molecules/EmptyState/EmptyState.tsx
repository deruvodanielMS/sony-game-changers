import { Typography } from '@/components/ui/foundations/Typography'
import { Button } from '@/components/ui/atoms/Button'
import { cn } from '@/utils/cn'
import type { EmptyStateProps } from './EmptyState.types'

export function EmptyState({
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  variant = 'default',
  className,
  'data-testid': dataTestId,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-1 text-center',
        'border border-neutral-300 rounded-small',
        variant === 'default' && 'flex-1 py-4 px-2',
        variant === 'compact' && 'p-1_5',
        className,
      )}
      data-testid={dataTestId}
    >
      <Typography variant="body" fontWeight="bold">
        {title}
      </Typography>

      {description && (
        <Typography variant="body" color="textSecondary">
          {description}
        </Typography>
      )}

      {actionLabel && onAction && (
        <Button variant="link" size="small" onClick={onAction} leftIcon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
