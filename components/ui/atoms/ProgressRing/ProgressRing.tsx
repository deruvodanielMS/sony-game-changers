'use client'

import { cn } from '@/utils/cn'
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
  color = '#9D7FFF',
  backgroundColor = '#E8E4FF',
  className,
  'data-test-id': dataTestId,
}: ProgressRingProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference
  const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('rotate-[-90deg]', className)}
      data-test-id={dataTestId}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--color-extra-blue-600)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-extra-pink-600)' }} />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />

      {/* Progress circle with gradient */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  )
}

ProgressRing.displayName = 'ProgressRing'
