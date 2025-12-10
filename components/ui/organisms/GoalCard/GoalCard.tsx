'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Collapsible } from 'radix-ui'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@/components/ui/atoms/Card/Card'
import { GoalCardProps } from './GoalCard.types'
import { CornerDownRight, Plus, BriefcaseBusiness, Sprout } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import { GoalStatus } from '@/components/ui/molecules/GoalStatus/GoalStatus'
import { cn } from '@/utils/cn'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'
import { GOAL_TYPES } from '@/types/goals'

const GoalTypeIcons = {
  [GOAL_TYPES.PERSONAL]: <Sprout width={20} />,
  [GOAL_TYPES.TEAM]: <BriefcaseBusiness width={20} />,
}

export function GoalCard({
  goal,
  ladderGoals,
  allowAddChildrenGoals,
  'data-testid': dataTestId,
}: GoalCardProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('GoalCard')

  const { description, title, avatarUrl, goalType, status, userName } = goal
  const hasChildrenGoals = ladderGoals.length

  return (
    <Card data-testid={dataTestId} className="flex flex-col gap-1_5 items-stretch">
      {description && (
        <div className="h-2 flex items-center gap-0_5">
          <CornerDownRight width={20} />
          <Typography color="neutral600" className="truncate">
            {description}
          </Typography>
        </div>
      )}
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-0_5">
          <Collapsible.Trigger asChild>
            {!!hasChildrenGoals && (
              <button className="IconButton">
                {open ? (
                  <ChevronUp width={32} className="grow-0 shrink-0" />
                ) : (
                  <ChevronDown width={32} className="grow-0 shrink-0" />
                )}
              </button>
            )}
          </Collapsible.Trigger>
          <div
            className={cn(
              'w-full flex gap-3 items-center relative max-sm:flex-wrap',
              goalType ? 'gap-3' : 'gap-1',
              !hasChildrenGoals ? 'ml-3' : '',
            )}
          >
            <Image
              src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 48 })}
              alt={userName}
              width={48}
              height={48}
              className="rounded-full shrink-0 grow-0"
            />
            {goalType && (
              <div className="w-3 h-3 absolute top-[50%] left-[32px] -mt-1_5 bg-neutral-100 rounded-full text-neutral-1000 flex items-center justify-center">
                {GoalTypeIcons[goalType]}
              </div>
            )}
            <Typography className="grow-1 basis-1 max-sm:order-last max-sm:basis-full" variant="h6">
              {title}
            </Typography>
            <GoalStatus status={status} className="grow-0 font-bold" />
          </div>
        </div>

        <Collapsible.Content asChild>
          <div className="ml-2 pl-0_5 flex flex-col gap-1 pt-1">
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
                <GoalStatus status={ladderGoal.status} className="grow-0" />
              </div>
            ))}
          </div>
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
    </Card>
  )
}
