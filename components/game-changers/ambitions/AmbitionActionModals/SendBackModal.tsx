'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ResponsiveModal } from '@/components/ui/molecules/ResponsiveModal'
import { Button } from '@/components/ui/atoms/Button'
import { TextArea } from '@/components/ui/atoms/TextArea'
import type { AmbitionActionModalProps } from './AmbitionActionModals.types'

const MAX_COMMENT_LENGTH = 150

export function SendBackModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: AmbitionActionModalProps) {
  const t = useTranslations('AmbitionModals.sendBack')
  const tCommon = useTranslations('AmbitionModals')
  const [comment, setComment] = useState('')

  const handleClose = useCallback(() => {
    setComment('')
    onClose()
  }, [onClose])

  const handleConfirm = useCallback(async () => {
    await onConfirm(comment || undefined)
    setComment('')
  }, [comment, onConfirm])

  const actions = (
    <>
      <Button variant="link" onClick={handleClose} disabled={isLoading}>
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
      onClose={handleClose}
      title={t('title')}
      desktopSize="md"
      actions={actions}
    >
      <div className="flex flex-col gap-1">
        <p className="text-body text-neutral-1000">{t('description')}</p>
        <div className="flex flex-col gap-0_5">
          <span className="text-body-small font-semibold text-neutral-1000">
            {t('commentLabel')}
          </span>
          <TextArea
            id="send-back-comment"
            placeholder={t('commentPlaceholder')}
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))}
            resize="none"
            rows={3}
          />
          <span className="text-body-small text-neutral-500">
            {tCommon('characterCount', { count: comment.length })}
          </span>
        </div>
      </div>
    </ResponsiveModal>
  )
}

SendBackModal.displayName = 'SendBackModal'
