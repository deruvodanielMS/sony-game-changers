'use client'

import { Info } from 'lucide-react'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { MetadataDisplayProps } from './MetadataDisplay.types'

/**
 * MetadataDisplay - Shows creation/update metadata with avatar
 *
 * A molecule component that displays user information, creation date, and optional update date
 * with an info icon. Commonly used in headers and cards to show ownership and timestamps.
 *
 * @example
 * ```tsx
 * <MetadataDisplay
 *   userName="John Doe"
 *   avatarUrl="/avatar.jpg"
 *   createdDate="Jan 15, 2024"
 *   updatedDate="Jan 16, 2024"
 * />
 * ```
 */
export function MetadataDisplay({
  userName,
  avatarUrl,
  createdDate,
  updatedDate,
  showInfo = false,
  infoTooltip,
  size = 'md',
  avatarSize = 'sm',
  createdByLabel = 'Created by',
  onLabel = 'on',
  lastUpdatedLabel = 'Last updated',
  className,
  'data-test-id': dataTestId,
}: MetadataDisplayProps) {
  const isMobile = size === 'sm'

  return (
    <div
      className={cn(
        'flex items-center w-full',
        isMobile ? 'flex-col gap-1 items-start' : 'gap-1',
        className,
      )}
      data-testid={dataTestId}
    >
      {/* Created by */}
      <div className="flex gap-0.5 items-center shrink-0">
        <Avatar src={avatarUrl} alt={userName} size={avatarSize} />
        <Typography variant="bodySmall" className="text-neutral-600">
          {createdByLabel} <span className="font-bold">{userName}</span>
          {createdDate && (
            <>
              {' '}
              {onLabel} <span className="font-bold">{createdDate}</span>
            </>
          )}
        </Typography>
      </div>

      {/* Divider */}
      {!isMobile && (updatedDate || showInfo) && (
        <div className="size-0.25 rounded-full bg-neutral-400 shrink-0" />
      )}

      {/* Last updated */}
      {updatedDate && (
        <div className="flex gap-0.25 items-center shrink-0">
          <Typography variant="bodySmall" className="text-neutral-600">
            {lastUpdatedLabel} <span className="font-bold">{updatedDate}</span>
          </Typography>
        </div>
      )}

      {/* Info icon */}
      {showInfo && (
        <button
          className="text-neutral-600 hover:text-neutral-800 transition-colors shrink-0"
          aria-label={infoTooltip || 'More information'}
          title={infoTooltip}
        >
          <Info className="size-1.25" />
        </button>
      )}
    </div>
  )
}

MetadataDisplay.displayName = 'MetadataDisplay'
