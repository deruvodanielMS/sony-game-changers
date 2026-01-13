'use client'

import { cn } from '@/utils/cn'
import { Typography } from '@/components/ui/foundations/Typography'
import type { SectionHeaderProps } from './SectionHeader.types'

/**
 * SectionHeader - Generic section header component
 * Displays title, optional description and optional actions/metrics
 * Reusable across different sections of the application
 */
export function SectionHeader({
  title,
  description,
  actions,
  className,
  'data-test-id': dataTestId,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col md:flex-row md:flex-wrap md:items-center gap-1_5 bg-neutral-0 w-full pt-6 md:pt-0',
        className,
      )}
      data-test-id={dataTestId}
    >
      {/* Title Section */}
      <div className="flex flex-col gap-0_25 grow min-w-0">
        <Typography variant="h4" as="h1" fontWeight="bold" color="default">
          {title}
        </Typography>
        {description && (
          <Typography variant="body" color="neutral800">
            {description}
          </Typography>
        )}
      </div>

      {/* Actions/Metrics Section */}
      {actions && <div className="flex gap-0_75 shrink-0 self-start md:self-auto">{actions}</div>}
    </header>
  )
}

SectionHeader.displayName = 'SectionHeader'
