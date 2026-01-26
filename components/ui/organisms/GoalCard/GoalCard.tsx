'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Plus, Shrub, Link as LinkIcon, Sprout, BriefcaseBusiness } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Card } from '@/components/ui/atoms/Card/Card'
import { GoalCardProps } from './GoalCard.types'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Badge } from '@/components/ui/atoms/Badge'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import { LadderGoal } from '@/components/ui/molecules/LadderGoal'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { GoalStatus } from '@/components/ui/molecules/GoalStatus'
import { cn } from '@/utils/cn'
import { Button } from '../../atoms/Button'
import { useTranslations } from 'next-intl'
import { GOAL_TYPES, GoalStatus as GoalStatusType } from '@/domain/goal'
import { LadderingModal } from '@/components/ui/organisms/LadderingModal'
import { ROUTES } from '@/common/routes'
import { useUIStore } from '@/stores/ui.store'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { ModalHeader, ModalBody } from '@/components/ui/molecules/Modal'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'

const GoalTypeIcons = {
  [GOAL_TYPES.BUSINESS]: <Sprout width={20} />,
  [GOAL_TYPES.MANAGER_EFFECTIVENESS]: <BriefcaseBusiness width={20} />,
  [GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: <Shrub width={20} />,
}

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

  const { id, description, title, avatarUrl, goalType, status, userName, parent } = goal
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
        {parent && <LadderGoal text={parent.title} onClick={handleOpenLadderingModal} />}

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
                    style={{ width: goalType ? '72px' : '48px' }}
                  >
                    <Avatar src={avatarUrl} alt={userName} size="lg" />
                    {goalType && (
                      <div className="absolute top-0 -right-0_25">
                        <TypeIcon type={goalType} variant="badge" />
                      </div>
                    )}
                  </div>
                  <Link
                    href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
                    className="flex-1 max-sm:order-last max-sm:basis-full hover:text-accent-primary transition-colors"
                  >
                    <Typography variant="h6">{title}</Typography>
                  </Link>
                  <Badge variant={statusToBadgeVariant(status as GoalStatusType)}>
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
                <Badge variant={statusToBadgeVariant(ladderGoal.status as GoalStatusType)}>
                  {tGoals(`status.${ladderGoal.status}`)}
                </Badge>
              </LadderGoal>
            ))}
          </CollapsibleSection>
        ) : (
          <div className="flex items-center gap-0_5">
            <div className="ml-3 w-full flex gap-1 items-center max-sm:flex-wrap">
              <div className="relative shrink-0" style={{ width: goalType ? '72px' : '48px' }}>
                <Avatar src={avatarUrl} alt={userName} size="lg" />
                {goalType && (
                  <div className="absolute top-0 -right-0_25">
                    <TypeIcon type={goalType} variant="badge" />
                  </div>
                )}
              </div>
              <Link
                href={ROUTES.GAME_CHANGERS_AMBITIONS_DETAIL(id)}
                className="flex-1 max-sm:order-last max-sm:basis-full hover:text-accent-primary transition-colors"
              >
                <Typography variant="h6">{title}</Typography>
              </Link>
              <Badge variant={statusToBadgeVariant(status as GoalStatusType)}>
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
      </Card>
    </m.div>
  )
}
