'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import type { DrawerProps, DrawerPosition, DrawerSize } from './Drawer.types'

// Constants
const ANIMATION_DURATION = 500
const SWIPE_THRESHOLD = 100
const MOBILE_BREAKPOINT = 768

const POSITION_CLASS_MAP: Record<DrawerPosition, string> = {
  left: 'left-0 top-0 bottom-0 h-full',
  right: 'right-0 top-0 bottom-0 h-full',
  top: 'top-0 left-0 right-0 w-full',
  bottom: 'bottom-0 left-0 right-0 w-full',
}

const SLIDE_TRANSFORM_MAP: Record<DrawerPosition, { closed: string; open: string }> = {
  left: { closed: '-translate-x-full', open: 'translate-x-0' },
  right: { closed: 'translate-x-full', open: 'translate-x-0' },
  top: { closed: '-translate-y-full', open: 'translate-y-0' },
  bottom: { closed: 'translate-y-full', open: 'translate-y-0' },
}

const SIZE_CLASS_MAP: Record<DrawerPosition, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-drawer-width-sm',
    md: 'w-drawer-width-md',
    lg: 'w-drawer-width-lg',
    full: 'w-full',
  },
  right: {
    sm: 'w-drawer-width-sm',
    md: 'w-drawer-width-md',
    lg: 'w-drawer-width-lg',
    full: 'w-full',
  },
  top: {
    sm: 'h-drawer-height-sm',
    md: 'h-drawer-height-md',
    lg: 'h-drawer-height-lg',
    full: 'h-full',
  },
  bottom: {
    sm: 'h-drawer-height-sm md:h-drawer-height-md',
    md: 'h-drawer-height-md md:h-drawer-height-lg',
    lg: 'h-drawer-height-lg',
    full: 'h-full',
  },
}

export function Drawer({
  open,
  onClose,
  title,
  overlayClose = true,
  position = 'right',
  size = 'md',
  focusTrap = false,
  showClose = true,
  hideCloseOnMobile = false,
  children,
  actions,
  className,
  'aria-label': ariaLabel,
  'data-test-id': dataTestId,
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)
  const startY = useRef<number>(0)
  const currentY = useRef<number>(0)
  const [mounted, setMounted] = useState(false)
  const onOpenChange = useEffectEvent((value: boolean) => {
    setMounted(value)
  })

  useFocusTrap(containerRef, focusTrap)

  // Handle animation timing
  useEffect(() => {
    if (open) {
      onOpenChange(true)
    } else {
      const timer = setTimeout(() => onOpenChange(false), ANIMATION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Handle body scroll lock and focus management
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

  // Handle Escape key
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Mobile swipe handlers for bottom drawer
  const isMobileBottomDrawer = position === 'bottom' && typeof window !== 'undefined'

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobileBottomDrawer && window.innerWidth < MOBILE_BREAKPOINT) {
      startY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobileBottomDrawer && window.innerWidth < MOBILE_BREAKPOINT) {
      currentY.current = e.touches[0].clientY
      const diff = currentY.current - startY.current
      if (diff > 0 && containerRef.current) {
        containerRef.current.style.transform = `translateY(${diff}px)`
      }
    }
  }

  const handleTouchEnd = () => {
    if (isMobileBottomDrawer && window.innerWidth < MOBILE_BREAKPOINT) {
      const diff = currentY.current - startY.current
      if (diff > SWIPE_THRESHOLD) {
        onClose?.()
      }
      if (containerRef.current) {
        containerRef.current.style.transform = ''
      }
    }
  }

  if (!open && !mounted) return null

  const containerClasses = cn(
    'fixed bg-neutral-0 box-border overflow-hidden flex flex-col',
    'shadow-[0px_25px_66px_-20px_rgba(0,16,53,0.24)] shadow-[inset_0px_0px_1px_0px_rgba(0,16,53,0.16)]',
    'transition-transform duration-slower ease-in-out',
    POSITION_CLASS_MAP[position],
    SIZE_CLASS_MAP[position][size],
    // Slide animation based on position
    mounted && open ? SLIDE_TRANSFORM_MAP[position].open : SLIDE_TRANSFORM_MAP[position].closed,
    // Mobile sheet styling for bottom drawer
    position === 'bottom' && 'md:rounded-t-default rounded-t-large',
    className,
  )

  const overlayClasses = cn(
    'fixed inset-0 z-[var(--z-drawer-overlay)]',
    'transition-opacity duration-slower ease-in-out',
    mounted && open ? 'opacity-100' : 'opacity-0',
  )

  const backdropClasses = cn(
    'absolute inset-0 bg-neutral-1000/50 transition-opacity duration-slower ease-in-out',
    mounted && open ? 'opacity-100' : 'opacity-0',
  )

  const overlay = (
    <div
      data-testid="drawer-overlay"
      data-test-id={dataTestId}
      ref={overlayRef}
      className={overlayClasses}
      onClick={(e) => {
        if (!overlayClose) return
        if (
          e.target === overlayRef.current ||
          (e.target as HTMLElement).hasAttribute('aria-hidden')
        ) {
          onClose?.()
        }
      }}
    >
      <div className={backdropClasses} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title ?? 'Drawer dialog'}
        data-testid="drawer-container"
        ref={containerRef}
        tabIndex={-1}
        className={containerClasses}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile handle for bottom drawer */}
        {position === 'bottom' && (
          <div className="md:hidden flex justify-center py-0_5">
            <div className="w-2 h-0_25 bg-neutral-300 rounded-default" />
          </div>
        )}

        {/* Header */}
        {title && (
          <header className="flex items-center gap-0_75 px-1_5 py-1 border-b border-neutral-200">
            <div className="flex-1 text-title-medium font-semibold text-neutral-1000">{title}</div>
            {showClose && (
              <button
                onClick={onClose}
                className={cn(
                  'shrink-0 w-icon-sm h-icon-sm flex items-center justify-center rounded-small hover:bg-neutral-100 transition-colors duration-base',
                  hideCloseOnMobile && 'md:flex hidden',
                )}
                aria-label="Close drawer"
                data-testid="drawer-close-button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </header>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-1_5 py-1" data-testid="drawer-body">
          {children}
        </div>

        {/* Footer with actions */}
        {actions && (
          <footer
            className="flex items-center justify-end gap-0_75 px-1_5 py-1 border-t border-neutral-200 bg-neutral-50"
            data-testid="drawer-footer"
          >
            {actions}
          </footer>
        )}
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : null
}

Drawer.displayName = 'Drawer'
