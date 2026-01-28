import type { Meta, StoryObj } from '@storybook/react'
import { LanguageSwitcher } from './LanguageSwitcher'

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isCollapsed: false,
  },
}

export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
}

export const BothStates: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <p className="text-sm text-neutral-600 mb-2">Expanded (Desktop)</p>
        <LanguageSwitcher isCollapsed={false} />
      </div>
      <div>
        <p className="text-sm text-neutral-600 mb-2">Collapsed (Mobile)</p>
        <LanguageSwitcher isCollapsed={true} />
      </div>
    </div>
  ),
}

export const InSidebar: Story = {
  render: () => (
    <div className="w-64 bg-neutral-100 p-4 rounded">
      <h3 className="text-sm font-semibold mb-4">Sidebar Settings</h3>
      <div className="space-y-2">
        <div className="p-2 bg-white rounded">Profile</div>
        <div className="p-2 bg-white rounded">Preferences</div>
        <LanguageSwitcher />
        <div className="p-2 bg-white rounded">Logout</div>
      </div>
    </div>
  ),
}

export const InCollapsedSidebar: Story = {
  render: () => (
    <div className="w-16 bg-neutral-100 p-2 rounded">
      <div className="space-y-2 flex flex-col items-center">
        <div className="w-8 h-8 bg-white rounded" title="Profile" />
        <div className="w-8 h-8 bg-white rounded" title="Preferences" />
        <LanguageSwitcher isCollapsed={true} />
        <div className="w-8 h-8 bg-white rounded" title="Logout" />
      </div>
    </div>
  ),
}
