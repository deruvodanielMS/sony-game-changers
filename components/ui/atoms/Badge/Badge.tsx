'use client'

import { Check, Info, AlertTriangle, X, MoreHorizontal } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types'

// ─── Color classes ────────────────────────────────────────────────────────────
// All filled variants use white text (text-neutral-0).
// Pending uses a light gray bg so it gets neutral-600 text instead.
const COLOR_CLASSES: Record<BadgeVariant, string> = {
  error: 'bg-feedback-error-500 text-neutral-0',
  'error-dark': 'bg-feedback-error-950 text-neutral-0',
  neutral: 'bg-neutral-600 text-neutral-0',
  default: 'bg-neutral-1000 text-neutral-0',
  pending: 'bg-neutral-300 text-neutral-600',
  success: 'bg-feedback-success-500 text-neutral-0',
  info: 'bg-feedback-info-500 text-neutral-0',
  warning: 'bg-feedback-warning-500 text-neutral-0',
}

// ─── Icon map (icon type only) ────────────────────────────────────────────────
type LucideIcon = typeof Check
const ICON_MAP: Partial<Record<BadgeVariant, LucideIcon>> = {
  pending: MoreHorizontal,
  success: Check,
  info: Info,
  warning: AlertTriangle,
  error: X,
  'error-dark': X,
}

// ─── Icon pixel sizes ─────────────────────────────────────────────────────────
// Wrapper: sm = 12px (w-0_75), md = 16px (w-1) using theme tokens
const ICON_WRAPPER: Record<BadgeSize, string> = {
  sm: 'w-0_75 h-0_75',
  md: 'w-1 h-1',
}
const ICON_PX: Record<BadgeSize, number> = { sm: 8, md: 10 }

// ─── Component ────────────────────────────────────────────────────────────────
export function Badge({
  type,
  variant = 'default',
  count,
  max = 9,
  size = 'md',
  'aria-label': ariaLabel,
  className,
}: BadgeProps) {
  const colorClass = COLOR_CLASSES[variant]
  const label = ariaLabel ?? (count !== undefined ? String(count) : variant)

  // ── Dot ──────────────────────────────────────────────────────────────────
  if (type === 'dot') {
    return (
      <span
        className={cn('inline-block rounded-full w-[8px] h-[8px] shrink-0', colorClass, className)}
        aria-label={label}
      />
    )
  }

  // ── Counter ───────────────────────────────────────────────────────────────
  if (type === 'counter') {
    if (count === undefined || count === 0) return null
    const displayValue = count > max ? `+${max}` : count
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'font-bold select-none',
          'rounded-badge h-[16px] min-w-[16px] px-[4px]',
          'text-[12px] leading-[16px]',
          'ring-2 ring-neutral-0',
          colorClass,
          className,
        )}
        aria-label={label}
      >
        {displayValue}
      </span>
    )
  }

  // ── Icon ─────────────────────────────────────────────────────────────────
  const Icon = ICON_MAP[variant]
  const iconPx = ICON_PX[size]
  const wrapperSize = ICON_WRAPPER[size]

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full shrink-0 transition-colors',
        wrapperSize,
        colorClass,
        className,
      )}
      aria-label={label}
      role="img"
    >
      {Icon && <Icon size={iconPx} strokeWidth={2.5} aria-hidden="true" />}
    </span>
  )
}

Badge.displayName = 'Badge'
