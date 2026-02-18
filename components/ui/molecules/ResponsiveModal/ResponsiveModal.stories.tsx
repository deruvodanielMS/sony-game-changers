import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ResponsiveModal } from './ResponsiveModal'
import { Button } from '@/components/ui/atoms/Button'
import { TextArea } from '@/components/ui/atoms/TextArea'

const meta: Meta<typeof ResponsiveModal> = {
  title: 'Molecules/ResponsiveModal',
  component: ResponsiveModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A unified modal component that renders as Modal on desktop and Drawer on mobile. Resize the viewport to see the different behaviors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls visibility of the modal/drawer',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the header',
    },
    desktopSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size for desktop modal',
    },
    mobileSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Size for mobile drawer',
    },
    overlayClose: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the modal/drawer',
    },
  },
}

export default meta
type Story = StoryObj<typeof ResponsiveModal>

// Interactive wrapper for stories
function ResponsiveModalDemo(props: Partial<React.ComponentProps<typeof ResponsiveModal>>) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <ResponsiveModal open={open} onClose={() => setOpen(false)} title="Example Modal" {...props}>
        <p className="text-body text-neutral-1000">
          This modal automatically adapts to the screen size. On desktop, it appears as a centered
          modal. On mobile, it appears as a bottom drawer.
        </p>
      </ResponsiveModal>
    </>
  )
}

export const Default: Story = {
  render: () => <ResponsiveModalDemo />,
}

export const WithActions: Story = {
  render: () => (
    <ResponsiveModalDemo
      actions={
        <>
          <Button variant="link">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>
      }
    />
  ),
}

export const ConfirmationDialog: Story = {
  render: function ConfirmationDialogStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <ResponsiveModal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Deletion"
          desktopSize="sm"
          actions={
            <>
              <Button variant="link" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p className="text-body text-neutral-1000">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </ResponsiveModal>
      </>
    )
  },
}

export const WithForm: Story = {
  render: function FormModalStory() {
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('')

    return (
      <>
        <Button onClick={() => setOpen(true)}>Add Comment</Button>
        <ResponsiveModal
          open={open}
          onClose={() => setOpen(false)}
          title="Add Comment"
          actions={
            <>
              <Button variant="link" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-1">
            <p className="text-body text-neutral-1000">
              Please provide your feedback or comments below.
            </p>
            <TextArea
              placeholder="Enter your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <span className="text-body-small text-neutral-500">
              {comment.length}/500 characters
            </span>
          </div>
        </ResponsiveModal>
      </>
    )
  },
}

export const LargeContent: Story = {
  render: function LargeContentStory() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
        <ResponsiveModal
          open={open}
          onClose={() => setOpen(false)}
          title="Terms and Conditions"
          desktopSize="lg"
          mobileSize="lg"
          actions={
            <>
              <Button variant="link" onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-1 text-body text-neutral-1000">
            {Array.from({ length: 10 }, (_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </ResponsiveModal>
      </>
    )
  },
}
