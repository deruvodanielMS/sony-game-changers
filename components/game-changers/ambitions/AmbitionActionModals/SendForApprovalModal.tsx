'use client'

import { useState, useEffect, useCallback, useMemo, useEffectEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useUIStore } from '@/stores/ui.store'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/ui/molecules/Modal'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Button } from '@/components/ui/atoms/Button'
import { TextArea } from '@/components/ui/atoms/TextArea'
import type { AmbitionActionModalProps } from './AmbitionActionModals.types'

const MAX_COMMENT_LENGTH = 150

export function SendForApprovalModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: AmbitionActionModalProps) {
  const t = useTranslations('AmbitionModals.sendForApproval')
  const tCommon = useTranslations('AmbitionModals')
  const isDesktop = useMediaQuery(BREAKPOINTS.md)
  const { openModal, closeAll } = useUIStore()
  const [comment, setComment] = useState('')

  const handleClose = useCallback(() => {
    setComment('')
    closeAll()
    onClose()
  }, [closeAll, onClose])

  const handleConfirm = useCallback(async () => {
    await onConfirm(comment || undefined)
    setComment('')
  }, [comment, onConfirm])

  // Desktop modal content - recreated when dependencies change
  const desktopModalContent = useMemo(
    () => (
      <>
        <ModalHeader showClose onClose={handleClose}>
          {t('title')}
        </ModalHeader>
        <ModalBody className="flex flex-col gap-1">
          <p className="text-body text-neutral-1000">{t('description')}</p>
          <div className="flex flex-col gap-0_5">
            <span className="text-body-small font-semibold text-neutral-1000">
              {t('commentLabel')}
            </span>
            <TextArea
              id="send-approval-comment"
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
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button variant="link" onClick={handleClose} disabled={isLoading}>
            {t('cancelButton')}
          </Button>
          <Button variant="primary" onClick={handleConfirm} disabled={isLoading}>
            {t('submitButton')}
          </Button>
        </ModalFooter>
      </>
    ),
    [t, tCommon, comment, handleClose, handleConfirm, isLoading],
  )

  // useEffectEvent allows accessing the latest desktopModalContent without triggering re-runs
  const toggleModal = useEffectEvent((show: boolean) => {
    if (show) {
      openModal(desktopModalContent, {
        onClose: handleClose,
        size: 'md',
        overlayClose: true,
        'aria-label': t('title'),
      })
    } else {
      closeAll()
    }
  })

  // Handle desktop modal open/close - only triggers on open/isDesktop changes
  useEffect(() => {
    // Wait for hydration to complete
    if (isDesktop === undefined) return

    if (open && isDesktop) {
      toggleModal(true)
    } else if (!open || !isDesktop) {
      toggleModal(false)
    }
  }, [open, isDesktop])

  // Update modal content when comment or loading state changes (only when modal is open on desktop)
  useEffect(() => {
    if (open && isDesktop === true) {
      toggleModal(true)
    }
  }, [comment, isLoading, isDesktop])

  // Mobile drawer content
  const mobileContent = useMemo(
    () => (
      <>
        <p className="text-body text-neutral-1000">{t('description')}</p>
        <div className="flex flex-col gap-0_5">
          <span className="text-body-small font-semibold text-neutral-1000">
            {t('commentLabel')}
          </span>
          <TextArea
            id="send-approval-comment-mobile"
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
      </>
    ),
    [t, tCommon, comment],
  )

  const mobileActions = useMemo(
    () => (
      <div className="flex items-center gap-1 w-full">
        <Button variant="link" onClick={handleClose} disabled={isLoading}>
          {t('cancelButton')}
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={isLoading} className="flex-1">
          {t('submitButton')}
        </Button>
      </div>
    ),
    [t, handleClose, handleConfirm, isLoading],
  )

  // Render mobile drawer
  if (!isDesktop) {
    return (
      <Drawer
        open={open}
        onClose={handleClose}
        position="bottom"
        size="md"
        overlayClose
        showClose
        hideCloseOnMobile
        title={t('title')}
        aria-label={t('title')}
        actions={mobileActions}
      >
        <div className="flex flex-col gap-1">{mobileContent}</div>
      </Drawer>
    )
  }

  return null
}

SendForApprovalModal.displayName = 'SendForApprovalModal'
