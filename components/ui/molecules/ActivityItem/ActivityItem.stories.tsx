import type { Meta, StoryObj } from '@storybook/react'
import { ActivityItem } from './ActivityItem'
import { Typography } from '@/components/ui/foundations/Typography'
import { Badge } from '@/components/ui/atoms/Badge'
import { ArrowRight } from 'lucide-react'

const meta: Meta<typeof ActivityItem> = {
  title: 'UI/Molecules/ActivityItem',
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
      avatar: '/profile-img/person1.webp',
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
      avatar: '/profile-img/person2.webp',
    },
    date: '3 hours ago',
    children: (
      <>
        <Typography variant="body">changed the status</Typography>
        <div className="flex gap-0.5 items-center flex-wrap">
          <Badge variant="info">Draft</Badge>
          <ArrowRight className="size-1 text-neutral-1000" />
          <Badge variant="primary">Awaiting Approval</Badge>
        </div>
      </>
    ),
  },
}

export const Completed: Story = {
  args: {
    user: {
      name: 'Sarah Johnson',
      avatar: '/profile-img/person3.webp',
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
      avatar: '/profile-img/person4.webp',
    },
    date: 'yesterday',
    children: <Typography variant="body">approved the Ambition</Typography>,
  },
}

export const SmallSize: Story = {
  args: {
    user: {
      name: 'Emma Wilson',
      avatar: '/profile-img/person5.webp',
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
      avatar: '/profile-img/person1.webp',
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
      <ActivityItem
        user={{ name: 'John Doe', avatar: '/profile-img/person1.webp' }}
        date="2 hours ago"
      >
        <Typography variant="body">
          <span className="font-bold text-feedback-success-600">Completed</span> the ambition
        </Typography>
      </ActivityItem>

      <ActivityItem
        user={{ name: 'Sarah Johnson', avatar: '/profile-img/person2.webp' }}
        date="5 hours ago"
      >
        <Typography variant="body">approved the Ambition</Typography>
      </ActivityItem>

      <ActivityItem
        user={{ name: 'Mike Chen', avatar: '/profile-img/person3.webp' }}
        date="1 day ago"
      >
        <>
          <Typography variant="body">changed the status</Typography>
          <div className="flex gap-0.5 items-center flex-wrap">
            <Badge variant="info">Draft</Badge>
            <ArrowRight className="size-1 text-neutral-1000" />
            <Badge variant="primary">Awaiting Approval</Badge>
          </div>
        </>
      </ActivityItem>

      <ActivityItem
        user={{ name: 'Emma Wilson', avatar: '/profile-img/person4.webp' }}
        date="2 days ago"
      >
        <>
          <Typography variant="body">created the Ambition as</Typography>
          <Badge variant="info">Draft</Badge>
        </>
      </ActivityItem>
    </div>
  ),
}
