'use client'

import { useTranslations } from 'next-intl'
import { Target, Sprout, BriefcaseBusiness, Shrub } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { TypeIconProps, AmbitionType } from './TypeIcon.types'
import { GOAL_TYPES } from '@/domain/goal'

type IconKey = 'business' | 'manager_effectiveness' | 'personal_growth_and_development'

const typeToIconKey: Record<AmbitionType, IconKey> = {
  [GOAL_TYPES.BUSINESS]: 'business',
  [GOAL_TYPES.MANAGER_EFFECTIVENESS]: 'manager_effectiveness',
  [GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT]: 'personal_growth_and_development',
}

const defaultIcons: Record<IconKey, typeof Sprout> = {
  business: BriefcaseBusiness,
  manager_effectiveness: Sprout,
  personal_growth_and_development: Shrub,
}

const variantStyles = {
  badge: {
    container: 'size-3 p-0.625 bg-neutral-100',
    icon: 'size-1.5 text-neutral-1000',
  },
  metadata: {
    container: 'size-1.5',
    icon: 'size-1.125 text-neutral-500',
  },
  higher: {
    container: 'size-2 p-0.25 bg-neutral-0 border-2 border-feedback-info-500',
    icon: 'size-1.125 text-feedback-info-500',
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
  tooltip,
  className,
  'data-test-id': dataTestId,
}: TypeIconProps) {
  const t = useTranslations('TypeIcon')

  // Normalize type to use underscores (handles both formats)
  const normalizedType = type.replace(/-/g, '_')
  const iconKey = (typeToIconKey[normalizedType as AmbitionType] as IconKey) || 'business'
  const Icon = CustomIcon || defaultIcons[iconKey] || Target
  const styles = variantStyles[variant]

  // Use custom tooltip or fallback to translation
  const tooltipText = tooltip || t(iconKey)

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
      title={tooltipText}
    >
      <Icon className={styles.icon} />
    </div>
  )
}

TypeIcon.displayName = 'TypeIcon'
