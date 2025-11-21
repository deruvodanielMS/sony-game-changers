import type { Meta, StoryObj } from '@storybook/react'
import { Plus, Trash2, Edit, X, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'plain'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
      description: 'Size of the button',
    },
    mode: {
      control: { type: 'select' },
      options: ['default', 'danger'],
      description: 'Danger mode for destructive actions',
    },
    iconShape: {
      control: { type: 'select' },
      options: ['rounded', 'squared'],
      description: 'Shape of icon-only buttons',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Icon-only mode without text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Loading state with spinner',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default button with primary variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

/**
 * All text button variants in default size
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="plain">Plain</Button>
    </div>
  ),
}

/**
 * All variants in small size
 */
export const SmallVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" size="small">
        Primary
      </Button>
      <Button variant="secondary" size="small">
        Secondary
      </Button>
      <Button variant="tertiary" size="small">
        Tertiary
      </Button>
      <Button variant="plain" size="small">
        Plain
      </Button>
    </div>
  ),
}

/**
 * Danger mode variants (Primary, Tertiary, Plain only - no Secondary)
 */
export const DangerMode: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Size</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" mode="danger">
            Delete
          </Button>
          <Button variant="tertiary" mode="danger">
            Remove
          </Button>
          <Button variant="plain" mode="danger">
            Cancel
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Size</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" mode="danger" size="small">
            Delete
          </Button>
          <Button variant="tertiary" mode="danger" size="small">
            Remove
          </Button>
          <Button variant="plain" mode="danger" size="small">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Buttons with left and right icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Left Icon</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" leftIcon={<Plus size={20} />}>
            Add Item
          </Button>
          <Button variant="secondary" leftIcon={<Edit size={20} />}>
            Edit
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Right Icon</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="tertiary" rightIcon={<ArrowRight size={20} />}>
            Next
          </Button>
          <Button variant="plain" rightIcon={<Trash2 size={20} />}>
            Delete
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Both Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            leftIcon={<ArrowLeft size={20} />}
            rightIcon={<ArrowRight size={20} />}
          >
            Navigate
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Icon-only buttons with rounded shape
 */
export const IconOnlyRounded: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Size - All Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" iconOnly iconShape="rounded" aria-label="Add">
            <Plus size={24} />
          </Button>
          <Button variant="secondary" iconOnly iconShape="rounded" aria-label="Close">
            <X size={24} />
          </Button>
          <Button variant="tertiary" iconOnly iconShape="rounded" aria-label="Edit">
            <Edit size={24} />
          </Button>
          <Button variant="plain" iconOnly iconShape="rounded" aria-label="Delete">
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Size - All Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="small" iconOnly iconShape="rounded" aria-label="Add">
            <Plus size={24} />
          </Button>
          <Button variant="secondary" size="small" iconOnly iconShape="rounded" aria-label="Close">
            <X size={24} />
          </Button>
          <Button variant="tertiary" size="small" iconOnly iconShape="rounded" aria-label="Edit">
            <Edit size={24} />
          </Button>
          <Button variant="plain" size="small" iconOnly iconShape="rounded" aria-label="Delete">
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Danger Mode</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" mode="danger" iconOnly iconShape="rounded" aria-label="Delete">
            <Trash2 size={24} />
          </Button>
          <Button variant="tertiary" mode="danger" iconOnly iconShape="rounded" aria-label="Remove">
            <X size={24} />
          </Button>
          <Button variant="plain" mode="danger" iconOnly iconShape="rounded" aria-label="Cancel">
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Icon-only buttons with squared shape
 */
export const IconOnlySquared: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Size - All Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" iconOnly iconShape="squared" aria-label="Add">
            <Plus size={24} />
          </Button>
          <Button variant="secondary" iconOnly iconShape="squared" aria-label="Close">
            <X size={24} />
          </Button>
          <Button variant="tertiary" iconOnly iconShape="squared" aria-label="Edit">
            <Edit size={24} />
          </Button>
          <Button variant="plain" iconOnly iconShape="squared" aria-label="Delete">
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Size - All Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="small" iconOnly iconShape="squared" aria-label="Add">
            <Plus size={24} />
          </Button>
          <Button variant="secondary" size="small" iconOnly iconShape="squared" aria-label="Close">
            <X size={24} />
          </Button>
          <Button variant="tertiary" size="small" iconOnly iconShape="squared" aria-label="Edit">
            <Edit size={24} />
          </Button>
          <Button variant="plain" size="small" iconOnly iconShape="squared" aria-label="Delete">
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Button states: loading and disabled
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Loading State</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" isLoading>
            Loading...
          </Button>
          <Button variant="secondary" isLoading>
            Processing
          </Button>
          <Button variant="primary" iconOnly iconShape="rounded" isLoading aria-label="Loading">
            <Plus size={24} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Disabled State</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="tertiary" disabled>
            Disabled
          </Button>
          <Button variant="plain" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Button groups for responsive layouts
 */
export const ButtonGroups: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Desktop Action Left */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Desktop - Action Left</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Button</Button>
          <Button variant="secondary">Button</Button>
          <Button variant="tertiary">Button</Button>
        </div>
      </div>

      {/* Desktop Action Right */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Desktop - Action Right</h3>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="tertiary">Button</Button>
          <Button variant="secondary">Button</Button>
          <Button variant="primary">Button</Button>
        </div>
      </div>

      {/* Desktop Previous/Next */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Desktop - Previous/Next</h3>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="secondary" leftIcon={<ArrowLeft size={20} />}>
            Previous
          </Button>
          <div className="flex gap-2">
            <Button variant="plain" mode="danger">
              Cancel
            </Button>
            <Button variant="primary" rightIcon={<ArrowRight size={20} />}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Mobile - Responsive (resize window)</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="primary" className="sm:flex-1">
            Button
          </Button>
          <Button variant="secondary" className="sm:flex-1">
            Button
          </Button>
          <Button variant="tertiary" className="sm:flex-1">
            Button
          </Button>
        </div>
      </div>

      {/* Mobile Stacked */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Mobile - Stacked</h3>
        <div className="flex flex-col gap-2 max-w-sm">
          <Button variant="primary" className="w-full">
            Button
          </Button>
          <Button variant="secondary" className="w-full">
            Button
          </Button>
          <Button variant="tertiary" className="w-full">
            Button
          </Button>
        </div>
      </div>

      {/* Mobile with Previous/Next */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Mobile - Previous/Next</h3>
        <div className="flex flex-col gap-2 max-w-sm">
          <Button variant="secondary" leftIcon={<ArrowLeft size={20} />} className="w-full">
            Previous
          </Button>
          <div className="flex flex-col gap-2">
            <Button variant="plain" mode="danger" className="w-full">
              Cancel
            </Button>
            <Button variant="primary" rightIcon={<ArrowRight size={20} />} className="w-full">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive playground for testing
 */
export const Playground: Story = {
  args: {
    children: 'Button Text',
    variant: 'primary',
    size: 'default',
    mode: 'default',
    disabled: false,
    isLoading: false,
  },
}

/**
 * Using asChild prop to render button styles on other elements
 */
export const AsChild: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">As Anchor Tag (External Link)</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" asChild>
            <a href="https://www.sony.com" target="_blank" rel="noopener noreferrer">
              Visit Sony
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="https://www.playstation.com" target="_blank" rel="noopener noreferrer">
              PlayStation
            </a>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Icon-only as Link</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" iconOnly iconShape="rounded" asChild aria-label="Home">
            <a href="#home">
              <ArrowRight size={24} />
            </a>
          </Button>
          <Button variant="secondary" iconOnly iconShape="squared" asChild aria-label="Back">
            <a href="#back">
              <ArrowLeft size={24} />
            </a>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Note</h3>
        <p className="text-sm text-neutral-600">
          When using <code className="bg-neutral-100 px-1 rounded">asChild</code>, the Button
          component applies its styles to the child element (like{' '}
          <code className="bg-neutral-100 px-1 rounded">&lt;a&gt;</code> or Next.js{' '}
          <code className="bg-neutral-100 px-1 rounded">&lt;Link&gt;</code>). The child element will
          receive all button styles and behavior.
        </p>
      </div>
    </div>
  ),
}
