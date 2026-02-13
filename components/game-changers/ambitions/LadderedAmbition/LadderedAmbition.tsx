'use client'

import { Link } from '@/i18n/navigation'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { AmbitionStatus } from '@/components/ui/atoms/AmbitionStatus'
import {
  getStatusVariant,
  getStatusLabel,
  shouldShowProgress,
  getProgressVariant,
} from '@/components/ui/atoms/AmbitionStatus/AmbitionStatus.types'
import { Arrow } from '@/components/ui/atoms/Arrow'
import { cn } from '@/utils/cn'
import type { LadderedAmbitionProps } from './LadderedAmbition.types'

export function LadderedAmbition({
  title,
  userName,
  avatarUrl,
  progress,
  status,
  statusLabel: customLabel,
  statusVariant: customVariant,
  arrowType = 'Laddered middle',
  href,
  className,
}: LadderedAmbitionProps) {
  // Use centralized helpers, with fallback to deprecated props for backwards compatibility
  const showProgress = shouldShowProgress(status)
  const variant = customVariant ?? getStatusVariant(status)
  const label = customLabel ?? getStatusLabel(status)
  const progressVariant = getProgressVariant(status, progress)

  return (
    <div
      className={cn(
        'group flex flex-col gap-1 items-start pl-2_5 w-full sm:flex-row sm:gap-2_5 sm:items-center',
        className,
      )}
    >
      <div className="flex w-full sm:flex-1 gap-1 items-center min-w-0">
        <div className="flex items-center pr-0_5 shrink-0">
          <div className="mr-[-0_5] shrink-0">
            <Arrow type={arrowType} className="size-3 overflow-hidden" />
          </div>
          <div className="mr-[-0_5] flex items-center justify-center shrink-0 size-2">
            <Avatar src={avatarUrl ?? undefined} alt={userName} size="md" />
          </div>
        </div>

        <Link
          href={href}
          className="group/link flex-1 min-w-0 transition-colors"
          aria-label={title}
        >
          <Typography
            variant="body"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-1000 group-hover/link:bg-gradient-to-r group-hover/link:from-feedback-info-500 group-hover/link:to-extra-purple-500 group-hover/link:bg-clip-text group-hover/link:!text-transparent"
          >
            {title}
          </Typography>
        </Link>
      </div>

      <div className="flex flex-col items-start sm:items-end shrink-0 w-full sm:w-[150px]">
        {showProgress ? (
          <AmbitionStatus variant={progressVariant} showProgress progress={progress} size="sm" />
        ) : (
          <AmbitionStatus variant={variant} size="sm">
            {label}
          </AmbitionStatus>
        )}
      </div>
    </div>
  )
}
