'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'
import type { ModalProps, ModalSize } from './Modal.types'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { MODAL_ANIMATION_DURATION } from '@/common/constants'

const SIZE_CLASS_MAP: Record<ModalSize, string> = {
  sm: 'w-modal-sm',
  md: 'w-modal-md',
  lg: 'w-modal-lg',
  xl: 'w-modal-xl',
  full: 'w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
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

  const [isVisible, setIsVisible] = useState(open)
  const [animateIn, setAnimateIn] = useState(false)

  const updateIsVisible = useEffectEvent((value: boolean) => {
    setIsVisible(value)
  })

  const updateAnimateIn = useEffectEvent((value: boolean) => {
    setAnimateIn(value)
  })

  useFocusTrap(containerRef, focusTrap)

  useEffect(() => {
    if (open) {
      updateIsVisible(true)

      // Use setTimeout instead of rAF for more reliable timing
      setTimeout(() => {
        updateAnimateIn(true)
      }, 10)
    } else {
      updateAnimateIn(false)

      const t = setTimeout(() => {
        updateIsVisible(false)
      }, MODAL_ANIMATION_DURATION)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
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
        onClose?.()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!isVisible) return null

  const containerClasses = cn(
    // Base styles
    'flex flex-col',
    size === 'full' ? 'items-stretch' : 'items-start',
    'p-1_5',
    'gap-1_5',
    'rounded-large',
    'bg-neutral-0',
    'shadow-[inset_0_0_1px_0_rgba(0,16,53,0.16),0_25px_66px_-20px_rgba(0,16,53,0.24)]',
    // Size
    SIZE_CLASS_MAP[size],
    className,
  )

  const overlay = (
    <div
      data-testid="modal-overlay"
      ref={overlayRef}
      className={cn(
        'fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-out',
        'z-[var(--z-modal)]',
        animateIn ? 'opacity-100' : 'opacity-0',
      )}
      onMouseDown={(e) => {
        if (!overlayClose) return
        if (e.target === overlayRef.current) onClose?.()
      }}
    >
      <div className="absolute inset-0 bg-neutral-1000/50 pointer-events-none" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? 'Modal dialog'}
        data-testid="modal-container"
        ref={containerRef}
        tabIndex={-1}
        className={cn(
          'relative overflow-hidden pointer-events-auto',
          'z-[var(--z-modal-content)]',
          'transition-all duration-300 ease-out transform',
          animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          containerClasses,
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : null
}

export default Modal
