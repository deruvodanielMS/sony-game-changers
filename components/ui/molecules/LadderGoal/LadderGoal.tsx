'use client'

import { CornerDownRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { LadderGoalProps } from './LadderGoal.types'

/**
 * LadderGoal displays a parent ambition/goal with a visual indicator.
 * Supports two variants:
 * - Default: Larger icon (24px) with text only
 * - Small: Smaller icon (16px) with custom children (avatar, text, status)
 */
export function LadderGoal({
  text,
  children,
  onClick,
  className,
  size = 'default',
}: LadderGoalProps) {
  const Element = onClick ? 'button' : 'div'
  const isSmall = size === 'small'

  return (
    <Element
      onClick={onClick}
      className={cn(
        'flex items-center text-left w-full',
        isSmall ? 'gap-1 h-auto' : 'gap-0.5 h-2',
        onClick && 'cursor-pointer transition-opacity',
        className,
      )}
      {...(onClick && { type: 'button' })}
    >
      {/* Icon container */}
      {isSmall ? (
        <CornerDownRight width={16} className="text-neutral-600 shrink-0" aria-hidden="true" />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center size-2 p-0.25 rounded-full shrink-0',
            onClick && 'hover:bg-neutral-100 transition-colors',
          )}
        >
          <CornerDownRight className="size-1.5 text-neutral-1000" aria-hidden="true" />
        </div>
      )}

      {/* Content */}
      {children || (
        <span className="flex-1 min-w-0 overflow-hidden text-ellipsis text-body leading-body text-neutral-600 line-clamp-1">
          {text}
        </span>
      )}
    </Element>
  )
}
