import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './SectionHeader'
import { MetricCard } from '@/components/ui/molecules/MetricCard'
import { ProgressRing } from '@/components/ui/atoms/ProgressRing'

const meta = {
  title: 'Organisms/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    description: {
      control: 'text',
      description: 'Optional section description',
    },
    actions: {
      control: false,
      description: 'Optional actions/metrics to display on the right',
    },
  },
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default section header with title and description
 */
export const Default: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a description for the section.',
  },
}

/**
 * Section header without description
 */
export const WithoutDescription: Story = {
  args: {
    title: 'Section Title Only',
  },
}

/**
 * Section header with metric cards (as used in Goals section)
 */
export const WithMetrics: Story = {
  args: {
    title: 'Your Team Goals',
    description: 'This is the place for an amazing section description.',
    actions: (
      <>
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
      </>
    ),
  },
}
