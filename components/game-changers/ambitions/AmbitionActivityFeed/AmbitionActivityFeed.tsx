'use client'

import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { AmbitionStatus } from '@/components/ui/atoms/AmbitionStatus'
import {
  getStatusVariant,
  getStatusLabel,
} from '@/components/ui/atoms/AmbitionStatus/AmbitionStatus.types'
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

/**
 * Displays status badge using centralized helpers
 * Converts raw status string to proper variant and label
 */
function StatusBadge({ status }: { status: string }) {
  return (
    <AmbitionStatus variant={getStatusVariant(status)}>{getStatusLabel(status)}</AmbitionStatus>
  )
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
            <StatusBadge status={activity.from || ''} />
            <ArrowRight className="size-1 text-neutral-1000" />
            <StatusBadge status={activity.to || ''} />
          </div>
        </>
      )

    case 'created':
      return (
        <>
          <Typography variant="body">{t('created')}</Typography>
          <StatusBadge status={activity.status || ''} />
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
            avatarAlt={t('currentUserAlt')}
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
