'use client'

import { Avatar } from '@/components/ui/atoms/Avatar'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { TeamMemberCardProps } from './TeamMemberCard.types'

/**
 * TeamMemberCard - Displays a team member with avatar, name, and role
 *
 * Used in both grid and list views on the Team page.
 *
 * @example
 * ```tsx
 * <TeamMemberCard
 *   name="James Miller"
 *   avatarUrl="/profile-img/profile.png"
 *   role="Manager"
 * />
 * ```
 */
export function TeamMemberCard({
  name,
  avatarUrl,
  role,
  className,
  'data-testid': dataTestId,
  onClick,
}: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 bg-neutral-0 border border-neutral-300 rounded-large p-1_5',
        'hover:border-neutral-400 transition-colors cursor-pointer',
        className,
      )}
      data-testid={dataTestId}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <Avatar src={avatarUrl} alt={name} size="lg" />

      <div className="flex flex-col min-w-0">
        <Typography variant="bodySmall" fontWeight="bold" className="truncate">
          {name}
        </Typography>

        {role && (
          <Typography variant="bodyTiny" color="textSecondary" className="truncate">
            {role}
          </Typography>
        )}
      </div>
    </div>
  )
}

TeamMemberCard.displayName = 'TeamMemberCard'
