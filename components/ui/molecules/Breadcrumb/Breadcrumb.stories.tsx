import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Two-level breadcrumb navigation
 */
export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Ambitions', href: '/game-changers/ambitions' }, { label: 'Ambition detail' }],
  },
}

/**
 * Three-level breadcrumb navigation
 */
export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Product Details' },
    ],
  },
}

/**
 * Single item (no navigation)
 */
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current Page' }],
  },
}

/**
 * Four-level deep navigation
 */
export const FourLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Reports', href: '/dashboard/reports' },
      { label: 'Sales', href: '/dashboard/reports/sales' },
      { label: 'Q4 2025' },
    ],
  },
}

/**
 * Long breadcrumb with many levels
 */
export const ManyLevels: Story = {
  args: {
    items: [
      { label: 'Level 1', href: '/1' },
      { label: 'Level 2', href: '/1/2' },
      { label: 'Level 3', href: '/1/2/3' },
      { label: 'Level 4', href: '/1/2/3/4' },
      { label: 'Level 5', href: '/1/2/3/4/5' },
      { label: 'Current Level' },
    ],
  },
}

/**
 * Visual showcase in different contexts
 */
export const AllVariants: Story = {
  args: {
    items: [{ label: 'Example' }],
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold mb-1">Two Levels</h3>
        <Breadcrumb
          items={[
            { label: 'Ambitions', href: '/game-changers/ambitions' },
            { label: 'Ambition detail' },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-1">Three Levels</h3>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Product Details' },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-1">Four Levels</h3>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Reports', href: '/dashboard/reports' },
            { label: 'Sales', href: '/dashboard/reports/sales' },
            { label: 'Q4 2025' },
          ]}
        />
      </div>
    </div>
  ),
}
