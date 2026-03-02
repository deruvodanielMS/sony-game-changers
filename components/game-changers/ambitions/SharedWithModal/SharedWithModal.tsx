'use client'

import { useTranslations } from 'next-intl'
import { ResponsiveModal } from '@/components/ui/molecules/ResponsiveModal'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { Typography } from '@/components/ui/foundations/Typography'
import { Button } from '@/components/ui/atoms/Button'
import type { SharedWithModalProps } from './SharedWithModal.types'

export function SharedWithModal({ open, onClose, members }: SharedWithModalProps) {
  const t = useTranslations('AmbitionDetail')

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title={t('sharedWithModal.title')}
      desktopSize="sm"
      mobileSize="sm"
      actions={
        <Button variant="primary" onClick={onClose}>
          {t('sharedWithModal.gotIt')}
        </Button>
      }
    >
      <div className="flex flex-col gap-1">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-1">
            <Avatar src={member.avatarUrl} alt={member.name} size="md" />
            <Typography variant="body">{member.name}</Typography>
          </div>
        ))}
      </div>
    </ResponsiveModal>
  )
}

SharedWithModal.displayName = 'SharedWithModal'
