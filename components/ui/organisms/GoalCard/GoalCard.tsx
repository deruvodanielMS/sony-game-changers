'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Card } from '@/components/ui/atoms/Card/Card'
import { GoalCardProps } from './GoalCard.types'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Badge } from '@/components/ui/atoms/Badge'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import { LadderGoal } from '@/components/ui/molecules/LadderGoal'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { cn } from '@/utils/cn'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'
import { AmbitionStatus } from '@/domain/ambition'
import { LadderingModal } from '@/components/ui/organisms/LadderingModal'
import { ROUTES } from '@/common/routes'

const cardHoverVariants = {
  rest: {},
  hover: {},
}

// Map ambition status to Badge variant (using status-specific variants)
const statusToBadgeVariant = (
  status: AmbitionStatus,
): 'draft' | 'awaiting-approval' | 'completed' | 'default' => {
  const statusMap: Record<AmbitionStatus, 'draft' | 'awaiting-approval' | 'completed'> = {
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
  const [isLadderingModalOpen, setIsLadderingModalOpen] = useState(false)
  const t = useTranslations('GoalCard')
  const tGoals = useTranslations('Goals')

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
        {description && <LadderGoal text={description} onClick={handleOpenLadderingModal} />}

        {hasChildrenGoals ? (
          <CollapsibleSection
            defaultOpen={false}
            open={open}
            onToggle={setOpen}
            contentClassName="gap-1 pt-1 pl-2"
            renderTrigger={(isOpen) => (
              <div className="flex items-center gap-0_5 cursor-pointer">
                <button className="IconButton cursor-pointer">
                  <ChevronDown
                    width={32}
                    className={cn(
                      'grow-0 shrink-0 transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
                <div className="w-full flex gap-1 items-center max-sm:flex-wrap">
                  <div
                    className="relative shrink-0"
                    style={{ width: ambitionType ? '72px' : '48px' }}
                  >
                    <Avatar src={avatarUrl} alt={userName} size="lg" />
                    {ambitionType && (
                      <div className="absolute top-0 -right-0_25">
                        <TypeIcon type={ambitionType} variant="badge" />
                      </div>
                    )}
                  </div>
                  <Link
                    href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
                    className="flex-1 max-sm:order-last max-sm:basis-full hover:text-accent-primary transition-colors"
                  >
                    <Typography variant="h6">{title}</Typography>
                  </Link>
                  <Badge variant={statusToBadgeVariant(status as AmbitionStatus)}>
                    {tGoals(`status.${status}`)}
                  </Badge>
                </div>
              </div>
            )}
          >
            {ladderGoals.map((ladderGoal) => (
              <LadderGoal key={ladderGoal.id} size="small" className="max-sm:flex-wrap">
                <Avatar src={ladderGoal.avatarUrl} alt={ladderGoal.userName} size="lg" />
                <Typography
                  className="flex-1 min-w-0 max-sm:order-last max-sm:basis-full max-sm:border-b max-sm:border-neutral-300 max-sm:pb-1"
                  color="neutral600"
                  variant="body"
                >
                  {ladderGoal.title}
                </Typography>
                <Badge variant={statusToBadgeVariant(ladderGoal.status as AmbitionStatus)}>
                  {tGoals(`status.${ladderGoal.status}`)}
                </Badge>
              </LadderGoal>
            ))}
          </CollapsibleSection>
        ) : (
          <div className="flex items-center gap-0_5">
            <div className="ml-3 w-full flex gap-1 items-center max-sm:flex-wrap">
              <div className="relative shrink-0" style={{ width: ambitionType ? '72px' : '48px' }}>
                <Avatar src={avatarUrl} alt={userName} size="lg" />
                {ambitionType && (
                  <div className="absolute top-0 -right-0_25">
                    <TypeIcon type={ambitionType} variant="badge" />
                  </div>
                )}
              </div>
              <Link
                href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
                className="flex-1 max-sm:order-last max-sm:basis-full hover:text-accent-primary transition-colors"
              >
                <Typography variant="h6">{title}</Typography>
              </Link>
              <Badge variant={statusToBadgeVariant(status as AmbitionStatus)}>
                {tGoals(`status.${status}`)}
              </Badge>
            </div>
          </div>
        )}
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
