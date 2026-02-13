'use client'

import { use, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { MoreHorizontal, Pencil, Archive, ArchiveRestore } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { Skeleton } from '@/components/ui/atoms/Skeleton'
import { Card } from '@/components/ui/atoms/Card'
import { Breadcrumb } from '@/components/ui/molecules/Breadcrumb'
import { HigherAmbition } from '@/components/ui/molecules/HigherAmbition'
import { Button } from '@/components/ui/atoms/Button'
import { DropdownMenu } from '@/components/ui/atoms/DropdownMenu'
import { AmbitionDetailHeader } from '@/components/game-changers/ambitions/AmbitionDetailHeader'
import { AmbitionActions } from '@/components/game-changers/ambitions/AmbitionActions'
import { AmbitionAchievements } from '@/components/game-changers/ambitions/AmbitionAchievements'
import { AmbitionLaddering } from '@/components/game-changers/ambitions/AmbitionLaddering'
import { AmbitionActivityFeed } from '@/components/game-changers/ambitions/AmbitionActivityFeed'
import { NewAmbitionModal } from '@/components/game-changers/ambitions/NewAmbitionModal'
import { EditAmbitionModal } from '@/components/game-changers/ambitions/EditAmbitionModal'
import {
  SendForApprovalModal,
  ArchiveAmbitionModal,
  SendBackModal,
  ApproveAmbitionModal,
} from '@/components/game-changers/ambitions/AmbitionActionModals'
import { useGoalsStore } from '@/stores/goals.store'
import { useUIStore } from '@/stores/ui.store'
import { ROUTES } from '@/common/routes'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { mockAvatarOptions, mockActivityFeed } from '@/repositories/mocks/MockRepository'
import { GOAL_STATUSES } from '@/domain/goal'
import { useDateFormat } from '@/hooks/useDateFormat'

export default function AmbitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations('AmbitionDetail')
  const tModals = useTranslations('AmbitionModals')
  const { id } = use(params)
  const { fetchGoal, fetchGoalFilters, selected, selectGoal, updateGoalStatus } = useGoalsStore()
  const { enqueueToast } = useUIStore()
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const { formatDate, formatDateTime } = useDateFormat()
  const [isNewAmbitionOpen, setIsNewAmbitionOpen] = useState(false)
  const [isEditAmbitionOpen, setIsEditAmbitionOpen] = useState(false)

  // Modal states
  const [isSendForApprovalOpen, setIsSendForApprovalOpen] = useState(false)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [isSendBackOpen, setIsSendBackOpen] = useState(false)
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)

  useEffect(() => {
    fetchGoal(id)
    fetchGoalFilters() // Load filters for NewAmbitionModal
    return () => {
      selectGoal(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Action handlers
  const handleSendForApproval = async (comment?: string) => {
    setIsActionLoading(true)
    try {
      const success = await updateGoalStatus(id, GOAL_STATUSES.AWAITING_APPROVAL, comment)
      if (success) {
        enqueueToast({
          id: `send-approval-${Date.now()}`,
          title: tModals('sendForApproval.successMessage'),
          variant: 'success',
          duration: 3000,
        })
        setIsSendForApprovalOpen(false)
      } else {
        enqueueToast({
          id: `send-approval-error-${Date.now()}`,
          title: tModals('sendForApproval.errorMessage'),
          variant: 'error',
          duration: 3000,
        })
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleArchive = async () => {
    setIsActionLoading(true)
    try {
      const success = await updateGoalStatus(id, GOAL_STATUSES.ARCHIVED)
      if (success) {
        enqueueToast({
          id: `archive-${Date.now()}`,
          title: tModals('archive.successMessage'),
          variant: 'success',
          duration: 3000,
        })
        setIsArchiveOpen(false)
      } else {
        enqueueToast({
          id: `archive-error-${Date.now()}`,
          title: tModals('archive.errorMessage'),
          variant: 'error',
          duration: 3000,
        })
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleUnarchive = async () => {
    setIsActionLoading(true)
    try {
      const success = await updateGoalStatus(id, GOAL_STATUSES.DRAFT)
      if (success) {
        enqueueToast({
          id: `unarchive-${Date.now()}`,
          title: tModals('unarchive.successMessage'),
          variant: 'success',
          duration: 3000,
        })
      } else {
        enqueueToast({
          id: `unarchive-error-${Date.now()}`,
          title: tModals('unarchive.errorMessage'),
          variant: 'error',
          duration: 3000,
        })
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleSendBack = async (comment?: string) => {
    setIsActionLoading(true)
    try {
      const success = await updateGoalStatus(id, GOAL_STATUSES.DRAFT, comment)
      if (success) {
        enqueueToast({
          id: `send-back-${Date.now()}`,
          title: tModals('sendBack.successMessage'),
          variant: 'success',
          duration: 3000,
        })
        setIsSendBackOpen(false)
      } else {
        enqueueToast({
          id: `send-back-error-${Date.now()}`,
          title: tModals('sendBack.errorMessage'),
          variant: 'error',
          duration: 3000,
        })
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleApprove = async (comment?: string) => {
    setIsActionLoading(true)
    try {
      const success = await updateGoalStatus(id, GOAL_STATUSES.APPROVED, comment)
      if (success) {
        enqueueToast({
          id: `approve-${Date.now()}`,
          title: tModals('approve.successMessage'),
          variant: 'success',
          duration: 3000,
        })
        setIsApproveOpen(false)
      } else {
        enqueueToast({
          id: `approve-error-${Date.now()}`,
          title: tModals('approve.errorMessage'),
          variant: 'error',
          duration: 3000,
        })
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  if (!selected) {
    return (
      <div className="flex flex-col w-full">
        {/* Top section: Breadcrumb, LadderGoal, Header */}
        <div className="flex flex-col gap-1.5 w-full">
          <AnimatedSection delay={0}>
            {/* Breadcrumb skeleton */}
            <nav aria-label={t('breadcrumb.loadingBreadcrumbNavigation')}>
              <span className="sr-only">{t('breadcrumb.loadingBreadcrumbNavigation')}</span>
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

  const {
    title,
    userName,
    avatarUrl,
    goalType,
    ladderedGoals,
    status,
    goalAchievements,
    goalActions,
    progress,
    createdAt,
    updatedAt,
    parent,
  } = selected

  // Calculate progress based on laddered goals completion

  // Determine which action buttons to show based on status
  const showApprovalActions = status === GOAL_STATUSES.AWAITING_APPROVAL
  const showSendForApproval = status === GOAL_STATUSES.DRAFT
  const isArchived = status === GOAL_STATUSES.ARCHIVED
  const isApproved = status === GOAL_STATUSES.APPROVED
  // Show action buttons for draft, awaiting approval, approved, and archived states
  const showAnyActions = showApprovalActions || showSendForApproval || isApproved || isArchived

  // Dropdown menu items - when archived, only show Unarchive option
  const dropdownItems = isArchived
    ? [
        {
          label: t('actions.unarchive'),
          icon: <ArchiveRestore />,
          onClick: handleUnarchive,
        },
      ]
    : [
        {
          label: t('actions.edit'),
          icon: <Pencil />,
          onClick: () => {
            setIsEditAmbitionOpen(true)
          },
        },
        {
          label: t('actions.archive'),
          icon: <Archive />,
          variant: 'danger' as const,
          onClick: () => {
            setIsArchiveOpen(true)
          },
        },
      ]

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
              <div
                className={`flex flex-wrap gap-0.5 items-center ${
                  isMobile ? 'w-full h-auto' : 'h-2.5'
                }`}
              >
                {/* Awaiting Approval: Send Back + Approve buttons */}
                {showApprovalActions && (
                  <>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => setIsSendBackOpen(true)}
                    >
                      {t('actions.sendBack')}
                    </Button>
                    <Button variant="primary" size="small" onClick={() => setIsApproveOpen(true)}>
                      {t('actions.approve')}
                    </Button>
                  </>
                )}

                {/* Draft: Send for Approval button */}
                {showSendForApproval && (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsSendForApprovalOpen(true)}
                  >
                    {t('actions.sendForApproval')}
                  </Button>
                )}

                {/* More Options Dropdown */}
                <DropdownMenu
                  trigger={
                    <button
                      className="flex items-center justify-center p-0.25 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label={t('actions.moreOptions')}
                    >
                      <MoreHorizontal className="size-1.5 text-neutral-1000" />
                    </button>
                  }
                  items={dropdownItems}
                />
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Higher Ambition section - Shows parent goal */}
        {parent && (
          <AnimatedSection delay={0.05}>
            <HigherAmbition text={parent.title} goalType={goalType} />
          </AnimatedSection>
        )}

        {/* Goal Header section */}
        <AnimatedSection delay={0.1}>
          <AmbitionDetailHeader
            title={title}
            userName={userName}
            avatarUrl={avatarUrl || undefined}
            ambitionType={goalType}
            status={status}
            progress={progress}
            createdDate={formatDate(createdAt)}
            updatedDate={formatDateTime(updatedAt)}
          />
        </AnimatedSection>
      </div>

      {/* Content sections with 64px spacing */}
      <div className="flex flex-col gap-4 w-full mt-4">
        {/* Actions Section */}
        <AnimatedSection delay={0.15}>
          <AmbitionActions actions={goalActions || []} defaultOpen={true} />
        </AnimatedSection>

        {/* Achievements Section */}
        <AnimatedSection delay={0.2}>
          <AmbitionAchievements achievements={goalAchievements || []} defaultOpen={true} />
        </AnimatedSection>

        {/* Laddered Ambitions Section */}
        <AnimatedSection delay={0.25}>
          <AmbitionLaddering
            ambitions={ladderedGoals}
            avatarOptions={mockAvatarOptions}
            onAddAmbition={() => setIsNewAmbitionOpen(true)}
          />
        </AnimatedSection>

        {/* Activity Feed Section */}
        <AnimatedSection delay={0.3}>
          <AmbitionActivityFeed activities={mockActivityFeed} />
        </AnimatedSection>
      </div>

      <NewAmbitionModal
        open={isNewAmbitionOpen}
        onClose={() => setIsNewAmbitionOpen(false)}
        parentAmbitionId={id}
      />

      <EditAmbitionModal
        open={isEditAmbitionOpen}
        onClose={() => setIsEditAmbitionOpen(false)}
        goal={selected}
      />

      {/* Action Modals */}
      <SendForApprovalModal
        open={isSendForApprovalOpen}
        onClose={() => setIsSendForApprovalOpen(false)}
        onConfirm={handleSendForApproval}
        isLoading={isActionLoading}
      />
      <ArchiveAmbitionModal
        open={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onConfirm={handleArchive}
        isLoading={isActionLoading}
      />
      <SendBackModal
        open={isSendBackOpen}
        onClose={() => setIsSendBackOpen(false)}
        onConfirm={handleSendBack}
        isLoading={isActionLoading}
      />
      <ApproveAmbitionModal
        open={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleApprove}
        isLoading={isActionLoading}
      />
    </div>
  )
}
