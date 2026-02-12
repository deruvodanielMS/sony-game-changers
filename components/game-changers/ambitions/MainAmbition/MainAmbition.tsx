'use client'

import { Link } from '@/i18n/navigation'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import { ProgressBar } from '@/components/ui/atoms/ProgressBar'
import { cn } from '@/utils/cn'
import type { MainAmbitionProps } from './MainAmbition.types'

export function MainAmbition({
  title,
  userName,
  avatarUrl,
  goalType,
  progress,
  href,
  showLadderedIndicator,
  className,
}: MainAmbitionProps) {
  const progressStatus: 'in-progress' | 'completed' = progress >= 100 ? 'completed' : 'in-progress'

  return (
    <div
      className={cn(
        'flex flex-col gap-1 items-start w-full sm:flex-row sm:gap-2_5 sm:items-center',
        className,
      )}
    >
      <div className="flex w-full sm:flex-1 gap-1 items-center min-w-0">
        <div className="flex items-center shrink-0">
          <div className="shrink-0 size-3">
            <Avatar src={avatarUrl || undefined} alt={userName} size="lg" />
          </div>
          {goalType && (
            <div className="shrink-0 -ml-0_5 z-10">
              <TypeIcon type={goalType} variant="badge" />
            </div>
          )}
        </div>

        <Link href={href} className="group flex-1 min-w-0 transition-colors" aria-label={title}>
          <Typography
            variant="h6"
            className="overflow-hidden text-ellipsis line-clamp-2 text-neutral-1000 group-hover:bg-gradient-to-r group-hover:from-feedback-info-500 group-hover:to-extra-purple-500 group-hover:bg-clip-text group-hover:!text-transparent"
          >
            {title}
          </Typography>
        </Link>
      </div>

      <div className="flex flex-col items-start sm:items-end shrink-0 w-full sm:w-[150px]">
        <ProgressBar progress={progress} size="L" status={progressStatus} showPercentage={true} />
      </div>
    </div>
  )
}
