'use client'

import { use, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MoreHorizontal, CornerDownRight, Target, Info } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Typography } from '@/components/ui/foundations/Typography'
import { Button } from '@/components/ui/atoms/Button'
import { ProgressRing } from '@/components/ui/atoms/ProgressRing'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import { useAmbitionsStore } from '@/stores/ambitions.store'
import { ROUTES } from '@/common/routes'
import { AMBITION_TYPES } from '@/domain/ambition'
import { Shrub, BriefcaseBusiness, Sprout } from 'lucide-react'

const GoalTypeIcons = {
  [AMBITION_TYPES.BUSINESS]: <Sprout className="size-1_5 text-neutral-0" />,
  [AMBITION_TYPES.MANAGER_EFFECTIVENESS]: <BriefcaseBusiness className="size-1_5 text-neutral-0" />,
  [AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: <Shrub className="size-1_5 text-neutral-0" />,
}

export default function AmbitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('AmbitionDetail')
  const { id } = use(params)
  const { list, fetchList, selected, selectAmbition } = useAmbitionsStore()

  useEffect(() => {
    if (!list) {
      fetchList()
    }
  }, [list, fetchList])

  useEffect(() => {
    if (list && id) {
      const ambition = list.find((a) => a.id === id)
      if (ambition) {
        selectAmbition(ambition)
      }
    }
  }, [list, id, selectAmbition])

  if (!selected) {
    return (
      <div className="flex flex-col gap-1_5 w-full">
        <AnimatedSection delay={0}>
          <Typography variant="body">Loading...</Typography>
        </AnimatedSection>
      </div>
    )
  }

  const { title, userName, avatarUrl, ambitionType, ladderedGoals, status } = selected
  const parentAmbition = ladderedGoals?.[0]

  // Calculate progress based on laddered goals completion
  const totalLadderedGoals = ladderedGoals?.length || 0
  const completedLadderedGoals = ladderedGoals?.filter((g) => g.status === 'completed').length || 0
  const progress =
    totalLadderedGoals > 0 ? Math.round((completedLadderedGoals / totalLadderedGoals) * 100) : 0

  // Determine which action buttons to show based on status
  const showApprovalActions = status === 'awaiting_approval'
  const showSendForApproval = status === 'draft'
  const showAnyActions = showApprovalActions || showSendForApproval

  const breadcrumbItems = [
    { label: t('breadcrumb.ambitions'), href: ROUTES.GAME_CHANGERS_AMBITIONS },
    { label: t('breadcrumb.detail') },
  ]

  return (
    <div className="flex flex-col gap-1_5 w-full">
      <AnimatedSection delay={0}>
        {/* Breadcrumb and Main Actions */}
        <div className="flex items-center justify-between w-full">
          <Breadcrumb items={breadcrumbItems} />

          {/* Main Actions */}
          {showAnyActions && (
            <div className="flex gap-1 h-2_5 items-center">
              {/* Awaiting Approval: Send Back + Approve buttons */}
              {showApprovalActions && (
                <>
                  <Button variant="secondary">{t('actions.sendBack')}</Button>
                  <Button variant="primary">{t('actions.approve')}</Button>
                </>
              )}

              {/* Draft: Send for Approval button */}
              {showSendForApproval && (
                <Button variant="primary">{t('actions.sendForApproval')}</Button>
              )}

              {/* More Options Icon Button */}
              <button
                className="flex items-center justify-center p-0_25 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label={t('actions.moreOptions')}
              >
                <MoreHorizontal className="size-1_5 text-neutral-1000" />
              </button>
            </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        {/* Laddered Goal section */}
        {parentAmbition && (
          <div className="flex h-2 items-center w-full">
            <div className="flex flex-1 gap-0_5 h-2 items-center min-h-px min-w-px">
              {/* Icon Button - rotated and flipped */}
              <div className="flex items-center justify-center size-2">
                <div className="rotate-90 scale-y-[-100%]">
                  <button className="flex items-center justify-center p-0_25 rounded-full hover:bg-neutral-100 transition-colors">
                    <CornerDownRight className="size-1_5 text-neutral-1000" />
                  </button>
                </div>
              </div>

              {/* Laddered goal description */}
              <Typography
                variant="body"
                className="flex-1 min-h-px min-w-px overflow-hidden text-ellipsis text-neutral-600"
              >
                {parentAmbition.title}
              </Typography>
            </div>
          </div>
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {/* Goal Header section */}
        <div className="bg-neutral-100 flex gap-3 items-center p-2 rounded-1_5 w-full">
          {/* Left section - Title and metadata */}
          <div className="flex flex-1 flex-col gap-2 items-start min-h-px min-w-px">
            {/* Title and Icon */}
            <div className="flex gap-1 h-4 items-center w-full">
              {/* Goal Type Icon with gradient background */}
              {ambitionType && (
                <div className="bg-gradient-to-l from-[#5577f4] to-[#d061ff] flex items-center justify-center p-0_625 rounded-full shrink-0 size-3">
                  {GoalTypeIcons[ambitionType as keyof typeof GoalTypeIcons] || (
                    <Target className="size-1_5 text-neutral-0" />
                  )}
                </div>
              )}

              {/* Goal Title */}
              <Typography variant="h5" className="overflow-hidden text-ellipsis shrink-0">
                {title}
              </Typography>
            </div>

            {/* Metadata row */}
            <div className="flex gap-1 h-1_5 items-center pl-4 w-full">
              {/* Created by */}
              <div className="flex gap-0_5 items-center justify-end shrink-0">
                <Image
                  src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 24 })}
                  alt={userName}
                  width={24}
                  height={24}
                  className="size-1_5 rounded-full"
                />
                <Typography variant="bodySmall" className="text-neutral-600">
                  {t('metadata.createdBy')} <span className="font-bold">{userName}</span>{' '}
                  {t('metadata.on')} <span className="font-bold">10/08/2025</span>
                </Typography>
              </div>

              {/* Divider */}
              <div className="bg-neutral-300 h-1 w-px shrink-0" />

              {/* Assigned to */}
              <div className="flex gap-0_5 items-center justify-end shrink-0">
                <Image
                  src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 24 })}
                  alt={userName}
                  width={24}
                  height={24}
                  className="size-1_5 rounded-full"
                />
                <Typography variant="bodySmall" className="text-neutral-600">
                  {t('metadata.assignedTo')} <span className="font-bold">{userName}</span>
                </Typography>
              </div>

              {/* Divider */}
              <div className="bg-neutral-300 h-1 w-px shrink-0" />

              {/* Last Update */}
              <Typography
                variant="bodySmall"
                className="text-neutral-600 overflow-hidden text-ellipsis shrink-0"
              >
                {t('metadata.lastUpdate')} <span className="font-bold">10/08/2025, 10:15 am</span>
              </Typography>
            </div>
          </div>

          {/* Right section - Progress metrics */}
          <div className="flex items-center justify-end shrink-0">
            <div className="bg-neutral-100 flex gap-1 h-4_5 items-center justify-end p-0_75 rounded-1 shrink-0">
              {/* Progress Ring */}
              <ProgressRing progress={progress} size={64} strokeWidth={6} />

              {/* Data */}
              <div className="flex flex-col gap-0_5 items-end justify-center shrink-0">
                <div className="flex gap-0_5 items-center">
                  <Typography variant="h5" className="text-neutral-1000">
                    {progress}%
                  </Typography>
                  {/* Tooltip button */}
                  <button className="relative group" aria-label={t('progress.fullLaddering')}>
                    <Info className="size-1 text-neutral-600 hover:text-neutral-1000 transition-colors" />
                    {/* Tooltip - shown on hover */}
                    <div className="absolute bottom-full right-0 mb-0_5 hidden group-hover:flex flex-col items-center pointer-events-none">
                      <div className="bg-neutral-1000 px-0_5 py-0_375 rounded-0_25 shadow-lg">
                        <Typography
                          variant="bodyTiny"
                          className="text-neutral-0 text-center whitespace-nowrap"
                        >
                          {t('progress.fullLaddering')}
                        </Typography>
                      </div>
                      <div
                        className="w-1 h-0_25 bg-neutral-1000"
                        style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                      />
                    </div>
                  </button>
                </div>
                <Typography variant="bodySmall" className="text-neutral-500">
                  {t('progress.completed')}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
