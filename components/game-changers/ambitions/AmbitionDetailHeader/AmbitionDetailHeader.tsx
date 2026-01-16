'use client'

import { useTranslations } from 'next-intl'
import { Target, Info, Sprout, BriefcaseBusiness, Shrub } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { ProgressRing } from '@/components/ui/atoms/ProgressRing'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { AMBITION_TYPES } from '@/domain/ambition'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionDetailHeaderProps } from './AmbitionDetailHeader.types'

const GoalTypeIcons = {
  [AMBITION_TYPES.BUSINESS]: <Sprout className="size-1.5 text-neutral-0" />,
  [AMBITION_TYPES.MANAGER_EFFECTIVENESS]: <BriefcaseBusiness className="size-1.5 text-neutral-0" />,
  [AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: <Shrub className="size-1.5 text-neutral-0" />,
}

export function AmbitionDetailHeader({
  title,
  userName,
  avatarUrl,
  ambitionType,
  progress,
  createdDate,
  updatedDate,
  className,
}: AmbitionDetailHeaderProps) {
  const t = useTranslations('AmbitionDetail')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const isDesktop = useMediaQuery(BREAKPOINTS.lg)
  const isTablet = !isMobile && !isDesktop

  return (
    <div
      className={cn(
        'bg-neutral-100 flex gap-3 p-2 rounded-1.5 w-full',
        isMobile && 'flex-col gap-2',
        className,
      )}
    >
      {/* Left section - Title and metadata */}
      <div className="flex flex-1 flex-col gap-2 items-start min-h-px min-w-px">
        {/* Title and Icon */}
        <div className={cn('flex gap-1 items-center w-full', isMobile ? 'h-auto' : 'h-4')}>
          {/* Goal Type Icon with gradient background */}
          {ambitionType && (
            <div className="bg-gradient-to-l from-[#5577f4] to-[#d061ff] flex items-center justify-center p-0.625 rounded-full shrink-0 size-3">
              {GoalTypeIcons[ambitionType as keyof typeof GoalTypeIcons] || (
                <Target className="size-1.5 text-neutral-0" />
              )}
            </div>
          )}

          {/* Goal Title */}
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            className={cn('flex-1 min-w-0', isMobile && 'line-clamp-3')}
          >
            {title}
          </Typography>
        </div>

        {/* Metadata row */}
        <div
          className={cn(
            'flex items-center w-full',
            isMobile ? 'flex-col gap-1 items-start' : 'gap-1 h-1.5 pl-4',
            isTablet && 'flex-wrap',
          )}
        >
          {/* Created by */}
          <div className="flex gap-0.5 items-center justify-end shrink-0">
            <Avatar src={avatarUrl} alt={userName} size="sm" />
            <Typography variant="bodySmall" className="text-neutral-600">
              {t('metadata.createdBy')} <span className="font-bold">{userName}</span>{' '}
              {createdDate && (
                <>
                  {t('metadata.on')} <span className="font-bold">{createdDate}</span>
                </>
              )}
            </Typography>
          </div>

          {/* Divider */}
          {!isMobile && <div className="bg-neutral-300 h-1 w-px shrink-0" />}

          {/* Assigned to */}
          <div className="flex gap-0.5 items-center justify-end shrink-0">
            <Avatar src={avatarUrl} alt={userName} size="sm" />
            <Typography variant="bodySmall" className="text-neutral-600">
              {t('metadata.assignedTo')} <span className="font-bold">{userName}</span>
            </Typography>
          </div>

          {/* Divider */}
          {!isMobile && <div className="bg-neutral-300 h-1 w-px shrink-0" />}

          {/* Last Update */}
          {updatedDate && (
            <Typography
              variant="bodySmall"
              className={cn(
                'text-neutral-600 shrink-0',
                !isMobile && 'overflow-hidden text-ellipsis',
              )}
            >
              {t('metadata.lastUpdate')} <span className="font-bold">{updatedDate}</span>
            </Typography>
          )}
        </div>
      </div>

      {/* Right section - Progress metrics */}
      <div className={cn('flex items-center shrink-0', isMobile && 'justify-start')}>
        <div
          className={cn(
            'bg-neutral-100 flex gap-1 items-center justify-end p-0.75 rounded-1 shrink-0',
            isMobile ? 'h-auto' : 'h-4.5',
          )}
        >
          {/* Progress Ring */}
          <ProgressRing progress={progress} size={isMobile ? 48 : 64} strokeWidth={6} />

          {/* Data */}
          <div className="flex flex-col gap-0.5 items-end justify-center shrink-0">
            <div className="flex gap-0.5 items-center">
              <Typography variant={isMobile ? 'h6' : 'h5'} className="text-neutral-1000">
                {progress}%
              </Typography>
              {/* Tooltip button */}
              <button className="relative group" aria-label={t('progress.fullLaddering')}>
                <Info className="size-1 text-neutral-600 hover:text-neutral-1000 transition-colors" />
                {/* Tooltip - shown on hover */}
                <div className="absolute bottom-full right-0 mb-0.5 hidden group-hover:flex flex-col items-center pointer-events-none z-10">
                  <div className="bg-neutral-1000 px-0.5 py-0.375 rounded-0.25 shadow-lg">
                    <Typography
                      variant="bodyTiny"
                      className="text-neutral-0 text-center whitespace-nowrap"
                    >
                      {t('progress.fullLaddering')}
                    </Typography>
                  </div>
                  <div
                    className="w-1 h-0.25 bg-neutral-1000"
                    style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                  />
                </div>
              </button>
            </div>
            <Typography variant="bodySmall" className="text-neutral-500">
              {t('progress.completed')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
