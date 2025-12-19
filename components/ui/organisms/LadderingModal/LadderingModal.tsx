'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link as LinkIcon } from 'lucide-react'
import { Modal, ModalHeader, ModalBody } from '@/components/ui/molecules/Modal'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Typography } from '@/components/ui/foundations/Typography'
import { GoalStatus } from '@/components/ui/molecules/GoalStatus/GoalStatus'
import { cn } from '@/utils/cn'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import type {
  LadderingModalProps,
  AmbitionCardProps,
  GoalPreviewCardProps,
} from './LadderingModal.types'

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
        'bg-neutral-100 border-2 border-neutral-200 rounded-[24px]',
        'p-1_5 flex flex-col gap-1 items-start justify-center',
      )}
    >
      <div className="flex gap-1 items-start w-full">
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
            'shrink-0 w-3 h-3',
            'flex items-center justify-center',
            'bg-neutral-200 rounded-full p-0_75',
            'hover:bg-neutral-300 transition-colors',
          )}
        >
          <LinkIcon className="w-1_5 h-1_5" />
        </button>
      </div>
      <Typography variant="body" className="font-bold text-neutral-800 w-full">
        {title}
      </Typography>
    </div>
  )
}

// Sub-component: Goal Preview Card (shows the selected goal)
function GoalPreviewCard({ goal, 'data-testid': dataTestId }: GoalPreviewCardProps) {
  const { title, userName, avatarUrl, status } = goal

  return (
    <div
      data-testid={dataTestId}
      className={cn(
        'w-full',
        'bg-neutral-0 border border-neutral-300 rounded-[24px]',
        'p-1_5 flex flex-col gap-1',
      )}
    >
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
        <GoalStatus status={status} className="shrink-0" />
      </div>
    </div>
  )
}

// Main component: LadderingModal
export function LadderingModal({
  open,
  onClose,
  selectedGoal,
  'data-testid': dataTestId,
}: LadderingModalProps) {
  const t = useTranslations('LadderingModal')
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mock data for ambition cards - in real implementation, these would come from props or API
  const ambitions = [
    {
      id: 'division',
      avatarUrl: '',
      userName: 'James Miller',
      title: t('divisionAmbitionLabel'),
    },
    {
      id: 'team',
      avatarUrl: '',
      userName: 'Jürgen Schneider',
      title: t('teamAmbitionLabel'),
    },
  ]

  const handleLink = (ambitionId: string) => {
    // TODO: Implement link logic with API call
    console.log('Linking to ambition:', ambitionId)
    // Example: await linkGoalToAmbition(selectedGoal.id, ambitionId)
  }

  // Content shared between Modal and Drawer
  const content = (
    <div className="flex flex-col gap-1_5">
      {/* Ambition Cards Row - Stack on mobile, row on tablet+ */}
      <div className="flex flex-col sm:flex-row gap-1_5 items-stretch w-full">
        {ambitions.map((ambition) => (
          <AmbitionCard
            key={ambition.id}
            avatarUrl={ambition.avatarUrl}
            userName={ambition.userName}
            title={ambition.title}
            onLink={() => handleLink(ambition.id)}
            data-testid={`ambition-card-${ambition.id}`}
          />
        ))}
      </div>

      {/* Goal Preview Card */}
      <GoalPreviewCard goal={selectedGoal} data-testid="goal-preview-card" />
    </div>
  )

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

  // Desktop: use Modal
  return (
    <Modal open={open} onClose={onClose} size="lg" overlayClose data-testid={dataTestId}>
      <ModalHeader showClose onClose={onClose}>
        <Typography variant="h5">{t('title')}</Typography>
      </ModalHeader>

      <ModalBody className="flex flex-col gap-1_5">{content}</ModalBody>
    </Modal>
  )
}

LadderingModal.displayName = 'LadderingModal'
