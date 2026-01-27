import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './index'
import { Button } from '../Button'

const meta = {
  title: 'Atoms/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log('Drawer closed'),
    title: 'Drawer Title',
    children: (
      <>
        <p className="mb-2">This is drawer content.</p>
        <p className="mb-2">You can place any content here.</p>
        <p className="mb-3">Click outside or press Escape to close.</p>
        <div className="flex gap-2">
          <div className="p-3 bg-neutral-100 rounded-default flex-1">
            <p className="text-body-small">Sample card content</p>
          </div>
          <div className="p-3 bg-neutral-100 rounded-default flex-1">
            <p className="text-body-small">Sample card content</p>
          </div>
        </div>
      </>
    ),
    actions: (
      <>
        <Button variant="secondary" size="default">
          Cancel
        </Button>
        <Button size="default">Save</Button>
      </>
    ),
  },
}

export const LeftPosition: Story = {
  args: {
    open: true,
    position: 'left',
    onClose: () => console.log('Drawer closed'),
    title: 'Left Drawer',
    children: <p>This drawer opens from the left side.</p>,
  },
}

export const TopPosition: Story = {
  args: {
    open: true,
    position: 'top',
    onClose: () => console.log('Drawer closed'),
    title: 'Top Drawer',
    children: <p>This drawer opens from the top.</p>,
  },
}

export const BottomPosition: Story = {
  args: {
    open: true,
    position: 'bottom',
    onClose: () => console.log('Drawer closed'),
    title: 'Bottom Drawer',
    children: <p>This drawer opens from the bottom.</p>,
  },
}

export const SmallSize: Story = {
  args: {
    open: true,
    size: 'sm',
    onClose: () => console.log('Drawer closed'),
    title: 'Small Drawer',
    children: <p>This is a small drawer.</p>,
  },
}

export const LargeSize: Story = {
  args: {
    open: true,
    size: 'lg',
    onClose: () => console.log('Drawer closed'),
    title: 'Large Drawer',
    children: <p>This is a large drawer.</p>,
  },
}

export const FullSize: Story = {
  args: {
    open: true,
    size: 'full',
    onClose: () => console.log('Drawer closed'),
    title: 'Full Size Drawer',
    children: <p>This drawer takes the full width/height.</p>,
  },
}

export const WithScrollableContent: Story = {
  args: {
    open: true,
    onClose: () => console.log('Drawer closed'),
    title: 'Scrollable Content',
    children: (
      <>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i} className="mb-2">
            Line {i + 1}: This is a long line of content to demonstrate scrolling.
          </p>
        ))}
      </>
    ),
    actions: (
      <Button variant="secondary" size="default">
        Close
      </Button>
    ),
  },
}

export const WithoutActions: Story = {
  args: {
    open: true,
    onClose: () => console.log('Drawer closed'),
    title: 'No Actions',
    children: <p>This drawer has no action buttons.</p>,
  },
}
