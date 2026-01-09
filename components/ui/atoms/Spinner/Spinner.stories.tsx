import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component with customizable size and color variants. Used to indicate loading states throughout the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the spinner',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center gap-0_5">
        <Spinner size="small" />
        <span className="text-xs text-neutral-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-0_5">
        <Spinner size="medium" />
        <span className="text-xs text-neutral-600">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-0_5">
        <Spinner size="large" />
        <span className="text-xs text-neutral-600">Large</span>
      </div>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-1 p-2 border border-neutral-300 rounded-default">
      <Spinner size="large" />
      <p className="text-neutral-600">Loading content...</p>
    </div>
  ),
}
