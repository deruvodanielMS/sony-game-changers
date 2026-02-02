import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Archive, CheckCircle, FileText } from 'lucide-react'
import { Tabs } from './Tabs'
import type { TabItem } from './Tabs.types'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ey4sUEAP1dM6jzI20Krwei/Library-for-Mockups?node-id=696-79&m=dev',
    },
    docs: {
      description: {
        component:
          'Horizontal tab navigation component with active state indication via bold text and bottom border. Supports icons and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently active tab value',
    },
    items: {
      control: 'object',
      description: 'Array of tab items',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when tab changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

// Basic tabs with two items
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('active')
    const items: TabItem[] = [
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived' },
    ]

    return (
      <div className="w-[400px]">
        <Tabs items={items} value={value} onChange={setValue} />
      </div>
    )
  },
}

// Multiple tabs
export const MultipleTabs: Story = {
  render: () => {
    const [value, setValue] = useState('all')
    const items: TabItem[] = [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
      { value: 'draft', label: 'Draft' },
      { value: 'archived', label: 'Archived' },
    ]

    return (
      <div className="w-[600px]">
        <Tabs items={items} value={value} onChange={setValue} />
      </div>
    )
  },
}

// Tabs with icons
export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('active')
    const items: TabItem[] = [
      { value: 'active', label: 'Active', icon: <CheckCircle className="size-1_5" /> },
      { value: 'draft', label: 'Draft', icon: <FileText className="size-1_5" /> },
      { value: 'archived', label: 'Archived', icon: <Archive className="size-1_5" /> },
    ]

    return (
      <div className="w-[500px]">
        <Tabs items={items} value={value} onChange={setValue} />
      </div>
    )
  },
}

// Tabs with disabled state
export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('active')
    const items: TabItem[] = [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending (Disabled)', disabled: true },
      { value: 'archived', label: 'Archived' },
    ]

    return (
      <div className="w-[500px]">
        <Tabs items={items} value={value} onChange={setValue} />
      </div>
    )
  },
}

// Active/Archived use case (real scenario)
export const ActiveArchived: Story = {
  render: () => {
    const [value, setValue] = useState('active')
    const items: TabItem[] = [
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived' },
    ]

    return (
      <div className="w-full max-w-[800px]">
        <Tabs items={items} value={value} onChange={setValue} />
        <div className="mt-2 p-2 bg-neutral-100 rounded-lg">
          <p className="text-body">
            {value === 'active' ? 'Showing active goals...' : 'Showing archived goals...'}
          </p>
        </div>
      </div>
    )
  },
}

// Full width tabs
export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('active')
    const items: TabItem[] = [
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived' },
    ]

    return (
      <div className="w-full">
        <Tabs items={items} value={value} onChange={setValue} />
      </div>
    )
  },
  parameters: {
    layout: 'padded',
  },
}
