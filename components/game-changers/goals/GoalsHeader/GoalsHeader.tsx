'use client'

import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/organisms/SectionHeader'
import { MetricCard } from '@/components/ui/molecules/MetricCard'
import { ProgressRing } from '@/components/ui/atoms/ProgressRing'
import type { GoalsHeaderProps } from './GoalsHeader.types'

/**
 * GoalsHeader - Specific header for the Goals section in Game Changers
 * Composes SectionHeader with MetricCards to show goals statistics
 * Uses i18n for title and description
 */
export function GoalsHeader({ className, 'data-test-id': dataTestId }: GoalsHeaderProps) {
  const t = useTranslations('Goals')

  // In a real app, these would come from props or API
  const completedCount = 18
  const totalGoals = 24
  const completedPercentage = Math.round((completedCount / totalGoals) * 100)

  const nonStartedCount = 6
  const nonStartedPercentage = Math.round((nonStartedCount / totalGoals) * 100)

  const metrics = [
    {
      label: t('completed'),
      value: completedCount,
      icon: <ProgressRing progress={completedPercentage} size={48} strokeWidth={6} />,
    },
    {
      label: t('nonStarted'),
      value: nonStartedCount,
      icon: <ProgressRing progress={nonStartedPercentage} size={48} strokeWidth={6} />,
    },
  ]

  const actions = (
    <>
      {metrics.map((metric) => (
        <MetricCard
          key={metric.value}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </>
  )

  return (
    <SectionHeader
      title={t('title')}
      description={t('description')}
      actions={actions}
      className={className}
      data-test-id={dataTestId}
    />
  )
}

GoalsHeader.displayName = 'GoalsHeader'
