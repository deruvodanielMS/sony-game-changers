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
  const isDesktop = useMediaQuery(BREAKPOINTS.md)
  const { openModal, closeAll } = useUIStore()

  const handleClose = useCallback(() => {
    closeAll()
    onClose()
  }, [closeAll, onClose])

  const handleConfirm = useCallback(async () => {
    await onConfirm()
  }, [onConfirm])

  // Desktop modal content - recreated when dependencies change
  const desktopModalContent = useMemo(
    () => (
      <>
        <ModalHeader showClose onClose={handleClose}>
          {t('title')}
        </ModalHeader>
        <ModalBody>
          <p className="text-body text-neutral-1000">{t('description')}</p>
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
    [t, handleClose, handleConfirm, isLoading],
  )

  // useEffectEvent allows accessing the latest desktopModalContent without triggering re-runs
  const toggleModal = useEffectEvent((show: boolean) => {
    if (show) {
      openModal(desktopModalContent, {
        onClose: handleClose,
        size: 'sm',
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

  // Update modal content when isLoading changes (only when modal is open on desktop)
  useEffect(() => {
    if (open && isDesktop === true) {
      toggleModal(true)
    }
  }, [isLoading, isDesktop])

  const mobileContent = useMemo(
    () => <p className="text-body text-neutral-1000">{t('description')}</p>,
    [t],
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

ArchiveAmbitionModal.displayName = 'ArchiveAmbitionModal'
