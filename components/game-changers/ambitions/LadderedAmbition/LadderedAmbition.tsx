'use client'

import { Link } from '@/i18n/navigation'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { ProgressBar } from '@/components/ui/atoms/ProgressBar'
import { Badge } from '@/components/ui/atoms/Badge'
import { Arrow } from '@/components/ui/atoms/Arrow'
import { cn } from '@/utils/cn'
import type { LadderedAmbitionProps } from './LadderedAmbition.types'

export function LadderedAmbition({
  title,
  userName,
  avatarUrl,
  progress,
  status,
  statusLabel,
  statusVariant = 'default',
  arrowType = 'Laddered middle',
  href,
  className,
}: LadderedAmbitionProps) {
  const progressStatus: 'in-progress' | 'completed' = progress >= 100 ? 'completed' : 'in-progress'

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
        {status === 'draft' ? (
          <div className="flex h-1_25 items-center justify-end">
            <div className="flex items-center justify-center px-0_5 py-0_25 h-2">
              <Badge variant={statusVariant}>{statusLabel ?? ''}</Badge>
            </div>
          </div>
        ) : (
          <ProgressBar progress={progress} size="S" status={progressStatus} showPercentage={true} />
        )}
      </div>
    </div>
  )
}
