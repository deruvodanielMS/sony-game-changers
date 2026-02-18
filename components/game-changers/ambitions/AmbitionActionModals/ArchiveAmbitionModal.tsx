'use client'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ResponsiveModal } from '@/components/ui/molecules/ResponsiveModal'
import { Button } from '@/components/ui/atoms/Button'
import type { AmbitionActionModalProps } from './AmbitionActionModals.types'

export function ArchiveAmbitionModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: Omit<AmbitionActionModalProps, 'onConfirm'> & { onConfirm: () => void | Promise<void> }) {
  const t = useTranslations('AmbitionModals.archive')

  const handleConfirm = useCallback(async () => {
    await onConfirm()
  }, [onConfirm])

  const actions = (
    <>
      <Button variant="link" onClick={onClose} disabled={isLoading}>
        {t('cancelButton')}
      </Button>
      <Button variant="primary" onClick={handleConfirm} disabled={isLoading}>
        {t('submitButton')}
      </Button>
    </>
  )

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title={t('title')}
      desktopSize="sm"
      actions={actions}
    >
      <p className="text-body text-neutral-1000">{t('description')}</p>
    </ResponsiveModal>
  )
}

ArchiveAmbitionModal.displayName = 'ArchiveAmbitionModal'
