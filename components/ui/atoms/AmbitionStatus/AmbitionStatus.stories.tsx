import type { Meta, StoryObj } from '@storybook/react'
import { AmbitionStatus } from './AmbitionStatus'

const meta = {
  title: 'Atoms/AmbitionStatus',
  component: AmbitionStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'draft', 'awaiting-approval', 'in-progress', 'done', 'archived'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof AmbitionStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Draft: Story = {
  args: {
    children: 'Draft',
    variant: 'draft',
  },
}

export const AwaitingApproval: Story = {
  args: {
    children: 'Awaiting Approval',
    variant: 'awaiting-approval',
  },
}

export const InProgress: Story = {
  args: {
    children: 'In progress',
    variant: 'in-progress',
  },
}

export const Done: Story = {
  args: {
    children: 'Done',
    variant: 'done',
  },
}

export const Archived: Story = {
  args: {
    children: 'Archived',
    variant: 'archived',
  },
}

export const Small: Story = {
  args: {
    children: 'Draft',
    variant: 'draft',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Draft',
    variant: 'draft',
    size: 'md',
  },
}

export const AllVariants: Story = {
  args: {
    children: 'Status',
  },
  render: () => (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-0_5">
        <p className="text-body-small text-neutral-500">Medium (md)</p>
        <AmbitionStatus variant="draft" size="md">
          Draft
        </AmbitionStatus>
        <AmbitionStatus variant="awaiting-approval" size="md">
          Awaiting Approval
        </AmbitionStatus>
        <AmbitionStatus variant="archived" size="md">
          Archived
        </AmbitionStatus>
        <AmbitionStatus variant="in-progress" size="md">
          In progress
        </AmbitionStatus>
        <AmbitionStatus variant="done" size="md">
          Done
        </AmbitionStatus>
      </div>
      <div className="flex flex-col gap-0_5">
        <p className="text-body-small text-neutral-500">Small (sm)</p>
        <AmbitionStatus variant="draft" size="sm">
          Draft
        </AmbitionStatus>
        <AmbitionStatus variant="awaiting-approval" size="sm">
          Awaiting Approval
        </AmbitionStatus>
        <AmbitionStatus variant="archived" size="sm">
          Archived
        </AmbitionStatus>
        <AmbitionStatus variant="in-progress" size="sm">
          In progress
        </AmbitionStatus>
        <AmbitionStatus variant="done" size="sm">
          Done
        </AmbitionStatus>
      </div>
    </div>
  ),
}
