import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
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

const DrawerExample = ({
  position = 'right',
  size = 'md',
}: {
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        position={position}
        size={size}
        title="Drawer Title"
        actions={
          <>
            <Button variant="secondary" size="default" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="default">Save</Button>
          </>
        }
      >
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
      </Drawer>
    </div>
  )
}

export const Default: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample />,
}

export const LeftPosition: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample position="left" />,
}

export const TopPosition: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample position="top" />,
}

export const BottomPosition: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample position="bottom" />,
}

export const SmallSize: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample size="sm" />,
}

export const LargeSize: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample size="lg" />,
}

export const FullSize: Story = {
  args: { open: false, onClose: () => {} },
  render: () => <DrawerExample size="full" />,
}

export const WithScrollableContent: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Drawer with Long Content</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Scrollable Content"
          actions={
            <Button variant="secondary" size="default" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i} className="mb-2">
              Line {i + 1}: This is a long line of content to demonstrate scrolling.
            </p>
          ))}
        </Drawer>
      </div>
    )
  },
}

export const WithoutActions: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="No Actions">
          <p>This drawer has no action buttons in footer.</p>
        </Drawer>
      </div>
    )
  },
}

export const MobileSheet: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Mobile Sheet (Bottom)</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          position="bottom"
          title="Mobile Sheet"
          hideCloseOnMobile={true}
          actions={
            <>
              <Button variant="secondary" size="default" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="default">Confirm</Button>
            </>
          }
        >
          <p className="mb-2">This drawer works as a mobile sheet.</p>
          <p className="mb-2">On mobile, you can swipe down to close or click outside.</p>
          <p>Notice the handle at the top and no close button on mobile devices.</p>
        </Drawer>
      </div>
    )
  },
}

export const AllPositions: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [openLeft, setOpenLeft] = useState(false)
    const [openRight, setOpenRight] = useState(false)
    const [openTop, setOpenTop] = useState(false)
    const [openBottom, setOpenBottom] = useState(false)

    return (
      <div className="p-4 flex flex-col gap-2">
        <Button onClick={() => setOpenLeft(true)}>Open Left</Button>
        <Button onClick={() => setOpenRight(true)}>Open Right</Button>
        <Button onClick={() => setOpenTop(true)}>Open Top</Button>
        <Button onClick={() => setOpenBottom(true)}>Open Bottom</Button>

        <Drawer
          open={openLeft}
          onClose={() => setOpenLeft(false)}
          position="left"
          title="Left Drawer"
        >
          Content from the left
        </Drawer>

        <Drawer
          open={openRight}
          onClose={() => setOpenRight(false)}
          position="right"
          title="Right Drawer"
        >
          Content from the right
        </Drawer>

        <Drawer open={openTop} onClose={() => setOpenTop(false)} position="top" title="Top Drawer">
          Content from the top
        </Drawer>

        <Drawer
          open={openBottom}
          onClose={() => setOpenBottom(false)}
          position="bottom"
          title="Bottom Drawer"
        >
          Content from the bottom
        </Drawer>
      </div>
    )
  },
}

export const AllSizes: Story = {
  args: { open: false, onClose: () => {} },
  render: () => {
    const [openSm, setOpenSm] = useState(false)
    const [openMd, setOpenMd] = useState(false)
    const [openLg, setOpenLg] = useState(false)
    const [openFull, setOpenFull] = useState(false)

    return (
      <div className="p-4 flex flex-col gap-2">
        <Button onClick={() => setOpenSm(true)}>Small (256px)</Button>
        <Button onClick={() => setOpenMd(true)}>Medium (280px)</Button>
        <Button onClick={() => setOpenLg(true)}>Large (384px)</Button>
        <Button onClick={() => setOpenFull(true)}>Full</Button>

        <Drawer open={openSm} onClose={() => setOpenSm(false)} size="sm" title="Small Drawer">
          256px wide
        </Drawer>

        <Drawer open={openMd} onClose={() => setOpenMd(false)} size="md" title="Medium Drawer">
          280px wide (default sidebar width)
        </Drawer>

        <Drawer open={openLg} onClose={() => setOpenLg(false)} size="lg" title="Large Drawer">
          384px wide
        </Drawer>

        <Drawer open={openFull} onClose={() => setOpenFull(false)} size="full" title="Full Drawer">
          Full width/height
        </Drawer>
      </div>
    )
  },
}
