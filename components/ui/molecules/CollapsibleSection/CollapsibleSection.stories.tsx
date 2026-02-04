import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CollapsibleSection } from './CollapsibleSection'
import { Button } from '@/components/ui/atoms/Button'

const meta: Meta<typeof CollapsibleSection> = {
  title: 'Molecules/CollapsibleSection',
  component: CollapsibleSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'toggled' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Section Title',
    defaultOpen: true,
    children: (
      <div className="p-4 bg-neutral-100 rounded">
        <p>This is the collapsible content</p>
      </div>
    ),
  },
}

export const DefaultClosed: Story = {
  args: {
    title: 'Closed by Default',
    defaultOpen: false,
    children: (
      <div className="p-4 bg-neutral-100 rounded">
        <p>This content starts collapsed</p>
      </div>
    ),
  },
}

export const WithRichContent: Story = {
  args: {
    title: 'Actions',
    defaultOpen: true,
    children: (
      <div className="space-y-2 p-4 border border-neutral-300 rounded">
        <p className="text-sm text-neutral-600">Choose an action to perform:</p>
        <div className="flex gap-2">
          <Button variant="primary" size="small">
            Save
          </Button>
          <Button variant="secondary" size="small">
            Cancel
          </Button>
          <Button variant="secondary" size="small">
            Reset
          </Button>
        </div>
      </div>
    ),
  },
}

export const CustomTrigger: Story = {
  args: {
    renderTrigger: (open) => (
      <button className="w-full text-left p-2 bg-accent-primary text-white rounded hover:opacity-90">
        {open ? '▼' : '▶'} Custom Trigger (Click me)
      </button>
    ),
    children: (
      <div className="p-4 bg-neutral-100 rounded mt-2">
        <p>Content with custom trigger</p>
      </div>
    ),
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="secondary" size="small" onClick={() => setOpen(!open)}>
            Toggle Externally
          </Button>
          <span className="text-sm text-neutral-600 flex items-center">
            Status: {open ? 'Open' : 'Closed'}
          </span>
        </div>
        <CollapsibleSection {...args} open={open} onToggle={setOpen} title="Controlled Section">
          <div className="p-4 bg-neutral-100 rounded">
            <p>This section is controlled by external state</p>
          </div>
        </CollapsibleSection>
      </div>
    )
  },
}

export const MultipleCollapsibles: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <CollapsibleSection title="Personal Information" defaultOpen>
        <div className="p-3 bg-neutral-100 rounded">
          <p className="text-sm">Name: John Doe</p>
          <p className="text-sm">Email: john@example.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Work Details" defaultOpen={false}>
        <div className="p-3 bg-neutral-100 rounded">
          <p className="text-sm">Department: Engineering</p>
          <p className="text-sm">Position: Senior Developer</p>
          <p className="text-sm">Manager: Jane Smith</p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Settings" defaultOpen>
        <div className="p-3 bg-neutral-100 rounded">
          <p className="text-sm">Theme: Dark</p>
          <p className="text-sm">Language: English</p>
          <p className="text-sm">Notifications: Enabled</p>
        </div>
      </CollapsibleSection>
    </div>
  ),
}

export const WithCustomStyles: Story = {
  args: {
    title: 'Styled Section',
    className: 'border-2 border-accent-primary rounded-lg p-2',
    contentClassName: 'bg-accent-highlight-subtle p-4 rounded',
    children: <p>Content with custom styling</p>,
  },
}
