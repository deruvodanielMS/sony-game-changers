import type { Meta, StoryObj } from '@storybook/react'
import { AppLayout } from './AppLayoutClient'

const meta = {
  title: 'Layouts/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Desktop layout with sidebar
 * Shows the full app layout with sidebar and main content area
 */
export const Desktop: Story = {
  args: {
    children: (
      <div className="p-6">
        <h1 className="text-h3 leading-h3 font-bold text-neutral-1000 mb-4">Desktop Layout</h1>
        <p className="text-body leading-body text-neutral-600 mb-4">
          This is the main application layout. The sidebar can be collapsed by clicking the "Close
          Menu" button.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 border border-neutral-200 rounded-default bg-neutral-0">
              <h3 className="text-body-small leading-body-small font-semibold mb-2">
                Card {i + 1}
              </h3>
              <p className="text-body-tiny leading-body-tiny text-neutral-600">
                Sample content for demonstration
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
}

/**
 * Mobile layout with drawer
 * Click the hamburger menu to open the navigation drawer from the right
 */
export const Mobile: Story = {
  args: {
    children: (
      <div className="p-4">
        <h1 className="text-h5 leading-h5 font-bold text-neutral-1000 mb-4">Mobile Layout</h1>
        <p className="text-body-small leading-body-small text-neutral-600 mb-4">
          Click the hamburger menu button in the header to open the navigation drawer.
        </p>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border border-neutral-200 rounded-default bg-neutral-0">
              <h3 className="text-body-small leading-body-small font-semibold mb-2">
                Card {i + 1}
              </h3>
              <p className="text-body-tiny leading-body-tiny text-neutral-600">
                Mobile optimized content
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

/**
 * Tablet layout
 * Responsive behavior between mobile and desktop
 */
export const Tablet: Story = {
  args: {
    children: (
      <div className="p-6">
        <h1 className="text-h4 leading-h4 font-bold text-neutral-1000 mb-4">Tablet Layout</h1>
        <p className="text-body leading-body text-neutral-600 mb-4">
          The layout adapts to tablet screens with a collapsible sidebar.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 border border-neutral-200 rounded-default bg-neutral-0">
              <h3 className="text-body-small leading-body-small font-semibold mb-2">
                Card {i + 1}
              </h3>
              <p className="text-body-tiny leading-body-tiny text-neutral-600">
                Tablet optimized layout
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}
