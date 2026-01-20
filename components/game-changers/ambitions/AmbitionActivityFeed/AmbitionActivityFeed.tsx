'use client'

import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { Badge } from '@/components/ui/atoms/Badge'
import { CommentInput } from '@/components/ui/molecules/CommentInput'
import { ActivityItem } from '@/components/ui/molecules/ActivityItem'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type {
  AmbitionActivityFeedProps,
  ActivityItem as ActivityItemType,
} from './AmbitionActivityFeed.types'

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

function ActivityContent({ activity }: { activity: ActivityItemType }) {
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
    <div className={cn('flex flex-col w-full gap-1', className)}>
      {/* Title */}
      <Typography variant="h6" fontWeight="semibold" className="text-neutral-1000">
        {t('title')}
      </Typography>

      {/* Content */}
      <div className="flex flex-col w-full gap-1">
        {/* Add Comment */}
        <div className="flex flex-col w-full items-end gap-1">
          <CommentInput
            avatarSrc={currentUserAvatar}
            avatarAlt="Current user"
            avatarSize="md"
            size={isMobile ? 'sm' : 'md'}
            placeholder={t('addCommentPlaceholder')}
            onSubmit={onCommentSubmit}
            showActions
            className={isMobile ? 'gap-0.5' : 'gap-1'}
          />
        </div>

        {/* Activity History */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={listVariants}
          className={cn('flex flex-col w-full', isMobile ? 'gap-2' : 'gap-2')}
        >
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              user={activity.user}
              date={activity.date}
              size={isMobile ? 'sm' : 'md'}
              avatarSize="md"
            >
              <ActivityContent activity={activity} />
            </ActivityItem>
          ))}
        </m.div>
      </div>
    </div>
  )
}
