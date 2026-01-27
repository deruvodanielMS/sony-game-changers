'use client'

import { Target, Sprout, BriefcaseBusiness, Shrub } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { TypeIconProps, AmbitionType } from './TypeIcon.types'
import { GOAL_TYPES } from '@/domain/goal'

type IconKey = 'business' | 'manager-effectiveness' | 'personal-growth-and-development'

const typeToIconKey: Record<AmbitionType, IconKey> = {
  [GOAL_TYPES.BUSINESS]: 'business',
  [GOAL_TYPES.MANAGER_EFFECTIVENESS]: 'manager-effectiveness',
  [GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: 'personal-growth-and-development',
}

const defaultIcons: Record<IconKey, typeof Sprout> = {
  business: BriefcaseBusiness,
  'manager-effectiveness': Sprout,
  'personal-growth-and-development': Shrub,
}

const variantStyles = {
  badge: {
    container: 'size-3 p-0.625 bg-neutral-100',
    icon: 'size-1.5 text-neutral-1000',
  },
  metadata: {
    container: 'size-1.5 bg-neutral-600',
    icon: 'size-0.75 text-neutral-0',
  },
}

/**
 * TypeIcon - Displays an icon for ambition types
 *
 * A molecule component that shows an icon within a circular background.
 * Used to visually identify different types of ambitions (Business, Manager Effectiveness, Personal Growth).
 *
 * Supports two variants:
 * - badge: 48px container with neutral-100 background (for GoalCard)
 * - metadata: 24px container with neutral-600 background (for AmbitionDetailHeader metadata)
 *
 * @example
 * ```tsx
 * <TypeIcon type="business" variant="badge" />
 * <TypeIcon type="manager-effectiveness" variant="metadata" />
 * ```
 */
export function TypeIcon({
  type,
  icon: CustomIcon,
  variant = 'badge',
  className,
  'data-test-id': dataTestId,
}: TypeIconProps) {
  const iconKey = (typeToIconKey[type as AmbitionType] as IconKey) || 'business'
  const Icon = CustomIcon || defaultIcons[iconKey] || Target
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0',
        styles.container,
        className,
      )}
      data-testid={dataTestId}
      role="img"
      aria-label={`${type} ambition`}
    >
      <Icon className={styles.icon} />
    </div>
  )
}

TypeIcon.displayName = 'TypeIcon'
