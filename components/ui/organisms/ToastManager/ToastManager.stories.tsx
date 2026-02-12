import type { Meta, StoryObj } from '@storybook/react'
import { ToastManager } from './ToastManager'
import { Button } from '@/components/ui/atoms/Button'
import { useUIStore } from '@/stores/ui.store'

const meta: Meta<typeof ToastManager> = {
  title: 'Organisms/ToastManager',
  component: ToastManager,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const enqueueToast = useUIStore((s) => s.enqueueToast)

    return (
      <div className="p-8 space-y-4">
        <h2 className="text-2xl font-bold">Toast Manager Demo</h2>
        <p className="text-neutral-600">Click the buttons to show toasts:</p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() =>
              enqueueToast({
                id: 'success-toast',
                title: 'Success!',
                description: 'Changes saved successfully.',
                variant: 'success',
                duration: 3000,
              })
            }
          >
            Show Success Toast
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              enqueueToast({
                id: 'error-toast',
                title: 'Error!',
                description: 'Something went wrong.',
                variant: 'error',
                duration: 4000,
              })
            }
          >
            Show Error Toast
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              enqueueToast({
                id: 'info-toast',
                title: 'Info',
                description: 'Update available.',
                variant: 'info',
                duration: 5000,
              })
            }
          >
            Show Info Toast
          </Button>

          <Button
            variant="link"
            onClick={() =>
              enqueueToast({
                id: 'simple-toast',
                title: 'Simple toast',
                variant: 'success',
                duration: 2000,
              })
            }
          >
            Show Simple Toast
          </Button>
        </div>

        <ToastManager />
      </div>
    )
  },
}

export const QueueDemo: Story = {
  render: () => {
    const enqueueToast = useUIStore((s) => s.enqueueToast)

    const showMultipleToasts = () => {
      enqueueToast({
        id: 'queue-toast-1',
        title: 'Toast 1',
        description: 'First in queue',
        variant: 'info',
        duration: 2000,
      })
      enqueueToast({
        id: 'queue-toast-2',
        title: 'Toast 2',
        description: 'Second in queue',
        variant: 'error',
        duration: 2000,
      })
      enqueueToast({
        id: 'queue-toast-3',
        title: 'Toast 3',
        description: 'Third in queue',
        variant: 'success',
        duration: 2000,
      })
    }

    return (
      <div className="p-8 space-y-4">
        <h2 className="text-2xl font-bold">Toast Queue Demo</h2>
        <p className="text-neutral-600">
          Toasts are displayed one at a time. Click the button to queue 3 toasts:
        </p>

        <Button variant="primary" onClick={showMultipleToasts}>
          Show 3 Toasts in Queue
        </Button>

        <ToastManager />
      </div>
    )
  },
}
