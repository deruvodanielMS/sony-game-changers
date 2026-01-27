import type { Meta, StoryObj } from '@storybook/react'
import { CheckCircle, XCircle, Info as InfoIcon, AlertTriangle } from 'lucide-react'
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
    content: 'This is a toast notification',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    content: (
      <div className="flex items-center gap-2">
        <CheckCircle className="text-feedback-success-600" size={20} />
        <span>Changes saved successfully</span>
      </div>
    ),
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    content: (
      <div className="flex items-center gap-2">
        <XCircle className="text-feedback-danger-600" size={20} />
        <span>Error: Could not save changes</span>
      </div>
    ),
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    content: (
      <div className="flex items-center gap-2">
        <InfoIcon className="text-feedback-info-600" size={20} />
        <span>New updates available</span>
      </div>
    ),
  },
}

export const Warning: Story = {
  args: {
    content: (
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-feedback-warning-600" size={20} />
        <span>Warning: This action cannot be undone</span>
      </div>
    ),
  },
}

export const LongContent: Story = {
  args: {
    content: (
      <div className="flex flex-col gap-1 max-w-xs">
        <strong>Update Available</strong>
        <p className="text-sm text-neutral-600">
          A new version of the application is available. Please save your work and refresh to
          update.
        </p>
      </div>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        content={
          <div className="flex items-center gap-2">
            <CheckCircle className="text-feedback-success-600" size={20} />
            <span>Success notification</span>
          </div>
        }
      />
      <Toast
        content={
          <div className="flex items-center gap-2">
            <XCircle className="text-feedback-danger-600" size={20} />
            <span>Error notification</span>
          </div>
        }
      />
      <Toast
        content={
          <div className="flex items-center gap-2">
            <InfoIcon className="text-feedback-info-600" size={20} />
            <span>Info notification</span>
          </div>
        }
      />
      <Toast
        content={
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-feedback-warning-600" size={20} />
            <span>Warning notification</span>
          </div>
        }
      />
    </div>
  ),
}
