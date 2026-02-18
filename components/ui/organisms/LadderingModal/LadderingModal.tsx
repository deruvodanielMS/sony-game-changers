'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link as LinkIcon } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { AmbitionStatus } from '@/components/ui/atoms/AmbitionStatus'
import {
  getStatusVariant,
  getStatusLabel,
} from '@/components/ui/atoms/AmbitionStatus/AmbitionStatus.types'
import { ResponsiveModal } from '@/components/ui/molecules/ResponsiveModal'
import { cn } from '@/utils/cn'
import { generateInitialsAvatarSrc } from '@/utils/generateInitialsAvatar'
import type {
  LadderingModalProps,
  AmbitionCardProps,
  GoalPreviewCardProps,
  ParentAmbition,
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
  const { title, userName, avatarUrl, status } = goal

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
        <AmbitionStatus
          variant={getStatusVariant(status)}
          size="md"
          className="shrink-0"
          data-test-id="ambition-status"
        >
          {getStatusLabel(status)}
        </AmbitionStatus>
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

  const handleLink = (/*ambitionId: string*/) => {
    // TODO: Implement link logic with API call
    // Example: await linkGoalToAmbition(selectedGoal.id, ambitionId)
  }

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title={t('title')}
      desktopSize="lg"
      mobileSize="lg"
      data-test-id={dataTestId}
    >
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
    </ResponsiveModal>
  )
}

LadderingModal.displayName = 'LadderingModal'
