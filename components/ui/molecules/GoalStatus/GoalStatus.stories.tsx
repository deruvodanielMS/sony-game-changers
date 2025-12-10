import type { Meta, StoryObj } from '@storybook/react'
import { GoalStatus } from './GoalStatus'

const meta: Meta<typeof GoalStatus> = {
  title: 'Molecules/GoalStatus',
  component: GoalStatus,
  args: {
    className: '',
    status: 'completed',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['completed', 'draft', 'awaiting_approval'],
    },
  },
}

export default meta

type Story = StoryObj<typeof GoalStatus>

export const Default: Story = {
  args: {
    status: 'completed',
  },
}

export const Completed: Story = {
  args: {
    status: 'completed',
  },
}

export const Draft: Story = {
  args: {
    status: 'draft',
  },
}

export const AwaitingApproval: Story = {
  args: {
    status: 'awaiting_approval',
  },
}
