'use client'

import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/atoms/Button'
import { cn } from '@/utils/cn'
import type { AmbitionFiltersProps } from './AmbitionFilters.types'

export function AmbitionFilters({
  onTypeFilterClick,
  onStatusFilterClick,
  className,
}: AmbitionFiltersProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {/* Type Filter Button */}
      <Button
        variant="link"
        size="small"
        leftIcon={<Filter className="size-1.5" />}
        onClick={onTypeFilterClick}
      >
        Type: All
      </Button>

      {/* Status Filter Button */}
      <Button
        variant="link"
        size="small"
        leftIcon={<Filter className="size-1.5" />}
        onClick={onStatusFilterClick}
      >
        Status: All
      </Button>
    </div>
  )
}
