import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'UI/Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Success: Story = {
  args: {
    children: 'Completed',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    children: 'Failed',
    variant: 'error',
  },
}

export const Info: Story = {
  args: {
    children: 'Draft',
    variant: 'info',
  },
}

export const Primary: Story = {
  args: {
    children: 'Awaiting Approval',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Active',
    variant: 'secondary',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Badge',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium Badge',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Badge',
    size: 'lg',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}
