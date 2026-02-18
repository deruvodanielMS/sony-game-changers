'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { Modal } from '@/components/ui/molecules/Modal'
import { ModalHeader } from '@/components/ui/molecules/Modal/ModalHeader'
import { ModalBody } from '@/components/ui/molecules/Modal/ModalBody'
import { ModalFooter } from '@/components/ui/molecules/Modal/ModalFooter'
import { Drawer } from '@/components/ui/atoms/Drawer'
import type { ResponsiveModalProps } from './ResponsiveModal.types'

/**
 * ResponsiveModal - A unified modal component that renders as Modal on desktop and Drawer on mobile
 *
 * This component eliminates the need for manual device detection and provides a consistent
 * API for modal dialogs across all screen sizes.
 *
 * @example
 * ```tsx
 * <ResponsiveModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   actions={
 *     <>
 *       <Button variant="link" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </ResponsiveModal>
 * ```
 *
 * @example Custom footer for full-screen modals
 * ```tsx
 * <ResponsiveModal
 *   open={isOpen}
 *   onClose={handleClose}
 *   title="Create Ambition"
 *   desktopSize="full"
 *   actions={mobileActions}
 *   customFooter={
 *     <div className="-mx-1_5 -mb-1_5 mt-auto flex w-[calc(100%+3rem)] border-t border-neutral-200 px-1_5 py-1 bg-neutral-50">
 *       {desktopActions}
 *     </div>
 *   }
 * >
 *   <FormContent />
 * </ResponsiveModal>
 * ```
 */
export function ResponsiveModal({
  open,
  onClose,
  title,
  children,
  actions,
  customFooter,
  desktopSize = 'md',
  mobileSize = 'md',
  overlayClose = true,
  focusTrap = false,
  className,
  mobileBodyClassName,
  'aria-label': ariaLabel,
  'data-test-id': dataTestId,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery(BREAKPOINTS.md)

  // Mobile: render as bottom Drawer
  if (!isDesktop) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        position="bottom"
        size={mobileSize}
        overlayClose={overlayClose}
        focusTrap={focusTrap}
        showClose
        hideCloseOnMobile
        title={title}
        aria-label={ariaLabel ?? title}
        data-test-id={dataTestId}
        actions={actions}
        className={className}
      >
        {mobileBodyClassName ? <div className={mobileBodyClassName}>{children}</div> : children}
      </Drawer>
    )
  }

  // Desktop: render as centered Modal
  // Determine footer rendering: customFooter takes precedence over actions
  const renderFooter = () => {
    if (customFooter) {
      return customFooter
    }
    if (actions) {
      return <ModalFooter className="justify-end">{actions}</ModalFooter>
    }
    return null
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={desktopSize}
      overlayClose={overlayClose}
      focusTrap={focusTrap}
      aria-label={ariaLabel ?? title}
      className={className}
    >
      <ModalHeader showClose onClose={onClose}>
        {title}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      {renderFooter()}
    </Modal>
  )
}

ResponsiveModal.displayName = 'ResponsiveModal'
