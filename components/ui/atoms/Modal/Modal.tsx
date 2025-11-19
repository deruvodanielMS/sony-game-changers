'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'
import type { ModalProps, ModalSize } from './Modal.types'
import { useFocusTrap } from '@/hooks/useFocusTrap'

const SIZE_CLASS_MAP: Record<ModalSize, string> = {
  sm: 'max-w-modal-sm',
  md: 'max-w-modal-md',
  lg: 'max-w-modal-lg',
  full: 'w-full h-full max-w-none',
}

export function Modal({
  open,
  onClose,
  overlayClose = true,
  size = 'md',
  focusTrap = false,
  children,
  className,
  'aria-label': ariaLabel,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)

  useFocusTrap(containerRef, focusTrap)

  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      // focus container
      setTimeout(() => containerRef.current?.focus(), 0)
    } else {
      document.body.style.overflow = ''
      if (lastActiveRef.current) lastActiveRef.current.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const containerClasses = cn(
    'w-full bg-neutral-0 rounded-default relative box-border',
    'shadow-[0px_25px_66px_-20px_rgba(0,16,53,0.24)] shadow-[inset_0px_0px_1px_0px_rgba(0,16,53,0.16)]',
    SIZE_CLASS_MAP[size],
    size === 'full' ? 'h-full rounded-none' : '',
    className,
  )

  const overlay = (
    <div
      data-testid="modal-overlay"
      ref={overlayRef}
      className="fixed inset-0 z-[900] flex items-center justify-center"
      onMouseDown={(e) => {
        if (!overlayClose) return
        if (e.target === overlayRef.current) {
          onClose()
        }
      }}
    >
      <div className="absolute inset-0 bg-neutral-1000/50 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? 'Modal dialog'}
        data-testid="modal-container"
        ref={containerRef}
        tabIndex={-1}
        className={cn('relative z-10 overflow-hidden flex flex-col p-1 gap-1', containerClasses)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : null
}

export default Modal
