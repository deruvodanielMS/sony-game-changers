import type { Meta, StoryObj } from '@storybook/react'
import { MetricCard } from './MetricCard'
import { ProgressRing } from '@/components/ui/atoms/ProgressRing'

const meta = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Metric label text',
    },
    value: {
      control: 'text',
      description: 'Metric value (number or string)',
    },
    icon: {
      control: false,
      description: 'Optional icon element (can be ProgressRing or any React element)',
    },
  },
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default metric card without icon
 */
export const Default: Story = {
  args: {
    label: 'Total Goals',
    value: 24,
  },
}

/**
 * Metric card with ProgressRing icon showing completion percentage
 */
export const WithProgressRing: Story = {
  args: {
    label: 'Completed',
    value: 18,
    icon: <ProgressRing progress={75} size={48} strokeWidth={6} />,
  },
}

/**
 * Example showing multiple metric cards together (as used in Goals section)
 */
export const GoalsMetrics: Story = {
  args: {
    label: 'Completed',
    value: 18,
  },
  render: () => (
    <div className="flex gap-1_5">
      <MetricCard
        label="Completed"
        value={18}
        icon={<ProgressRing progress={75} size={48} strokeWidth={6} />}
      />
      <MetricCard
        label="Non Started"
        value={6}
        icon={<ProgressRing progress={25} size={48} strokeWidth={6} />}
      />
    </div>
  ),
}
