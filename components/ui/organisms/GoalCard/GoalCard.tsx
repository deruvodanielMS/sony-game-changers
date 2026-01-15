'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import { Collapsible } from 'radix-ui'
import { ChevronDown, Shrub } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Card } from '@/components/ui/atoms/Card/Card'
import { GoalCardProps } from './GoalCard.types'
import { CornerDownRight, Plus, BriefcaseBusiness, Sprout } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import { GoalStatus } from '@/components/ui/molecules/GoalStatus/GoalStatus'
import { cn } from '@/utils/cn'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'
import { AMBITION_TYPES, AmbitionStatus } from '@/domain/ambition'
import { LadderingModal } from '@/components/ui/organisms/LadderingModal'
import { ROUTES } from '@/common/routes'

const GoalTypeIcons = {
  [AMBITION_TYPES.BUSINESS]: <Sprout width={20} />,
  [AMBITION_TYPES.MANAGER_EFFECTIVENESS]: <BriefcaseBusiness width={20} />,
  [AMBITION_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: <Shrub width={20} />,
}

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.01 },
}

const collapsibleContentVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: 'auto' },
}

export function GoalCard({
  goal,
  ladderGoals,
  allowAddChildrenGoals,
  'data-testid': dataTestId,
}: GoalCardProps) {
  const [open, setOpen] = useState(false)
  const [isLadderingModalOpen, setIsLadderingModalOpen] = useState(false)
  const t = useTranslations('GoalCard')

  const { id, description, title, avatarUrl, ambitionType, status, userName } = goal
  const hasChildrenGoals = ladderGoals.length

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
      <Card data-testid={dataTestId} className="flex flex-col gap-1_5 items-stretch relative">
        {description && (
          <button
            onClick={handleOpenLadderingModal}
            className={cn(
              'h-2 flex items-center gap-0_5 w-full text-left',
              'hover:text-neutral-800 transition-colors',
              'cursor-pointer group',
            )}
            aria-label={t('openLadderingModalLabel')}
          >
            <CornerDownRight width={20} className="shrink-0" />
            <Typography color="neutral600" className="truncate group-hover:text-neutral-800">
              {description}
            </Typography>
          </button>
        )}
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger asChild disabled={!hasChildrenGoals}>
            <div className={cn('flex items-center gap-0_5', hasChildrenGoals && 'cursor-pointer')}>
              {!!hasChildrenGoals && (
                <button className="IconButton cursor-pointer">
                  <ChevronDown
                    width={32}
                    className={cn(
                      'grow-0 shrink-0 transition-transform duration-300',
                      open && 'rotate-180',
                    )}
                  />
                </button>
              )}
              <div
                className={cn(
                  'w-full flex gap-1 items-center max-sm:flex-wrap',
                  !hasChildrenGoals ? 'ml-3' : '',
                )}
              >
                <div
                  className="relative shrink-0"
                  style={{ width: ambitionType ? '72px' : '48px' }}
                >
                  <Image
                    src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 48 })}
                    alt={userName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {ambitionType && (
                    <div className="absolute top-0 -right-0_25 w-12 h-12 bg-neutral-100 rounded-full text-neutral-1000 flex items-center justify-center">
                      {GoalTypeIcons[ambitionType as keyof typeof GoalTypeIcons]}
                    </div>
                  )}
                </div>
                <Link
                  href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
                  className="flex-1 max-sm:order-last max-sm:basis-full hover:text-accent-primary transition-colors"
                >
                  <Typography variant="h6">{title}</Typography>
                </Link>
                <GoalStatus status={status as AmbitionStatus} className="shrink-0 font-bold" />
              </div>
            </div>
          </Collapsible.Trigger>

          <Collapsible.Content className="overflow-hidden" asChild>
            <m.div
              layout
              variants={collapsibleContentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="ml-2 pl-0_5 flex flex-col gap-1 pt-1"
            >
              {ladderGoals.map((ladderGoal) => (
                <div key={ladderGoal.id} className="flex gap-1 items-center max-sm:flex-wrap">
                  <CornerDownRight width={16} className="text-neutral-600" />
                  <Image
                    src={
                      ladderGoal.avatarUrl ||
                      generateInitialsAvatarSrc(ladderGoal.userName, { size: 40 })
                    }
                    alt={ladderGoal.userName}
                    width={48}
                    height={48}
                    className="rounded-full shrink-0 grow-0"
                  />
                  <Typography
                    className="grow-1 basis-1 max-sm:order-last max-sm:basis-full max-sm:border-b max-sm:border-neutral-300 max-sm:pb-1"
                    color="neutral600"
                    variant="body"
                  >
                    {ladderGoal.title}
                  </Typography>
                  <GoalStatus status={ladderGoal.status as AmbitionStatus} className="grow-0" />
                </div>
              ))}
            </m.div>
          </Collapsible.Content>
        </Collapsible.Root>
        {(allowAddChildrenGoals || !!hasChildrenGoals) && (
          <div
            className={cn(
              'flex ml-2 pl-0_5 items-center',
              allowAddChildrenGoals && hasChildrenGoals && 'justify-between',
              !allowAddChildrenGoals && hasChildrenGoals && 'justify-end',
              allowAddChildrenGoals && !hasChildrenGoals && 'justify-start',
            )}
          >
            {allowAddChildrenGoals && (
              <Button variant={'plain'} leftIcon={<Plus width={20} />}>
                {t('addLadderedGoalLabel')}
              </Button>
            )}
            {!!hasChildrenGoals && (
              <Typography color="neutral600">
                {t('childrenGoalsLabel', { goals: hasChildrenGoals })}
              </Typography>
            )}
          </div>
        )}

        <LadderingModal
          open={isLadderingModalOpen}
          onClose={handleCloseLadderingModal}
          selectedGoal={goal}
        />
      </Card>
    </m.div>
  )
}
