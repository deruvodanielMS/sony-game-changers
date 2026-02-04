import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    size: {
      control: 'select',
      options: ['L', 'S'],
    },
    status: {
      control: 'select',
      options: ['in-progress', 'completed'],
    },
    showPercentage: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    progress: 50,
  },
}

export const InProgress: Story = {
  args: {
    progress: 75,
    status: 'in-progress',
    size: 'L',
  },
}

export const Completed: Story = {
  args: {
    progress: 100,
    status: 'completed',
    size: 'L',
  },
}

export const SizeL: Story = {
  args: {
    progress: 60,
    size: 'L',
  },
}

export const SizeS: Story = {
  args: {
    progress: 60,
    size: 'S',
  },
}

export const WithoutPercentage: Story = {
  args: {
    progress: 45,
    showPercentage: false,
  },
}

export const ZeroProgress: Story = {
  args: {
    progress: 0,
  },
}

export const FullProgress: Story = {
  args: {
    progress: 100,
    status: 'completed',
  },
}

export const AllSizes: Story = {
  args: {
    progress: 75,
  },
  render: () => (
    <div className="flex flex-col gap-1_5 w-[300px]">
      <div className="flex flex-col gap-0_5">
        <span className="text-body-small text-neutral-500">Large (30px)</span>
        <ProgressBar progress={75} size="L" status="in-progress" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-body-small text-neutral-500">Small (20px)</span>
        <ProgressBar progress={75} size="S" status="in-progress" />
      </div>
    </div>
  ),
}

export const AllStatuses: Story = {
  args: {
    progress: 50,
  },
  render: () => (
    <div className="flex flex-col gap-1_5 w-[300px]">
      <div className="flex flex-col gap-0_5">
        <span className="text-body-small text-neutral-500">In Progress (0%)</span>
        <ProgressBar progress={0} status="in-progress" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-body-small text-neutral-500">In Progress (50%)</span>
        <ProgressBar progress={50} status="in-progress" />
      </div>
      <div className="flex flex-col gap-0_5">
        <span className="text-body-small text-neutral-500">Completed (100%)</span>
        <ProgressBar progress={100} status="completed" />
      </div>
    </div>
  ),
}

export const ProgressStages: Story = {
  args: {
    progress: 50,
  },
  render: () => (
    <div className="flex flex-col gap-1_5 w-[300px]">
      {[0, 25, 50, 75, 100].map((value) => (
        <div key={value} className="flex flex-col gap-0_5">
          <span className="text-body-small text-neutral-500">{value}% Progress</span>
          <ProgressBar progress={value} status={value === 100 ? 'completed' : 'in-progress'} />
        </div>
      ))}
    </div>
  ),
}

export const InCard: Story = {
  args: {
    progress: 75,
  },
  render: () => (
    <div className="bg-neutral-0 rounded-large p-1_5 shadow-sm w-[400px]">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="text-h6 font-semibold">Ambition Progress</h3>
          <span className="text-body-small text-neutral-500">75% Complete</span>
        </div>
        <ProgressBar progress={75} size="L" status="in-progress" />
        <p className="text-body-small text-neutral-500">3 of 4 actions completed</p>
      </div>
    </div>
  ),
}
