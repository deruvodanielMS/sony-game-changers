import type { Meta, StoryObj } from '@storybook/react'
import { Error } from './Error'
import { Button } from '@/components/ui/atoms/Button'
import { Link } from '@/i18n/navigation'

const meta: Meta<typeof Error> = {
  title: 'Molecules/Error',
  component: Error,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Custom404: Story = {
  args: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    children: (
      <Link href="/">
        <Button variant="primary">Go to Homepage</Button>
      </Link>
    ),
  },
}

export const Custom500: Story = {
  args: {
    title: '500 - Server Error',
    description: 'Something went wrong on our end. Please try again later.',
    children: (
      <Button variant="primary" onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    ),
  },
}

export const Custom403: Story = {
  args: {
    title: '403 - Forbidden',
    description: 'You do not have permission to access this resource.',
    children: (
      <div className="flex gap-2">
        <Link href="/">
          <Button variant="secondary">Go Back</Button>
        </Link>
        <Button variant="primary">Contact Support</Button>
      </div>
    ),
  },
}

export const NetworkError: Story = {
  args: {
    title: 'Network Error',
    description: 'Unable to connect to the server. Please check your internet connection.',
    children: (
      <Button variant="primary" onClick={() => window.location.reload()}>
        Try Again
      </Button>
    ),
  },
}
