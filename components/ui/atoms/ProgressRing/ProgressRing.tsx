'use client'

import { useId } from 'react'
import { cn } from '@/utils/cn'
import { Typography } from '@/components/ui/foundations/Typography'
import type { ProgressRingProps } from './ProgressRing.types'

/**
 * ProgressRing - Circular progress indicator
 * Displays progress as a ring with customizable size, color, and percentage
 * Reusable across the application for showing completion status
 */
export function ProgressRing({
  progress = 0,
  size = 48,
  strokeWidth = 6,
  color,
  backgroundColor = '#E8E4FF',
  showPercentage = false,
  percentageVariant = 'h5',
  layout = 'default',
  className,
  'data-test-id': dataTestId,
}: ProgressRingProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference
  const gradientId = `progress-gradient-${useId()}`

  // Use solid color if provided, otherwise use gradient
  const useGradient = !color

  const ringElement = (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('rotate-90 scale-x-[-1]', !showPercentage && className)}
      data-test-id={dataTestId}
    >
      {useGradient && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--color-extra-blue-600)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-extra-pink-600)' }} />
          </linearGradient>
        </defs>
      )}

      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />

      {/* Progress circle with color or gradient */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color ? undefined : `url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.3s ease',
          ...(color && { stroke: color }),
        }}
      />
    </svg>
  )

  if (!showPercentage) {
    return ringElement
  }

  // Side layout: percentage displayed to the right of the ring
  if (layout === 'side') {
    return (
      <div className={cn('flex gap-0.5 items-center', className)} data-test-id={dataTestId}>
        {ringElement}
        <Typography variant="body" fontWeight="bold" className="text-neutral-1000 text-right">
          {normalizedProgress}%
        </Typography>
      </div>
    )
  }

  // Default layout: percentage inside the ring
  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {ringElement}
      <div className="absolute inset-0 flex items-center justify-center">
        <Typography variant={percentageVariant} className="text-neutral-1000">
          {normalizedProgress}%
        </Typography>
      </div>
    </div>
  )
}

ProgressRing.displayName = 'ProgressRing'
