'use client'

import { cn } from '@/utils/cn'
import { Typography } from '@/components/ui/foundations/Typography'
import type { MetricCardProps } from './MetricCard.types'

/**
 * MetricCard - Displays a metric with optional icon, label and value
 * Reusable component for showing statistics and metrics
 */
export function MetricCard({
  label,
  value,
  icon,
  className,
  'data-test-id': dataTestId,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-0_75 bg-neutral-100 rounded-default px-0_75 py-0_75 h-4_5',
        className,
      )}
      data-test-id={dataTestId}
    >
      {/* Icon (optional) */}
      {icon && (
        <div className="w-3 h-3 shrink-0" aria-hidden="true">
          {icon}
        </div>
      )}

      {/* Data */}
      <div className="flex flex-col justify-between min-w-8">
        <Typography variant="bodySmall" as="span" color="neutral500">
          {label}
        </Typography>
        <Typography variant="h5" as="span" fontWeight="semibold" color="neutral800">
          {value}
        </Typography>
      </div>
    </div>
  )
}

MetricCard.displayName = 'MetricCard'
