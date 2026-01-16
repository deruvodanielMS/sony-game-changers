'use client'

import { Target, Sprout, BriefcaseBusiness, Shrub } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { TypeIconProps, AmbitionType } from './TypeIcon.types'

const defaultIcons: Record<AmbitionType, typeof Sprout> = {
  business: Sprout,
  'manager-effectiveness': BriefcaseBusiness,
  'personal-growth-and-development': Shrub,
}

const sizeMap = {
  sm: {
    container: 'size-2',
    icon: 'size-1',
    padding: 'p-0.375',
  },
  md: {
    container: 'size-3',
    icon: 'size-1.5',
    padding: 'p-0.625',
  },
  lg: {
    container: 'size-4',
    icon: 'size-2',
    padding: 'p-0.75',
  },
}

/**
 * TypeIcon - Displays an icon with gradient background for ambition types
 *
 * A molecule component that shows an icon within a circular gradient background.
 * Used to visually identify different types of ambitions (Business, Manager Effectiveness, Personal Growth).
 *
 * @example
 * ```tsx
 * <TypeIcon type="business" size="md" />
 * <TypeIcon type="manager-effectiveness" gradient={["#ff0000", "#00ff00"]} />
 * ```
 */
export function TypeIcon({
  type,
  icon: CustomIcon,
  size = 'md',
  gradient = ['#5577f4', '#d061ff'],
  className,
  'data-test-id': dataTestId,
}: TypeIconProps) {
  const Icon = CustomIcon || defaultIcons[type] || Target

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0',
        sizeMap[size].container,
        sizeMap[size].padding,
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to left, ${gradient[0]}, ${gradient[1]})`,
      }}
      data-testid={dataTestId}
      role="img"
      aria-label={`${type} ambition`}
    >
      <Icon className={cn(sizeMap[size].icon, 'text-neutral-0')} />
    </div>
  )
}

TypeIcon.displayName = 'TypeIcon'
