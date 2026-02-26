'use client'

import { CalendarDays, MapPin } from 'lucide-react'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { TeamMemberHeaderCardProps } from './TeamMemberHeaderCard.types'

export function TeamMemberHeaderCard({
  name,
  role,
  avatarUrl,
  location,
  joinedLabel,
  className,
}: TeamMemberHeaderCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-default overflow-hidden',
        'bg-linear-to-r from-feedback-info-100 to-extra-purple-100',
        'px-1.5 py-1',
        'flex items-center justify-between gap-2',
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-1 min-w-0">
        <Avatar src={avatarUrl} alt={name} size="lg" />
        <div className="flex items-baseline gap-0.5 min-w-0">
          <Typography variant="h5" fontWeight="semibold" className="truncate">
            {name}
          </Typography>
          {role && (
            <Typography variant="body" color="textSecondary" className="truncate">
              {role}
            </Typography>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 text-neutral-800">
        <div className="flex items-center gap-0.25">
          <MapPin size={16} />
          <Typography variant="bodySmall">{location}</Typography>
        </div>
        <div className="flex items-center gap-0.25">
          <CalendarDays size={16} />
          <Typography variant="bodySmall">{joinedLabel}</Typography>
        </div>
      </div>
    </div>
  )
}
