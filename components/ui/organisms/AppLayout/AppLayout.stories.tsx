import type { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from './AppLayout'

const meta: Meta<typeof AppLayout> = {
  title: 'Organisms/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock components for demonstration
const MockHeader = () => (
  <div className="h-16 px-6 flex items-center justify-between bg-neutral-0">
    <div className="text-xl font-bold">Game Changers</div>
    <div className="flex items-center gap-4">
      <div className="text-sm">User Profile</div>
    </div>
  </div>
)

const MockSidebar = () => (
  <div className="p-4 space-y-2">
    <div className="text-sm font-semibold mb-4">Navigation</div>
    <div className="p-2 rounded bg-neutral-100 cursor-pointer hover:bg-neutral-200">Home</div>
    <div className="p-2 rounded cursor-pointer hover:bg-neutral-100">Game Changers</div>
    <div className="p-2 rounded cursor-pointer hover:bg-neutral-100">My Team</div>
    <div className="p-2 rounded cursor-pointer hover:bg-neutral-100">Settings</div>
  </div>
)

const MockContent = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Page Content</h1>
    <p className="text-neutral-600 mb-4">
      This is the main content area. It adjusts its width based on whether the sidebar is present.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 border border-neutral-200 rounded-lg">
          <div className="font-semibold mb-2">Card {i + 1}</div>
          <div className="text-sm text-neutral-600">Sample content for card {i + 1}</div>
        </div>
      ))}
    </div>
  </div>
)

const MockFooter = () => (
  <div className="h-16 px-6 flex items-center justify-center text-sm text-neutral-600">
    © 2025 Game Changers. All rights reserved.
  </div>
)

/**
 * Default layout with all slots
 */
export const Default: Story = {
  args: {
    header: <MockHeader />,
    sidebar: <MockSidebar />,
    children: <MockContent />,
  },
}

/**
 * Layout without sidebar - content takes full width
 */
export const WithoutSidebar: Story = {
  args: {
    header: <MockHeader />,
    children: <MockContent />,
  },
}

/**
 * Layout without header
 */
export const WithoutHeader: Story = {
  args: {
    sidebar: <MockSidebar />,
    children: <MockContent />,
  },
}

/**
 * Full layout with footer
 */
export const WithFooter: Story = {
  args: {
    header: <MockHeader />,
    sidebar: <MockSidebar />,
    children: <MockContent />,
    footer: <MockFooter />,
  },
}

/**
 * Minimal layout - only content
 */
export const ContentOnly: Story = {
  args: {
    children: <MockContent />,
  },
}

/**
 * Layout with long content to demonstrate scrolling
 */
export const WithScrollableContent: Story = {
  args: {
    header: <MockHeader />,
    sidebar: <MockSidebar />,
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Scrollable Content</h1>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="mb-4 p-4 border border-neutral-200 rounded-lg">
            <div className="font-semibold mb-2">Section {i + 1}</div>
            <p className="text-neutral-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    ),
  },
}
