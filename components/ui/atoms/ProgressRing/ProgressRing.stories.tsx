import type { Meta, StoryObj } from '@storybook/react'
import { ProgressRing } from './ProgressRing'

const meta = {
  title: 'Atoms/ProgressRing',
  component: ProgressRing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0-100)',
    },
    size: {
      control: { type: 'number' },
      description: 'Size in pixels (width and height)',
    },
    strokeWidth: {
      control: { type: 'number' },
      description: 'Width of the ring stroke',
    },
  },
} satisfies Meta<typeof ProgressRing>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default progress ring at 75% completion
 */
export const Default: Story = {
  args: {
    progress: 75,
  },
}

/**
 * Progress ring at 25% completion
 */
export const LowProgress: Story = {
  args: {
    progress: 25,
  },
}

/**
 * Progress ring at 100% completion
 */
export const Complete: Story = {
  args: {
    progress: 100,
  },
}

/**
 * Progress ring at 0% (empty)
 */
export const Empty: Story = {
  args: {
    progress: 0,
  },
}

/**
 * Multiple progress rings showing different percentages (as used in Goals section)
 */
export const MultipleRings: Story = {
  args: {
    progress: 75,
  },
  render: () => (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-center gap-0_5">
        <ProgressRing progress={75} size={48} strokeWidth={6} />
        <span className="text-body-small text-neutral-500">75%</span>
      </div>
      <div className="flex flex-col items-center gap-0_5">
        <ProgressRing progress={50} size={48} strokeWidth={6} />
        <span className="text-body-small text-neutral-500">50%</span>
      </div>
      <div className="flex flex-col items-center gap-0_5">
        <ProgressRing progress={25} size={48} strokeWidth={6} />
        <span className="text-body-small text-neutral-500">25%</span>
      </div>
    </div>
  ),
}
