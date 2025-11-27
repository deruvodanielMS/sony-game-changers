import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default sidebar - expanded state
 */
export const Default: Story = {
  args: {
    isCollapsed: false,
  },
  decorators: [
    (Story: any) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

/**
 * Collapsed sidebar - shows only icons
 */
export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
  decorators: [
    (Story: any) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

/**
 * Interactive sidebar - toggle between expanded and collapsed
 */
export const Interactive: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
      <div className="h-screen">
        <Sidebar isCollapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
    )
  },
}

/**
 * Without toggle button - for mobile drawer use
 */
export const WithoutToggle: Story = {
  args: {
    isCollapsed: false,
    hideToggle: true,
  },
  decorators: [
    (Story: any) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

/**
 * Mobile drawer variant - no logo, no toggle, no border, no padding
 */
export const MobileDrawerVariant: Story = {
  args: {
    isCollapsed: false,
    hideToggle: true,
    hideBorder: true,
    noPadding: true,
  },
  decorators: [
    (Story: any) => (
      <div className="h-screen bg-neutral-100">
        <Story />
      </div>
    ),
  ],
}
