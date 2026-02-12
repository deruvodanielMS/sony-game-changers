'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link as LinkIcon } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useEffect, useMemo, useEffectEvent } from 'react'
import { ModalHeader, ModalBody } from '@/components/ui/molecules/Modal'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Typography } from '@/components/ui/foundations/Typography'
import { Badge } from '@/components/ui/atoms/Badge'
import { cn } from '@/utils/cn'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import type {
  LadderingModalProps,
  AmbitionCardProps,
  GoalPreviewCardProps,
  ParentAmbition,
} from './LadderingModal.types'
import { useUIStore } from '@/stores/ui.store'
import type { GoalStatus } from '@/domain/goal'

const statusToBadgeVariant = (status?: GoalStatus) => {
  if (status === 'draft') return 'draft'
  if (status === 'awaiting_approval') return 'awaiting-approval'
  if (status === 'completed') return 'completed'
  return 'default'
}

// Sub-component: Ambition Card (drop zone for linking ambitions)
function AmbitionCard({
  avatarUrl,
  title,
  userName,
  onLink,
  'data-testid': dataTestId,
}: AmbitionCardProps) {
  const t = useTranslations('LadderingModal')

  return (
    <div
      data-testid={dataTestId}
      className={cn(
        'flex-1 min-w-0 w-full sm:w-auto',
        'bg-neutral-100 border border-neutral-200 rounded-large',
        'p-1.5 flex flex-col gap-1 items-start justify-center',
      )}
    >
      <div className="flex gap-1 items-center w-full">
        <Image
          src={avatarUrl || generateInitialsAvatarSrc(userName, { size: 48 })}
          alt={userName}
          width={48}
          height={48}
          className="rounded-full shrink-0"
        />
        <button
          onClick={onLink}
          aria-label={t('linkButtonAriaLabel')}
          className={cn(
            'shrink-0 size-3',
            'flex items-center justify-center',
            'bg-neutral-200 rounded-full p-0.75',
            'hover:bg-neutral-300 transition-colors',
          )}
        >
          <LinkIcon className="size-1.5" />
        </button>
      </div>
      <Typography variant="body" fontWeight="bold" className="text-neutral-800 w-full">
        {title}
      </Typography>
    </div>
  )
}

// Sub-component: Goal Preview Card (shows the selected goal)
function GoalPreviewCard({ goal, 'data-testid': dataTestId }: GoalPreviewCardProps) {
  const t = useTranslations('Goals')
  const { title, userName, avatarUrl, status } = goal

  const formatStatusLabel = (goalStatus?: GoalStatus | string) => {
    if (!goalStatus) return 'Draft'
    // Only translate if it's a valid status key
    if (
      goalStatus === 'draft' ||
      goalStatus === 'awaiting_approval' ||
      goalStatus === 'completed'
    ) {
      return t(`status.${goalStatus}`)
    }
    return goalStatus
  }

  return (
    <div
      data-testid={dataTestId}
      className={cn(
        'w-full',
        'bg-neutral-0 border border-neutral-300 rounded-large',
        'p-1.5 flex flex-col gap-1',
      )}
    >
      <Typography variant="body" className="text-neutral-1000 w-full">
        {title}
      </Typography>
      <div className="flex gap-1 items-center justify-between w-full">
        <div className="flex-1 min-w-0 flex gap-1 items-center">
          <Image
            src={avatarUrl || generateInitialsAvatarSrc(userName || '', { size: 40 })}
            alt={userName || ''}
            width={40}
            height={40}
            className="rounded-full shrink-0"
          />
          <Typography
            variant="body"
            fontWeight="bold"
            className="text-neutral-1000 truncate flex-1 min-w-0"
          >
            {userName}
          </Typography>
        </div>
        <Badge variant={statusToBadgeVariant(status as GoalStatus)} size="md" className="shrink-0">
          {formatStatusLabel(status)}
        </Badge>
      </div>
    </div>
  )
}

// Main component: LadderingModal
export function LadderingModal({
  open,
  onClose,
  selectedGoal,
  parentAmbitions,
  'data-testid': dataTestId,
}: LadderingModalProps) {
  const t = useTranslations('LadderingModal')

  // Use media query hook for mobile detection
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

  const { openModal, closeModal } = useUIStore()

  const handleLink = (/*ambitionId: string*/) => {
    // TODO: Implement link logic with API call
    // Example: await linkGoalToAmbition(selectedGoal.id, ambitionId)
  }

  const { desktopModal, content } = useMemo(() => {
    // Content shared between Modal and Drawer
    const content = (
      <div className="flex flex-col gap-1.5">
        {/* Ambition Cards Row - Stack on mobile, row on tablet+ */}
        {parentAmbitions && parentAmbitions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-1.5 items-stretch w-full">
            {parentAmbitions.map((ambition: ParentAmbition) => (
              <AmbitionCard
                key={ambition.id}
                avatarUrl={ambition.avatarUrl}
                userName={ambition.userName}
                title={ambition.title}
                onLink={() => handleLink(/*ambition.id*/)}
                data-testid={`ambition-card-${ambition.id}`}
              />
            ))}
          </div>
        )}

        {/* Goal Preview Card */}
        <GoalPreviewCard goal={selectedGoal} data-testid="goal-preview-card" />
      </div>
    )
    const desktopModal = (
      <>
        <ModalHeader showClose onClose={onClose}>
          {t('title')}
        </ModalHeader>

        <ModalBody className="flex flex-col gap-1.5">{content}</ModalBody>
      </>
    )
    return { desktopModal, content }
  }, [onClose, t, selectedGoal, parentAmbitions])

  const toggleModal = useEffectEvent((show: boolean) => {
    if (show) {
      openModal(desktopModal, { onClose, size: 'lg', overlayClose: true })
    } else {
      closeModal()
    }
  })

  useEffect(() => {
    if (open && isMobile != null && !isMobile) {
      toggleModal(true)
    } else if (!open || isMobile) {
      toggleModal(false)
    }
  }, [open, isMobile])

  // Mobile: use Drawer with bottom position (bottom sheet)
  if (isMobile) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        position="bottom"
        size="md"
        overlayClose
        showClose
        hideCloseOnMobile
        title={t('title')}
        aria-label={t('title')}
        data-test-id={dataTestId}
        className="!h-[80vh] md:!h-drawer-height-lg"
      >
        {content}
      </Drawer>
    )
  }

  return null
}

LadderingModal.displayName = 'LadderingModal'
