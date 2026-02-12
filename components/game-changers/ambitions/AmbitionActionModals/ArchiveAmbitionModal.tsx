'use client'

import { useEffect, useCallback, useMemo, useEffectEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useUIStore } from '@/stores/ui.store'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/ui/molecules/Modal'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Button } from '@/components/ui/atoms/Button'
import type { AmbitionActionModalProps } from './AmbitionActionModals.types'

export function ArchiveAmbitionModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: Omit<AmbitionActionModalProps, 'onConfirm'> & { onConfirm: () => void | Promise<void> }) {
  const t = useTranslations('AmbitionModals.archive')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const { openModal, closeAll } = useUIStore()

  const handleClose = useCallback(() => {
    closeAll()
    onClose()
  }, [closeAll, onClose])

  const handleConfirm = useCallback(async () => {
    await onConfirm()
  }, [onConfirm])

  const actions = useMemo(
    () => (
      <>
        <Button variant="link" onClick={handleClose} disabled={isLoading}>
          {t('cancelButton')}
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={isLoading}>
          {t('submitButton')}
        </Button>
      </>
    ),
    [t, handleClose, handleConfirm, isLoading],
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

  const content = useMemo(
    () => <p className="text-body text-neutral-1000">{t('description')}</p>,
    [t],
  )

  const desktopModal = useMemo(
    () => (
      <>
        <ModalHeader showClose onClose={handleClose}>
          {t('title')}
        </ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter className="justify-end">{actions}</ModalFooter>
      </>
    ),
    [handleClose, t, content, actions],
  )

  const toggleModal = useEffectEvent((show: boolean) => {
    if (show) {
      openModal(desktopModal, {
        onClose: handleClose,
        size: 'sm',
        overlayClose: true,
        'aria-label': t('title'),
      })
    } else {
      closeAll()
    }
  })

  useEffect(() => {
    if (open && isMobile != null && !isMobile) {
      toggleModal(true)
    } else if (!open || isMobile) {
      toggleModal(false)
    }
  }, [open, isMobile])

  if (isMobile) {
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
        <div className="flex flex-col gap-1">{content}</div>
      </Drawer>
    )
  }

  return null
}

ArchiveAmbitionModal.displayName = 'ArchiveAmbitionModal'
