import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MobileHeader } from './MobileHeader'

const meta: Meta<typeof MobileHeader> = {
  title: 'Organisms/MobileHeader',
  component: MobileHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onMenuClick: { action: 'menu clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menuOpen: false,
  },
}

export const MenuOpen: Story = {
  args: {
    menuOpen: true,
  },
}

export const Interactive: Story = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
      <div>
        <MobileHeader menuOpen={menuOpen} onMenuClick={() => setMenuOpen(!menuOpen)} />
        <div className="pt-20 p-4">
          <p className="text-sm text-neutral-600">
            Menu status: <strong>{menuOpen ? 'Open' : 'Closed'}</strong>
          </p>
          <p className="text-sm text-neutral-600 mt-2">Click the menu button to toggle</p>
        </div>
      </div>
    )
  },
}

export const WithContent: Story = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
      <div className="min-h-screen bg-neutral-100">
        <MobileHeader menuOpen={menuOpen} onMenuClick={() => setMenuOpen(!menuOpen)} />
        <main className="pt-20 p-4">
          <h1 className="text-2xl font-bold mb-4">Page Content</h1>
          <p className="text-neutral-600">
            This demonstrates how the mobile header appears at the top of the page. The header is
            fixed, so it stays visible when scrolling.
          </p>
          <div className="mt-4 space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="p-4 bg-white rounded shadow">
                Content block {i + 1}
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  },
}
