'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import { Plus, Link as LinkIcon } from 'lucide-react'
import { Card } from '@/components/ui/atoms/Card/Card'
import { GoalCardProps } from './GoalCard.types'
import { Typography } from '@/components/ui/foundations/Typography'
import { HigherAmbition } from '@/components/ui/molecules/HigherAmbition'
import { Arrow } from '@/components/ui/atoms/Arrow'
import { GoalStatus } from '@/components/ui/molecules/GoalStatus'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'
import { GoalStatus as GoalStatusType } from '@/domain/goal'
import { ROUTES } from '@/common/routes'
import { useUIStore } from '@/stores/ui.store'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { ModalHeader, ModalBody } from '@/components/ui/molecules/Modal'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import { MainAmbition } from '@/components/game-changers/ambitions/MainAmbition'
import { LadderedAmbition } from '@/components/game-changers/ambitions/LadderedAmbition'

const cardHoverVariants = {
  rest: {},
  hover: {},
}

// Map ambition status to Badge variant (using status-specific variants)
const statusToBadgeVariant = (
  status: GoalStatusType,
): 'draft' | 'awaiting-approval' | 'completed' | 'default' => {
  const statusMap: Record<GoalStatusType, 'draft' | 'awaiting-approval' | 'completed'> = {
    draft: 'draft',
    awaiting_approval: 'awaiting-approval',
    completed: 'completed',
  }
  return statusMap[status] || 'default'
}

export function GoalCard({
  goal,
  ladderGoals,
  allowAddChildrenGoals,
  'data-testid': dataTestId,
}: GoalCardProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('GoalCard')
  const tGoals = useTranslations('Goals')
  const tLaddering = useTranslations('LadderingModal')
  const { openModal, openDrawer, closeModal, closeDrawer } = useUIStore()
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

  const { id, title, avatarUrl, goalType, status, userName, parent } = goal
  const hasChildrenGoals = ladderGoals.length

  const handleOpenLadderingModal = () => {
    // Mock data - in real implementation, these would come from props or API
    const ambitions = [
      {
        id: 'division',
        avatarUrl: '',
        userName: 'James Miller',
        title: tLaddering('divisionAmbitionLabel'),
      },
      {
        id: 'team',
        avatarUrl: '',
        userName: 'Jürgen Schneider',
        title: tLaddering('teamAmbitionLabel'),
      },
    ]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleLink = (ambitionId: string) => {
      // TODO: Implement link logic with API call
    }

    // Shared content
    const content = (
      <div className="flex flex-col gap-1_5">
        {/* Ambition Cards */}
        <div className="flex flex-col sm:flex-row gap-1_5 items-stretch w-full">
          {ambitions.map((ambition) => (
            <div
              key={ambition.id}
              className="flex-1 min-w-0 w-full sm:w-auto bg-neutral-100 border-2 border-neutral-200 rounded-3xl p-1_5 flex flex-col gap-1 items-start justify-center"
            >
              <div className="flex gap-1 items-start w-full">
                <Image
                  src={
                    ambition.avatarUrl || generateInitialsAvatarSrc(ambition.userName, { size: 48 })
                  }
                  alt={ambition.userName}
                  width={48}
                  height={48}
                  className="rounded-full shrink-0"
                />
                <button
                  onClick={() => handleLink(ambition.id)}
                  aria-label={tLaddering('linkButtonAriaLabel')}
                  className="shrink-0 w-3 h-3 flex items-center justify-center bg-neutral-200 rounded-full p-0_75 hover:bg-neutral-300 transition-colors"
                >
                  <LinkIcon className="w-1_5 h-1_5" />
                </button>
              </div>
              <Typography variant="body" className="font-bold text-neutral-800 w-full">
                {ambition.title}
              </Typography>
            </div>
          ))}
        </div>

        {/* Goal Preview */}
        <div className="w-full bg-neutral-0 border border-neutral-300 rounded-3xl p-1_5 flex flex-col gap-1">
          <Typography variant="body" className="text-neutral-1000 w-full">
            {title}
          </Typography>
          <div className="flex gap-0_5 items-center w-full h-3">
            <div className="flex-1 min-w-0 flex gap-1 items-center h-2_5">
              <Image
                src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 40 })}
                alt={userName}
                width={40}
                height={40}
                className="rounded-full shrink-0"
              />
              <Typography
                variant="body"
                className="font-bold text-neutral-1000 truncate flex-1 min-w-0"
              >
                {userName}
              </Typography>
            </div>
            <GoalStatus status={status as GoalStatusType} className="shrink-0" />
          </div>
        </div>
      </div>
    )

    if (isMobile) {
      openDrawer(content, {
        title: tLaddering('title'),
        position: 'bottom',
        size: 'lg',
        overlayClose: true,
        showClose: true,
        hideCloseOnMobile: true,
        onClose: closeDrawer,
      })
    } else {
      const modalContent = (
        <>
          <ModalHeader showClose onClose={closeModal}>
            <Typography variant="h5">{tLaddering('title')}</Typography>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-1_5">{content}</ModalBody>
        </>
      )
      openModal(modalContent, {
        size: 'lg',
        overlayClose: true,
        onClose: closeModal,
      })
    }
  }

  return (
    <m.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.2 }}
      className="isolate"
    >
      <Card data-testid={dataTestId} className="flex flex-col gap-1_5 items-stretch relative">
        {/* Higher Ambition Section */}
        {parent && (
          <div className="flex flex-col items-start w-full">
            <HigherAmbition
              text={parent.title}
              goalType={goal.goalType}
              onClick={handleOpenLadderingModal}
            />
            <Arrow type="Higher top" className="h-1 w-2 overflow-hidden shrink-0" />
          </div>
        )}

        {/* Main Ambition Section */}
        <MainAmbition
          title={title}
          userName={userName}
          avatarUrl={avatarUrl}
          goalType={goalType}
          progress={goal.progress}
          href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
          showLadderedIndicator={!!hasChildrenGoals}
        />

        {/* Laddered Goals Section */}
        {open && hasChildrenGoals && (
          <div className="flex flex-col items-start w-full">
            {ladderGoals.map((ladderGoal, index) => {
              const isLast = index === ladderGoals.length - 1
              const arrowType = isLast ? 'Laddered bottom' : 'Laddered middle'

              return (
                <LadderedAmbition
                  key={ladderGoal.id}
                  title={ladderGoal.title}
                  userName={ladderGoal.userName}
                  avatarUrl={ladderGoal.avatarUrl}
                  progress={ladderGoal.progress}
                  status={ladderGoal.status}
                  statusLabel={tGoals(`status.${ladderGoal.status}`)}
                  statusVariant={statusToBadgeVariant(ladderGoal.status as GoalStatusType)}
                  arrowType={arrowType}
                  href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(ladderGoal.id)}
                />
              )
            })}
          </div>
        )}

        {/* Bottom Section */}
        {(allowAddChildrenGoals || !!hasChildrenGoals) && (
          <div className="flex items-center justify-between w-full">
            {/* Left side */}
            <div className="flex gap-1 items-center">
              {allowAddChildrenGoals && (
                <Button variant={'link'} leftIcon={<Plus width={20} />}>
                  {t('addLadderedGoalLabel')}
                </Button>
              )}
              {!!hasChildrenGoals && (
                <Typography variant="bodySmall" color="neutral600">
                  {t('childrenGoalsLabel', { goals: hasChildrenGoals })}
                </Typography>
              )}
            </div>

            {/* Right side: Toggle button */}
            {!!hasChildrenGoals && (
              <Button variant="link" onClick={() => setOpen(!open)}>
                {open ? t('hideLadderedGoalsLabel') : t('viewLadderedGoalsLabel')}
              </Button>
            )}
          </div>
        )}
      </Card>
    </m.div>
  )
}
