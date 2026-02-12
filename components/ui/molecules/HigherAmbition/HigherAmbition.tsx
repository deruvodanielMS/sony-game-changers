'use client'

import { cn } from '@/utils/cn'
import { Typography } from '@/components/ui/foundations/Typography'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import { GOAL_TYPES } from '@/domain/goal'
import type { HigherAmbitionProps } from './HigherAmbition.types'

/**
 * HigherAmbition displays a parent goal/ambition with an upward arrow icon.
 * Similar to LadderGoal but indicates hierarchical parent (higher level).
 * Based on Figma design: node-id=17167-19794
 */
export function HigherAmbition({ text, goalType, onClick, className }: HigherAmbitionProps) {
  const Element = onClick ? 'button' : 'div'

  return (
    <Element
      onClick={onClick}
      className={cn(
        'flex items-center gap-1 h-2 text-left w-full',
        onClick && 'cursor-pointer',
        className,
      )}
      {...(onClick && { type: 'button' })}
    >
      {/* Type Icon - 32px with info border */}
      <div
        className={cn(
          'shrink-0',
          onClick && 'hover:bg-extra-purple-100 rounded-full transition-colors',
        )}
      >
        <TypeIcon type={goalType || GOAL_TYPES.BUSINESS} variant="higher" />
      </div>

      {/* Text content */}
      <Typography
        variant="bodySmall"
        color="textSecondary"
        className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {text}
      </Typography>
    </Element>
  )
}
