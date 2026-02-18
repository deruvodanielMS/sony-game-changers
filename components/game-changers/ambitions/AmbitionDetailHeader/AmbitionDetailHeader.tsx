'use client'

import { useTranslations } from 'next-intl'
import { Typography } from '@/components/ui/foundations/Typography'
import { AmbitionStatus } from '@/components/ui/atoms/AmbitionStatus'
import {
  getStatusVariant,
  getStatusLabel,
  shouldShowProgress,
  getProgressVariant,
} from '@/components/ui/atoms/AmbitionStatus/AmbitionStatus.types'
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
  status,
  progress,
  createdDate,
  updatedDate,
  className,
}: AmbitionDetailHeaderProps) {
  const t = useTranslations('AmbitionDetail')
  const tTypeIcon = useTranslations('TypeIcon')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const isDesktop = useMediaQuery(BREAKPOINTS.lg)

  // Use centralized helpers to determine display mode
  const showProgress = shouldShowProgress(status)
  const statusVariant = getStatusVariant(status)
  const statusLabel = getStatusLabel(status)
  const progressVariant = getProgressVariant(status, progress)

  return (
    <div
      className={cn(
        'bg-neutral-100 flex rounded-large w-full',
        isMobile ? 'flex-col gap-1.5 p-1.5' : 'flex-row items-center gap-3 p-1.5',
        className,
      )}
    >
      {/* Left section - Title and metadata */}
      <div
        className={cn(
          'flex flex-1 flex-col items-start min-h-px min-w-px',
          isMobile ? 'gap-1' : 'gap-0.5',
        )}
      >
        {/* Title and Avatar row */}
        <div className="flex items-center w-full gap-1">
          {/* Avatar */}
          <div className="flex items-center shrink-0">
            <Avatar src={avatarUrl} alt={userName} size={isMobile ? 'md' : 'lg'} />
          </div>

          {/* Goal Title */}
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            as="h1"
            className={cn('flex-1 min-w-0', isMobile && 'line-clamp-2')}
          >
            {title}
          </Typography>
        </div>

        {/* Metadata row - aligned left */}
        <div
          className={cn(
            'flex w-full',
            isMobile
              ? 'flex-col gap-0.5 items-start'
              : 'flex-wrap gap-x-1 gap-y-0.5 items-center pl-4_5',
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

      {/* Right section - Status text or Progress Bar */}
      <div className={cn('flex items-center shrink-0', isMobile ? 'w-full' : 'w-[150px]')}>
        {showProgress ? (
          <AmbitionStatus
            variant={progressVariant}
            showProgress
            progress={progress}
            size={isDesktop ? 'md' : 'sm'}
          />
        ) : (
          <AmbitionStatus variant={statusVariant} size={isDesktop ? 'md' : 'sm'}>
            {statusLabel}
          </AmbitionStatus>
        )}
      </div>
    </div>
  )
}
