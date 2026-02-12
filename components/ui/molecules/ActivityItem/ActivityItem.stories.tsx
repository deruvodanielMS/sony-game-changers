import type { Meta, StoryObj } from '@storybook/react'
import { ActivityItem } from './ActivityItem'
import { Typography } from '@/components/ui/foundations/Typography'
import { AmbitionStatus } from '@/components/ui/atoms/AmbitionStatus'
import { ArrowRight } from 'lucide-react'

const meta: Meta<typeof ActivityItem> = {
  title: 'Molecules/ActivityItem',
  component: ActivityItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays a single activity item in a timeline format with user avatar, name, action content, and timestamp. Uses Framer Motion for entry animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant for mobile (sm) or desktop (md)',
    },
    avatarSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
  },
}

export default meta
type Story = StoryObj<typeof ActivityItem>

export const Default: Story = {
  args: {
    user: {
      name: 'John Doe',
    },
    date: '2 hours ago',
    children: <Typography variant="body">completed the task</Typography>,
  },
}

export const WithoutAvatar: Story = {
  args: {
    user: {
      name: 'Jane Smith',
    },
    date: '1 day ago',
    children: <Typography variant="body">created a new ambition</Typography>,
  },
}

export const StatusChange: Story = {
  args: {
    user: {
      name: 'Mike Chen',
    },
    date: '3 hours ago',
    children: (
      <>
        <Typography variant="body">changed the status</Typography>
        <div className="flex gap-0.5 items-center flex-wrap">
          <AmbitionStatus variant="draft">Draft</AmbitionStatus>
          <ArrowRight className="size-1 text-neutral-1000" />
          <AmbitionStatus variant="awaiting-approval">Awaiting Approval</AmbitionStatus>
        </div>
      </>
    ),
  },
}

export const Completed: Story = {
  args: {
    user: {
      name: 'Sarah Johnson',
    },
    date: '5 minutes ago',
    children: (
      <Typography variant="body">
        <span className="font-bold text-feedback-success-600">Completed</span> the ambition
      </Typography>
    ),
  },
}

export const Approved: Story = {
  args: {
    user: {
      name: 'David Park',
    },
    date: 'yesterday',
    children: <Typography variant="body">approved the Ambition</Typography>,
  },
}

export const SmallSize: Story = {
  args: {
    user: {
      name: 'Emma Wilson',
    },
    date: 'just now',
    size: 'sm',
    avatarSize: 'sm',
    children: <Typography variant="body">updated the description</Typography>,
  },
}

export const LargeAvatar: Story = {
  args: {
    user: {
      name: 'Lisa Brown',
    },
    date: '2 days ago',
    avatarSize: 'lg',
    children: <Typography variant="body">started working on this</Typography>,
  },
}

// Multiple activities example
export const Timeline: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-2xl">
      <ActivityItem user={{ name: 'John Doe' }} date="2 hours ago">
        <Typography variant="body">
          <span className="font-bold text-feedback-success-600">Completed</span> the ambition
        </Typography>
      </ActivityItem>

      <ActivityItem user={{ name: 'Sarah Johnson' }} date="5 hours ago">
        <Typography variant="body">approved the Ambition</Typography>
      </ActivityItem>

      <ActivityItem user={{ name: 'Mike Chen' }} date="1 day ago">
        <>
          <Typography variant="body">changed the status</Typography>
          <div className="flex gap-0.5 items-center flex-wrap">
            <AmbitionStatus variant="draft">Draft</AmbitionStatus>
            <ArrowRight className="size-1 text-neutral-1000" />
            <AmbitionStatus variant="awaiting-approval">Awaiting Approval</AmbitionStatus>
          </div>
        </>
      </ActivityItem>

      <ActivityItem user={{ name: 'Emma Wilson' }} date="2 days ago">
        <>
          <Typography variant="body">created the Ambition as</Typography>
          <AmbitionStatus variant="draft">Draft</AmbitionStatus>
        </>
      </ActivityItem>
    </div>
  ),
}
