import type { MetricCardProps } from '@/components/ui/molecules/MetricCard'

export interface GoalsHeaderProps {
  className?: string
  'data-test-id'?: string
}

export interface GoalsMetric extends Omit<MetricCardProps, 'data-test-id'> {}
