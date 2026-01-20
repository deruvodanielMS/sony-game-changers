'use client'

import { use, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { MoreHorizontal } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
import { LadderGoal } from '@/components/ui/molecules/LadderGoal'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Typography } from '@/components/ui/foundations/Typography'
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
      <div className="flex flex-col gap-1.5 w-full">
        <AnimatedSection delay={0}>
          <Typography variant="body">Loading...</Typography>
        </AnimatedSection>
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
