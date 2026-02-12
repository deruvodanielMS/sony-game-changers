'use client'

import { useTranslations } from 'next-intl'
import { Typography } from '@/components/ui/foundations/Typography'
import { ProgressBar } from '@/components/ui/atoms/ProgressBar'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionDetailHeaderProps } from './AmbitionDetailHeader.types'

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
  const tTypeIcon = useTranslations('TypeIcon')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const isDesktop = useMediaQuery(BREAKPOINTS.lg)
  const isTablet = !isMobile && !isDesktop

  return (
    <div
      className={cn(
        'bg-neutral-100 flex items-center rounded-large w-full',
        isMobile ? 'flex-col gap-2 p-1.5' : 'gap-3 p-1.5',
        className,
      )}
    >
      {/* Left section - Title and metadata */}
      <div
        className={cn(
          'flex flex-1 flex-col items-start min-h-px min-w-px',
          isMobile ? 'gap-1.5' : 'gap-2',
        )}
      >
        {/* Title and Icon */}
        <div className={cn('flex items-center w-full', isMobile ? 'gap-1 h-auto' : 'gap-1 h-4')}>
          {/* Avatar */}
          <div className="flex items-end shrink-0">
            <Avatar src={avatarUrl} alt={userName} size={isMobile ? 'md' : 'lg'} />
          </div>

          {/* Goal Title */}
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            as="h1"
            className={cn('flex-1 min-w-0', isMobile && 'line-clamp-3')}
          >
            {title}
          </Typography>
        </div>

        {/* Metadata row */}
        <div
          className={cn(
            'flex items-center w-full',
            isMobile ? 'flex-col gap-1 items-start' : 'gap-0.5 h-1.5 pl-4_5',
            isTablet && 'flex-wrap',
          )}
        >
          {/* Type Display with Icon */}
          {ambitionType && (
            <div className="flex gap-0.5 items-center shrink-0">
              <TypeIcon type={ambitionType} variant="metadata" />
              <Typography variant="bodySmall" color="neutral500">
                {t('metadata.type')}:{' '}
                <span className="font-bold">
                  {tTypeIcon(
                    ambitionType as
                      | 'business'
                      | 'manager_effectiveness'
                      | 'personal_growth_and_development',
                  )}
                </span>
              </Typography>
            </div>
          )}

          {/* Created by */}
          <div className="flex gap-0.5 items-center shrink-0">
            <Avatar src={avatarUrl} alt={userName} size="sm" />
            <Typography variant="bodySmall" color="neutral500">
              {t('metadata.createdBy')}: <span className="font-bold">{userName}</span>{' '}
              {t('metadata.on')} <span className="font-bold">{createdDate}</span>
            </Typography>
          </div>

          {/* Last Update timestamp */}
          {updatedDate && (
            <Typography variant="bodySmall" color="neutral500" className="shrink-0">
              {t('metadata.lastUpdate')}: <span className="font-bold">{updatedDate}</span>
            </Typography>
          )}
        </div>
      </div>

      {/* Right section - Progress metrics */}
      <div className={cn('flex items-center shrink-0', isMobile ? 'w-full' : 'w-[150px]')}>
        {/* Progress Bar */}
        <ProgressBar
          progress={progress}
          size="L"
          status={progress === 100 ? 'completed' : 'in-progress'}
          showPercentage={true}
        />
      </div>
    </div>
  )
}
