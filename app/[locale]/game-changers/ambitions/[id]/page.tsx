'use client'

import { use, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { MoreHorizontal, CornerDownRight } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
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
import type { Achievement } from '@/components/game-changers/ambitions/AmbitionAchievements'
import type {
  LadderedAmbition,
  AvatarOption,
} from '@/components/game-changers/ambitions/AmbitionLaddering'
import type { ActivityItem } from '@/components/game-changers/ambitions/AmbitionActivityFeed'

export default function AmbitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('AmbitionDetail')
  const { id } = use(params)
  const { list, fetchList, selected, selectAmbition } = useAmbitionsStore()
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

  // Mock achievements data - TODO: Replace with real data from Prisma
  const achievements: Achievement[] = [
    {
      id: 1,
      text: 'Lead a cross-functional project',
      completed: true,
      progress: null,
    },
    {
      id: 2,
      text: 'Mentor a junior team member',
      completed: false,
      progress: null,
    },
    {
      id: 3,
      text: 'Complete advanced leadership training',
      completed: false,
      progress: null,
    },
  ]

  // Mock laddered ambitions data - TODO: Replace with real data from Prisma
  const ladderedAmbitions: LadderedAmbition[] = [
    {
      id: '1',
      title:
        'Optimize the cross-platform entitlement engine to ensure seamless delivery of digital service benefits to device owners.',
      assignee: {
        uid: '2',
        name: 'Lars van der Zee',
        avatar: '/profile-img/lars-van-der-zee.png',
      },
      progress: 33,
    },
    {
      id: '2',
      title:
        'Integrate all mandatory feedback from playtests into level design by the end of each sprint.',
      assignee: {
        uid: '5',
        name: 'Jürgen Schneider',
        avatar: '/profile-img/profile.png',
      },
      progress: 66,
    },
    {
      id: '3',
      title:
        'Scale the cross-platform entitlement engine to facilitate frictionless monetization and the automated provisioning of premium service tiers across the global device footprint.',
      assignee: {
        uid: '4',
        name: 'Amélie Martin',
        avatar: '/profile-img/sarah-miller.png',
      },
      progress: 33,
    },
  ]

  // Mock avatar options for filters
  const avatarOptions: AvatarOption[] = [
    { uid: '1', name: 'Nia Washington', url: '/profile-img/nia-washington.png' },
    { uid: '2', name: 'Lars van der Zee', url: '/profile-img/lars-van-der-zee.png' },
    { uid: '3', name: 'Kylie Davies', url: '/profile-img/kylie-davies.png' },
    { uid: '4', name: 'Sarah Miller', url: '/profile-img/sarah-miller.png' },
    { uid: '5', name: 'Profile', url: '/profile-img/profile.png' },
  ]

  // Mock activity feed data - TODO: Replace with real data from Prisma
  const activityFeed: ActivityItem[] = [
    {
      id: '1',
      user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
      action: 'completed',
      target: 'the Ambition',
      date: 'Dec 15, 2025',
    },
    {
      id: '2',
      user: { name: 'Rupert Sterling', avatar: '/profile-img/lars-van-der-zee.png' },
      action: 'approved',
      date: 'Dec 14, 2025',
    },
    {
      id: '3',
      user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
      action: 'statusChange',
      from: 'Draft',
      to: 'Awaiting Approval',
      date: 'Dec 13, 2025',
    },
    {
      id: '4',
      user: { name: 'James Miller', avatar: '/profile-img/profile.png' },
      action: 'created',
      status: 'Draft',
      date: 'Dec 10, 2025',
    },
  ]

  // Mock actions data - TODO: Replace with real data from Prisma
  const actions = [
    'Launch exclusive cross-platform content bundles that leverage internal media production assets to drive deeper user engagement within the ecosystem.',
    'Deploy unified loyalty programs that reward users for engagement across both physical and digital products while ensuring scalable backend integration.',
    'Enhance the global distribution infrastructure to ensure low-latency delivery of high-fidelity digital media across all regional server nodes efficiently.',
  ]

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
    <div className="flex flex-col gap-1.5 w-full">
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
          <div className="flex h-2 items-center w-full">
            <div className="flex flex-1 gap-0.5 h-2 items-center min-h-px min-w-px">
              {/* Icon Button - rotated and flipped */}
              <div className="flex items-center justify-center size-2">
                <div className="rotate-90 scale-y-[-100%]">
                  <button className="flex items-center justify-center p-0.25 rounded-full hover:bg-neutral-100 transition-colors">
                    <CornerDownRight className="size-1.5 text-neutral-1000" />
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

      {/* Actions Section */}
      <AnimatedSection delay={0.15}>
        <AmbitionActions actions={actions} />
      </AnimatedSection>

      {/* Achievements Section */}
      <AnimatedSection delay={0.2}>
        <AmbitionAchievements achievements={achievements} />
      </AnimatedSection>

      {/* Laddered Ambitions Section */}
      <AnimatedSection delay={0.25}>
        <AmbitionLaddering ambitions={ladderedAmbitions} avatarOptions={avatarOptions} />
      </AnimatedSection>

      {/* Activity Feed Section */}
      <AnimatedSection delay={0.3}>
        <AmbitionActivityFeed activities={activityFeed} />
      </AnimatedSection>
    </div>
  )
}
