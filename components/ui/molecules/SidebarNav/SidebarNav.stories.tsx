import type { Meta, StoryObj } from '@storybook/react'
import { Home, User, Settings, Bell, Search } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import { SidebarNavItem } from '../SidebarNavItem'

const meta: Meta<typeof SidebarNav> = {
  title: 'Molecules/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-64 bg-neutral-100 p-2 rounded">
      <SidebarNav>
        <SidebarNavItem label="Home" icon={<Home size={20} />} href="/" isActive />
        <SidebarNavItem label="Profile" icon={<User size={20} />} href="/profile" />
        <SidebarNavItem label="Settings" icon={<Settings size={20} />} href="/settings" />
        <SidebarNavItem label="Notifications" icon={<Bell size={20} />} href="/notifications" />
      </SidebarNav>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="w-16 bg-neutral-100 p-2 rounded">
      <SidebarNav>
        <SidebarNavItem label="Home" icon={<Home size={20} />} href="/" isActive isCollapsed />
        <SidebarNavItem label="Profile" icon={<User size={20} />} href="/profile" isCollapsed />
        <SidebarNavItem
          label="Settings"
          icon={<Settings size={20} />}
          href="/settings"
          isCollapsed
        />
        <SidebarNavItem
          label="Notifications"
          icon={<Bell size={20} />}
          href="/notifications"
          isCollapsed
        />
      </SidebarNav>
    </div>
  ),
}

export const WithBadges: Story = {
  render: () => (
    <div className="w-64 bg-neutral-100 p-2 rounded">
      <SidebarNav>
        <SidebarNavItem label="Home" icon={<Home size={20} />} href="/" />
        <SidebarNavItem label="Profile" icon={<User size={20} />} href="/profile" isActive />
        <SidebarNavItem label="Settings" icon={<Settings size={20} />} href="/settings" />
        <SidebarNavItem
          label="Notifications"
          icon={<Bell size={20} />}
          href="/notifications"
          badge={5}
        />
        <SidebarNavItem label="Search" icon={<Search size={20} />} href="/search" badge={12} />
      </SidebarNav>
    </div>
  ),
}

export const AsButtons: Story = {
  render: () => (
    <div className="w-64 bg-neutral-100 p-2 rounded">
      <SidebarNav>
        <SidebarNavItem
          label="Action 1"
          icon={<Home size={20} />}
          onClick={() => alert('Action 1')}
        />
        <SidebarNavItem
          label="Action 2"
          icon={<User size={20} />}
          onClick={() => alert('Action 2')}
          isActive
        />
        <SidebarNavItem
          label="Action 3"
          icon={<Settings size={20} />}
          onClick={() => alert('Action 3')}
        />
      </SidebarNav>
    </div>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <div className="w-72 bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg">
      <SidebarNav className="gap-2">
        <SidebarNavItem
          label="Dashboard"
          icon={<Home size={20} />}
          href="/"
          isActive
          className="font-bold"
        />
        <SidebarNavItem label="Team" icon={<User size={20} />} href="/team" />
        <SidebarNavItem label="Analytics" icon={<Search size={20} />} href="/analytics" />
      </SidebarNav>
    </div>
  ),
}
