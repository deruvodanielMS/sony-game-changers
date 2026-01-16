'use client'

import { m } from 'framer-motion'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { ActivityItemProps } from './ActivityItem.types'

const activityVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

/**
 * ActivityItem - Displays a single activity item in a timeline
 *
 * A molecule component that shows user avatar, name, action content, and timestamp
 * in a consistent format. Uses Framer Motion for entry animations.
 *
 * @example
 * ```tsx
 * <ActivityItem
 *   user={{ name: "John Doe", avatar: "/avatar.jpg" }}
 *   date="2 hours ago"
 * >
 *   <Typography variant="body">completed the task</Typography>
 * </ActivityItem>
 * ```
 */
export function ActivityItem({
  user,
  date,
  children,
  size = 'md',
  avatarSize = 'md',
  className,
  'data-test-id': dataTestId,
}: ActivityItemProps) {
  const isMobile = size === 'sm'

  return (
    <m.div
      variants={activityVariants}
      transition={{ duration: 0.3 }}
      className={cn('flex items-start w-full', isMobile ? 'gap-0.5' : 'gap-1', className)}
      data-testid={dataTestId}
    >
      <Avatar src={user.avatar} alt={user.name} size={avatarSize} />
      <div className={cn('flex flex-col flex-1', isMobile ? 'gap-0.125' : 'gap-0.25')}>
        <div
          className={cn(
            'flex items-center flex-wrap',
            isMobile ? 'gap-0.25 h-auto' : 'gap-0.5 h-2',
          )}
        >
          <Typography variant="body" fontWeight="bold">
            {user.name}
          </Typography>
          {children}
        </div>
        <Typography variant="bodySmall" className={cn('text-neutral-500', isMobile && 'text-xs')}>
          {date}
        </Typography>
      </div>
    </m.div>
  )
}

ActivityItem.displayName = 'ActivityItem'
