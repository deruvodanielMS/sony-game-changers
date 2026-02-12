'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/atoms/Card/Card'
import { GoalCardProps } from './GoalCard.types'
import { Typography } from '@/components/ui/foundations/Typography'
import { HigherAmbition } from '@/components/ui/molecules/HigherAmbition'
import { Arrow } from '@/components/ui/atoms/Arrow'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'
import { GoalStatus as GoalStatusType } from '@/domain/goal'
import { ROUTES } from '@/common/routes'
import { MainAmbition } from '@/components/game-changers/ambitions/MainAmbition'
import { LadderedAmbition } from '@/components/game-changers/ambitions/LadderedAmbition'
import { LadderingModal } from '@/components/ui/organisms/LadderingModal'
import type { ParentAmbition } from '@/components/ui/organisms/LadderingModal'

const cardHoverVariants = {
  rest: {},
  hover: {},
}

// Map ambition status to AmbitionStatus variant
const statusToBadgeVariant = (
  status: GoalStatusType,
): 'draft' | 'awaiting-approval' | 'done' | 'default' => {
  const statusMap: Record<GoalStatusType, 'draft' | 'awaiting-approval' | 'done'> = {
    draft: 'draft',
    awaiting_approval: 'awaiting-approval',
    completed: 'done',
  }
  return statusMap[status] || 'default'
}

export function GoalCard({
  goal,
  ladderGoals,
  allowAddChildrenGoals,
  onAddLadderedGoal,
  parentAmbitions,
  'data-testid': dataTestId,
}: GoalCardProps) {
  const { id, title, avatarUrl, goalType, status, userName, parent } = goal
  const hasChildrenGoals = ladderGoals.length

  // Goals with laddered ambitions should be expanded by default
  const [open, setOpen] = useState(hasChildrenGoals > 0)
  const [isLadderingModalOpen, setIsLadderingModalOpen] = useState(false)
  const t = useTranslations('GoalCard')
  const tGoals = useTranslations('Goals')

  const handleOpenLadderingModal = () => {
    setIsLadderingModalOpen(true)
  }

  const handleCloseLadderingModal = () => {
    setIsLadderingModalOpen(false)
  }

  return (
    <m.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.2 }}
      className="isolate"
    >
      <Card
        data-testid={dataTestId}
        className="flex flex-col gap-0_25 items-stretch relative hover:hover:border-neutral-400 transition-colors"
      >
        {/* Higher Ambition Section with Arrow Connection */}
        {parent && (
          <div className="flex flex-col items-start w-full">
            {/* Parent ambition row */}
            <div
              className="flex items-start w-full cursor-pointer"
              onClick={handleOpenLadderingModal}
            >
              <HigherAmbition
                text={parent.title}
                goalType={goal.goalType}
                onClick={handleOpenLadderingModal}
              />
            </div>
            {/* Arrow connection: dot + curve in one continuous flow */}
            <div className="flex items-stretch w-full">
              <div className="flex flex-col items-center w-2 shrink-0">
                <Arrow type="Higher top" className="w-2 h-1 shrink-0" />
                <Arrow type="Higher bottom" className="w-2 h-2 shrink-0 -mt-[2px]" />
              </div>
              <div className="flex-1 min-w-0 flex items-end pb-0_5 mt-1 ml-0_5">
                <MainAmbition
                  title={title}
                  userName={userName}
                  avatarUrl={avatarUrl}
                  goalType={goalType}
                  progress={goal.progress}
                  href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
                  showLadderedIndicator={!!hasChildrenGoals}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Ambition Section (without parent) */}
        {!parent && (
          <MainAmbition
            title={title}
            userName={userName}
            avatarUrl={avatarUrl}
            goalType={goalType}
            progress={goal.progress}
            href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
            showLadderedIndicator={!!hasChildrenGoals}
          />
        )}

        {/* Laddered Goals Section */}
        {open && hasChildrenGoals && (
          <div className="flex flex-col items-start w-full">
            {/* Laddered top arrow with dot - connects MainAmbition to first LadderedAmbition */}
            <div className="flex items-start w-full pl-2_5">
              <Arrow type="Higher top" className="shrink-0 w-3" />
            </div>
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
          <div className="flex items-center justify-between w-full gap-0_5">
            {/* Left side */}
            <div className="flex gap-0_5 sm:gap-1 items-center min-w-0">
              {(allowAddChildrenGoals || !!hasChildrenGoals) && (
                <Button
                  variant={'link'}
                  size="small"
                  iconOnly
                  className="sm:hidden shrink-0 !h-auto"
                  onClick={onAddLadderedGoal}
                  aria-label={t('addLadderedGoalLabel')}
                >
                  <Plus width={20} />
                </Button>
              )}
              {(allowAddChildrenGoals || !!hasChildrenGoals) && (
                <Button
                  variant={'link'}
                  size="small"
                  leftIcon={<Plus width={20} />}
                  onClick={onAddLadderedGoal}
                  className="hidden sm:flex shrink-0 !h-auto"
                >
                  {t('addLadderedGoalLabel')}
                </Button>
              )}
              {!!hasChildrenGoals && (
                <Typography variant="bodySmall" color="textSecondary" className="hidden sm:block">
                  {t('childrenGoalsLabel', { goals: hasChildrenGoals })}
                </Typography>
              )}
              {!!hasChildrenGoals && (
                <Typography variant="bodySmall" color="textSecondary" className="sm:hidden">
                  {hasChildrenGoals}
                </Typography>
              )}
            </div>

            {/* Right side: Toggle button */}
            {!!hasChildrenGoals && (
              <Button
                variant="link"
                size="small"
                onClick={() => setOpen(!open)}
                className="shrink-0 !h-auto"
              >
                <span className="hidden sm:inline">
                  {open ? t('hideLadderedGoalsLabel') : t('viewLadderedGoalsLabel')}
                </span>
                <span className="sm:hidden">{open ? t('hideLabel') : t('viewLabel')}</span>
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Laddering Modal */}
      <LadderingModal
        open={isLadderingModalOpen}
        onClose={handleCloseLadderingModal}
        selectedGoal={goal}
        parentAmbitions={parentAmbitions}
        data-testid="laddering-modal"
      />
    </m.div>
  )
}
