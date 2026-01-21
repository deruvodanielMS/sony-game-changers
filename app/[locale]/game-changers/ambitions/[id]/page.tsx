'use client'

import { use, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { MoreHorizontal } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Skeleton } from '@/components/ui/atoms/Skeleton'
import { Card } from '@/components/ui/atoms/Card'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
import { LadderGoal } from '@/components/ui/molecules/LadderGoal'
import { Button } from '@/components/ui/atoms/Button'
import { AmbitionDetailHeader } from '@/components/game-changers/ambitions/AmbitionDetailHeader'
import { AmbitionActions } from '@/components/game-changers/ambitions/AmbitionActions'
import { AmbitionAchievements } from '@/components/game-changers/ambitions/AmbitionAchievements'
import { AmbitionLaddering } from '@/components/game-changers/ambitions/AmbitionLaddering'
import { AmbitionActivityFeed } from '@/components/game-changers/ambitions/AmbitionActivityFeed'
import { useAmbitionsStore } from '@/stores/ambitions.store'
import { ROUTES } from '@/common/routes'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import {
  mockAchievements,
  mockLadderedAmbitions,
  mockAvatarOptions,
  mockActivityFeed,
  mockActions,
} from './mockData'

export default function AmbitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('AmbitionDetail')
  const { id } = use(params)
  const { list, fetchList, selected, selectAmbition } = useAmbitionsStore()
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

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
      <div className="flex flex-col w-full">
        {/* Top section: Breadcrumb, LadderGoal, Header */}
        <div className="flex flex-col gap-1.5 w-full">
          <AnimatedSection delay={0}>
            {/* Breadcrumb skeleton */}
            <nav aria-label={t('loadingBreadcrumbNavigation')}>
              <span className="sr-only">{t('loadingBreadcrumbNavigation')}</span>
              <div className="flex items-center gap-0.5" aria-hidden="true">
                <Skeleton width="80px" height="16px" />
                <Skeleton width="16px" height="16px" />
                <Skeleton width="60px" height="16px" />
              </div>
            </nav>
          </AnimatedSection>

          {/* Laddered Goal skeleton */}
          <AnimatedSection delay={0.05}>
            <div className="w-full bg-neutral-100 border-2 border-neutral-200 rounded-3xl p-1.5 flex items-center gap-1">
              <Skeleton variant="circular" width="24px" height="24px" />
              <Skeleton width="60%" height="16px" />
            </div>
          </AnimatedSection>

          {/* Header skeleton */}
          <AnimatedSection delay={0.1}>
            <Card className="flex flex-col gap-1.5 p-1.5">
              {/* Title and user info */}
              <div className="flex flex-col gap-1">
                <Skeleton width="80%" height="24px" />
                <div className="flex items-center gap-0.5">
                  <Skeleton variant="circular" width="32px" height="32px" />
                  <Skeleton width="120px" height="16px" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between">
                  <Skeleton width="60px" height="14px" />
                  <Skeleton width="40px" height="14px" />
                </div>
                <Skeleton width="100%" height="8px" />
              </div>

              {/* Dates */}
              <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1">
                <Skeleton width="150px" height="14px" />
                <Skeleton width="180px" height="14px" />
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Content sections */}
        <div className="flex flex-col gap-4 w-full mt-4">
          {/* Actions Section skeleton */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-col gap-1">
              <Skeleton width="100px" height="20px" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {[1, 2, 3].map((i) => (
                  <Card key={`action-skeleton-${i}`} className="p-1.5 flex flex-col gap-0.75">
                    <Skeleton width="120px" height="18px" />
                    <Skeleton width="100%" height="40px" />
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Achievements Section skeleton */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-1">
              <Skeleton width="120px" height="20px" />
              <Card className="p-1.5">
                <div className="flex flex-col gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={`achievement-skeleton-${i}`}
                      className="flex items-center gap-0.75 py-0.5"
                    >
                      <Skeleton variant="circular" width="20px" height="20px" />
                      <Skeleton width="70%" height="16px" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </AnimatedSection>

          {/* Laddered Ambitions Section skeleton */}
          <AnimatedSection delay={0.25}>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <Skeleton width="160px" height="20px" />
                <div className="flex gap-0.5">
                  <Skeleton width="32px" height="32px" />
                  <Skeleton width="32px" height="32px" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {[1, 2, 3].map((i) => (
                  <Card key={`laddered-skeleton-${i}`} className="p-1.5 flex flex-col gap-1">
                    <div className="flex items-center gap-0.5">
                      <Skeleton variant="circular" width="32px" height="32px" />
                      <div className="flex-1 flex flex-col gap-0.25">
                        <Skeleton width="80%" height="16px" />
                        <Skeleton width="60%" height="14px" />
                      </div>
                    </div>
                    <Skeleton width="100%" height="40px" />
                    <Skeleton width="80px" height="20px" />
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Activity Feed Section skeleton */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col gap-1">
              <Skeleton width="100px" height="20px" />
              <div className="flex flex-col gap-0.75">
                {[1, 2, 3].map((i) => (
                  <Card key={`activity-skeleton-${i}`} className="p-1.5 flex gap-0.75">
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <Skeleton width="70%" height="16px" />
                      <Skeleton width="50%" height="14px" />
                      <Skeleton width="90%" height="14px" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    )
  }

  const { title, userName, avatarUrl, ambitionType, ladderedGoals, status } = selected
  const parentAmbition = ladderedGoals?.[0]

  // Calculate progress based on laddered goals completion
  const progress = 80 // Mock data - TODO: Calculate from actual completion

  // Determine which action buttons to show based on status
  const showApprovalActions = status === 'awaiting_approval'
  const showSendForApproval = status === 'draft'
  const showAnyActions = showApprovalActions || showSendForApproval

  const breadcrumbItems = [
    { label: t('breadcrumb.ambitions'), href: ROUTES.GAME_CHANGERS_AMBITIONS },
    { label: t('breadcrumb.detail') },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Top section: Breadcrumb, LadderGoal, Header with 24px spacing */}
      <div className="flex flex-col gap-1_5 w-full">
        <AnimatedSection delay={0}>
          {/* Breadcrumb and Main Actions */}
          <div
            className={`flex w-full ${isMobile ? 'flex-col gap-1' : 'items-center justify-between'}`}
          >
            <Breadcrumb items={breadcrumbItems} />

            {/* Main Actions */}
            {showAnyActions && (
              <div className={`flex gap-1 items-center ${isMobile ? 'h-auto' : 'h-2.5'}`}>
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
                  className="flex items-center justify-center p-0.25 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label={t('actions.moreOptions')}
                >
                  <MoreHorizontal className="size-1.5 text-neutral-1000" />
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Laddered Goal section */}
        {parentAmbition && (
          <AnimatedSection delay={0.05}>
            <LadderGoal text={parentAmbition.title} />
          </AnimatedSection>
        )}

        {/* Goal Header section */}
        <AnimatedSection delay={0.1}>
          <AmbitionDetailHeader
            title={title}
            userName={userName}
            avatarUrl={avatarUrl || undefined}
            ambitionType={ambitionType}
            progress={progress}
            createdDate="10/08/2025"
            updatedDate="10/08/2025, 10:15 am"
          />
        </AnimatedSection>
      </div>

      {/* Content sections with 64px spacing */}
      <div className="flex flex-col gap-4 w-full mt-4">
        {/* Actions Section */}
        <AnimatedSection delay={0.15}>
          <AmbitionActions actions={mockActions} />
        </AnimatedSection>

        {/* Achievements Section */}
        <AnimatedSection delay={0.2}>
          <AmbitionAchievements achievements={mockAchievements} />
        </AnimatedSection>

        {/* Laddered Ambitions Section */}
        <AnimatedSection delay={0.25}>
          <AmbitionLaddering ambitions={mockLadderedAmbitions} avatarOptions={mockAvatarOptions} />
        </AnimatedSection>

        {/* Activity Feed Section */}
        <AnimatedSection delay={0.3}>
          <AmbitionActivityFeed activities={mockActivityFeed} />
        </AnimatedSection>
      </div>
    </div>
  )
}
