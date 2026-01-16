'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
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

function StatusTag({
  status,
  variant = 'draft',
}: {
  status: string
  variant?: 'draft' | 'awaiting-approval' | 'completed'
}) {
  const colors = {
    draft: 'bg-extra-blue-100 text-extra-blue-600',
    'awaiting-approval': 'bg-extra-pink-100 text-extra-pink-600',
    completed: 'bg-feedback-success-100 text-feedback-success-600',
  }

  return (
    <div className={cn('px-0.5 py-0.125 rounded-default', colors[variant])}>
      <Typography variant="body" fontWeight="bold">
        {status}
      </Typography>
    </div>
  )
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
            <StatusTag status={activity.from || ''} variant="draft" />
            <ArrowRight className="size-1 text-neutral-1000" />
            <StatusTag status={activity.to || ''} variant="awaiting-approval" />
          </div>
        </>
      )

    case 'created':
      return (
        <>
          <Typography variant="body">{t('created')}</Typography>
          <StatusTag status={activity.status || ''} variant="draft" />
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
        <div className="relative size-2 rounded-full shrink-0 overflow-hidden">
          <Image
            src={currentUserAvatar || '/profile-img/profile.png'}
            alt="Current user"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
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
            <div className="relative size-2 rounded-full shrink-0 overflow-hidden">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
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
