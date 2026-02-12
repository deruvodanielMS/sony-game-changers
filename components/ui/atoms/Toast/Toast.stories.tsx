import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'info'],
      description: 'Visual style variant of the toast',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Title',
    description: 'Description',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Title',
    description: 'Description',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Title',
    description: 'Description',
  },
}

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved successfully',
  },
}

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'New updates are available for your application.',
  },
}

export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Update Available',
    description:
      'A new version of the application is available. Please save your work and refresh to update.',
  },
}

export const WithMessageProp: Story = {
  args: {
    variant: 'success',
    message: 'Simple message using the message prop',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast variant="info" title="Title" description="Description" />
      <Toast variant="error" title="Title" description="Description" />
      <Toast variant="success" title="Title" description="Description" />
    </div>
  ),
}
