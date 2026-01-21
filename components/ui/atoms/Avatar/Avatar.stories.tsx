import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta = {
  title: 'UI/Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    src: '/profile-img/profile.png',
    alt: 'User Avatar',
  },
}

export const WithInitials: Story = {
  args: {
    alt: 'John Doe',
  },
}

export const CustomFallback: Story = {
  args: {
    alt: 'User',
    fallback: <span className="text-sm font-bold">JD</span>,
  },
}

export const SizeXS: Story = {
  args: {
    alt: 'User',
    size: 'xs',
  },
}

export const SizeSM: Story = {
  args: {
    alt: 'User',
    size: 'sm',
  },
}

export const SizeMD: Story = {
  args: {
    alt: 'User',
    size: 'md',
  },
}

export const SizeLG: Story = {
  args: {
    alt: 'User',
    size: 'lg',
  },
}

export const SizeXL: Story = {
  args: {
    alt: 'User',
    size: 'xl',
  },
}

export const SquareShape: Story = {
  args: {
    alt: 'User',
    shape: 'square',
  },
}

export const AllSizes: Story = {
  args: {
    alt: 'User',
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar alt="User" size="xs" />
      <Avatar alt="User" size="sm" />
      <Avatar alt="User" size="md" />
      <Avatar alt="User" size="lg" />
      <Avatar alt="User" size="xl" />
    </div>
  ),
}

export const AllShapes: Story = {
  args: {
    alt: 'User',
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar alt="User" shape="circle" />
      <Avatar alt="User" shape="square" />
    </div>
  ),
}
