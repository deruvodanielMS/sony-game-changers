import type { Meta, StoryObj } from '@storybook/react'
import { Home, User, Settings, Bell, TrendingUp } from 'lucide-react'
import { SidebarNavItem } from './SidebarNavItem'

const meta: Meta<typeof SidebarNavItem> = {
  title: 'Molecules/SidebarNavItem',
  component: SidebarNavItem,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Home',
    icon: <Home size={20} />,
    href: '/',
  },
}

export const Active: Story = {
  args: {
    label: 'Profile',
    icon: <User size={20} />,
    href: '/profile',
    isActive: true,
  },
}

export const Collapsed: Story = {
  args: {
    label: 'Settings',
    icon: <Settings size={20} />,
    href: '/settings',
    isCollapsed: true,
  },
}

export const CollapsedActive: Story = {
  args: {
    label: 'Notifications',
    icon: <Bell size={20} />,
    href: '/notifications',
    isActive: true,
    isCollapsed: true,
  },
}

export const WithBadge: Story = {
  args: {
    label: 'Notifications',
    icon: <Bell size={20} />,
    href: '/notifications',
    badge: 5,
  },
}

export const WithBadgeActive: Story = {
  args: {
    label: 'Analytics',
    icon: <TrendingUp size={20} />,
    href: '/analytics',
    badge: 12,
    isActive: true,
  },
}

export const AsButton: Story = {
  args: {
    label: 'Click me',
    icon: <Settings size={20} />,
    onClick: () => alert('Clicked!'),
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">Expanded</h3>
        <div className="w-64 bg-neutral-100 p-2 rounded space-y-1">
          <SidebarNavItem label="Inactive" icon={<Home size={20} />} href="/" />
          <SidebarNavItem label="Active" icon={<User size={20} />} href="/profile" isActive />
          <SidebarNavItem label="With Badge" icon={<Bell size={20} />} href="/bell" badge={5} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Collapsed</h3>
        <div className="w-16 bg-neutral-100 p-2 rounded space-y-1">
          <SidebarNavItem label="Inactive" icon={<Home size={20} />} href="/" isCollapsed />
          <SidebarNavItem
            label="Active"
            icon={<User size={20} />}
            href="/profile"
            isActive
            isCollapsed
          />
          <SidebarNavItem
            label="With Badge"
            icon={<Bell size={20} />}
            href="/bell"
            badge={5}
            isCollapsed
          />
        </div>
      </div>
    </div>
  ),
}
