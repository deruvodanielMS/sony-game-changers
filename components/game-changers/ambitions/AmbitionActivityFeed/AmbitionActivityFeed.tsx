'use client'

import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { Badge } from '@/components/ui/atoms/Badge'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionActivityFeedProps, ActivityItem } from './AmbitionActivityFeed.types'

const activityVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function StatusBadge({
  status,
  variant = 'draft',
}: {
  status: string
  variant?: 'draft' | 'awaiting-approval' | 'completed'
}) {
  const badgeVariantMap = {
    draft: 'info' as const,
    'awaiting-approval': 'primary' as const,
    completed: 'success' as const,
  }

  return <Badge variant={badgeVariantMap[variant]}>{status}</Badge>
}

function ActivityContent({ activity }: { activity: ActivityItem }) {
  const t = useTranslations('AmbitionDetail.activity')

  switch (activity.action) {
    case 'completed':
      return (
        <Typography variant="body">
          <span className="font-bold text-feedback-success-600">{t('completed')}</span>{' '}
          {activity.target || t('theAmbition')}
        </Typography>
      )

    case 'approved':
      return <Typography variant="body">{t('approved')}</Typography>

    case 'statusChange':
      return (
        <>
          <Typography variant="body">{t('changedStatus')}</Typography>
          <div className="flex gap-0.5 items-center flex-wrap">
            <StatusBadge status={activity.from || ''} variant="draft" />
            <ArrowRight className="size-1 text-neutral-1000" />
            <StatusBadge status={activity.to || ''} variant="awaiting-approval" />
          </div>
        </>
      )

    case 'created':
      return (
        <>
          <Typography variant="body">{t('created')}</Typography>
          <StatusBadge status={activity.status || ''} variant="draft" />
        </>
      )

    default:
      return null
  }
}

export function AmbitionActivityFeed({
  activities,
  currentUserAvatar,
  onCommentSubmit,
  className,
}: AmbitionActivityFeedProps) {
  const t = useTranslations('AmbitionDetail.activity')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

  return (
    <div className={cn('flex flex-col w-full', isMobile ? 'gap-2' : 'gap-2.5', className)}>
      {/* Add Comment */}
      <div className={cn('flex items-start w-full', isMobile ? 'gap-0.5' : 'gap-1')}>
        <Avatar src={currentUserAvatar} alt="Current user" size="md" />
        <div className="flex-1">
          <textarea
            placeholder={t('addCommentPlaceholder')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey && onCommentSubmit) {
                onCommentSubmit(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
            className={cn(
              'w-full px-1 py-0.75 border border-neutral-300 rounded-small bg-neutral-0',
              'text-neutral-600 placeholder:text-neutral-600 resize-none',
              'focus:outline-none focus:ring-2 focus:ring-accent-primary transition-shadow',
              isMobile ? 'h-18 text-sm' : 'h-23',
            )}
          />
        </div>
      </div>

      {/* Activity History */}
      <m.div
        initial="hidden"
        animate="visible"
        variants={listVariants}
        className={cn('flex flex-col w-full', isMobile ? 'gap-1.5' : 'gap-2')}
      >
        {activities.map((activity) => (
          <m.div
            key={activity.id}
            variants={activityVariants}
            transition={{ duration: 0.3 }}
            className={cn('flex items-start w-full', isMobile ? 'gap-0.5' : 'gap-1')}
          >
            <Avatar src={activity.user.avatar} alt={activity.user.name} size="md" />
            <div className={cn('flex flex-col flex-1', isMobile ? 'gap-0.125' : 'gap-0.25')}>
              <div
                className={cn(
                  'flex items-center flex-wrap',
                  isMobile ? 'gap-0.25 h-auto' : 'gap-0.5 h-2',
                )}
              >
                <Typography variant="body" fontWeight="bold">
                  {activity.user.name}
                </Typography>
                <ActivityContent activity={activity} />
              </div>
              <Typography
                variant="bodySmall"
                className={cn('text-neutral-500', isMobile && 'text-xs')}
              >
                {activity.date}
              </Typography>
            </div>
          </m.div>
        ))}
      </m.div>
    </div>
  )
}
