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
      options: ['primary', 'secondary', 'link'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'small'],
      description: 'Size of the button',
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
 * Default button with primary variant and gradient background
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

/**
 * All text button variants in large size
 * - Primary: Gradient background (info-500 → purple-500)
 * - Secondary: White background with gradient border and text
 * - Link: Transparent background with gradient text only
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

/**
 * All variants in small size
 */
export const SmallVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary" size="small">
        Primary
      </Button>
      <Button variant="secondary" size="small">
        Secondary
      </Button>
      <Button variant="link" size="small">
        Link
      </Button>
    </div>
  ),
}

/**
 * Buttons with left and right icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Left Icon</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" leftIcon={<Plus size={20} />}>
            Add Item
          </Button>
          <Button variant="secondary" leftIcon={<Edit size={20} />}>
            Edit
          </Button>
          <Button variant="link" leftIcon={<ArrowLeft size={20} />}>
            Back
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Right Icon</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" rightIcon={<ArrowRight size={20} />}>
            Next
          </Button>
          <Button variant="secondary" rightIcon={<Trash2 size={20} />}>
            Delete
          </Button>
          <Button variant="link" rightIcon={<ArrowRight size={20} />}>
            Continue
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Both Icons</h3>
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
 * Icon-only buttons (circular shape)
 */
export const IconOnly: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Large Size - All Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" iconOnly aria-label="Add">
            <Plus size={24} />
          </Button>
          <Button variant="secondary" iconOnly aria-label="Close">
            <X size={24} />
          </Button>
          <Button variant="link" iconOnly aria-label="Edit">
            <Edit size={24} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Small Size - All Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="small" iconOnly aria-label="Add">
            <Plus size={18} />
          </Button>
          <Button variant="secondary" size="small" iconOnly aria-label="Close">
            <X size={18} />
          </Button>
          <Button variant="link" size="small" iconOnly aria-label="Edit">
            <Edit size={18} />
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
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Loading State</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" isLoading>
            Loading...
          </Button>
          <Button variant="secondary" isLoading>
            Processing
          </Button>
          <Button variant="link" isLoading>
            Saving...
          </Button>
          <Button variant="primary" iconOnly isLoading aria-label="Loading">
            <Plus size={24} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Disabled State</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="link" disabled>
            Disabled
          </Button>
          <Button variant="primary" iconOnly disabled aria-label="Disabled">
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Hover states preview
 * Hover over buttons to see gradient transition from 500 to 950
 */
export const HoverStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">
          Primary: Gradient 500 → Gradient 950 on hover
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Hover Me</Button>
          <Button variant="primary" size="small">
            Hover Me
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">
          Secondary: Purple background + darker gradient on hover
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">Hover Me</Button>
          <Button variant="secondary" size="small">
            Hover Me
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">
          Link: Purple background on hover
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="link">Hover Me</Button>
          <Button variant="link" size="small">
            Hover Me
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Button groups (combinations)
 */
export const ButtonGroups: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Action Group (Left aligned)</h3>
        <div className="flex gap-2">
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="link">Reset</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">
          Action Group (Right aligned)
        </h3>
        <div className="flex gap-2 justify-end">
          <Button variant="link">Skip</Button>
          <Button variant="secondary">Back</Button>
          <Button variant="primary">Continue</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Small Size Group</h3>
        <div className="flex gap-2">
          <Button variant="primary" size="small">
            Apply
          </Button>
          <Button variant="secondary" size="small">
            Cancel
          </Button>
          <Button variant="link" size="small">
            Clear
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Real-world usage examples
 */
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Form Actions</h3>
        <div className="flex gap-3 justify-end">
          <Button variant="link">Cancel</Button>
          <Button variant="primary" rightIcon={<ArrowRight size={20} />}>
            Submit
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Toolbar Actions</h3>
        <div className="flex gap-2">
          <Button variant="primary" iconOnly aria-label="Add new item">
            <Plus size={20} />
          </Button>
          <Button variant="secondary" iconOnly aria-label="Edit">
            <Edit size={20} />
          </Button>
          <Button variant="secondary" iconOnly aria-label="Delete">
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Navigation</h3>
        <div className="flex gap-3">
          <Button variant="secondary" leftIcon={<ArrowLeft size={20} />}>
            Previous
          </Button>
          <Button variant="primary" rightIcon={<ArrowRight size={20} />}>
            Next
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-neutral-600">Loading State in Form</h3>
        <div className="flex gap-3 justify-end">
          <Button variant="link" disabled>
            Cancel
          </Button>
          <Button variant="primary" isLoading>
            Saving...
          </Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Button States Showcase (Normal, Hover, Disabled)
 * Displays all variants and sizes with their three states:
 * normal (default), hover (visual representation), and disabled
 */
export const StateShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      {/* PRIMARY VARIANT */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">Primary Variant</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-2">Large</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="primary">Normal</Button>
                <span className="text-xs text-neutral-400">Normal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="px-0_75 py-1 rounded-full bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 text-neutral-0 text-body leading-body font-semibold cursor-default">
                  Hover
                </div>
                <span className="text-xs text-neutral-400">Hover</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <span className="text-xs text-neutral-400">Disabled</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-2">Small</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="primary" size="small">
                  Normal
                </Button>
                <span className="text-xs text-neutral-400">Normal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="px-0_5 py-0_75 rounded-full bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 text-neutral-0 text-body-small leading-body-small font-semibold cursor-default">
                  Hover
                </div>
                <span className="text-xs text-neutral-400">Hover</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="primary" size="small" disabled>
                  Disabled
                </Button>
                <span className="text-xs text-neutral-400">Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY VARIANT (The middle button) */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">
          Secondary Variant (Middle Button)
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-2">Large</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="secondary">Normal</Button>
                <span className="text-xs text-neutral-400">Normal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="px-0_75 py-1 rounded-full bg-neutral-0 border-2 border-feedback-info-950 bg-clip-text text-transparent bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 font-semibold cursor-default">
                  Hover
                </div>
                <span className="text-xs text-neutral-400">Hover</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
                <span className="text-xs text-neutral-400">Disabled</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-2">Small</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="secondary" size="small">
                  Normal
                </Button>
                <span className="text-xs text-neutral-400">Normal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="px-0_5 py-0_75 rounded-full bg-neutral-0 border-2 border-feedback-info-950 bg-clip-text text-transparent bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 font-semibold cursor-default">
                  Hover
                </div>
                <span className="text-xs text-neutral-400">Hover</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="secondary" size="small" disabled>
                  Disabled
                </Button>
                <span className="text-xs text-neutral-400">Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LINK VARIANT */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">Link Variant</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-2">Large</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="link">Normal</Button>
                <span className="text-xs text-neutral-400">Normal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="px-0_75 py-1 rounded-full bg-transparent bg-clip-text text-transparent bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 font-semibold cursor-default">
                  Hover
                </div>
                <span className="text-xs text-neutral-400">Hover</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="link" disabled>
                  Disabled
                </Button>
                <span className="text-xs text-neutral-400">Disabled</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-2">Small</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="link" size="small">
                  Normal
                </Button>
                <span className="text-xs text-neutral-400">Normal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="px-0_5 py-0_75 rounded-full bg-transparent bg-clip-text text-transparent bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 font-semibold cursor-default">
                  Hover
                </div>
                <span className="text-xs text-neutral-400">Hover</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="link" size="small" disabled>
                  Disabled
                </Button>
                <span className="text-xs text-neutral-400">Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Icon-only buttons with all states (normal, hover, disabled)
 * Shows Primary, Secondary, and Link variants in both sizes
 */
export const IconOnlyStates: Story = {
  render: () => (
    <div className="space-y-8">
      {/* PRIMARY VARIANT - LARGE */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">Primary Icon-Only - Large</h3>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <Button variant="primary" iconOnly aria-label="Normal">
              <ArrowRight size={24} />
            </Button>
            <span className="text-xs text-neutral-400">Normal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-0_75 rounded-full bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 text-neutral-0 aspect-square flex items-center justify-center">
              <ArrowRight size={24} />
            </div>
            <span className="text-xs text-neutral-400">Hover</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button variant="primary" iconOnly disabled aria-label="Disabled">
              <ArrowRight size={24} />
            </Button>
            <span className="text-xs text-neutral-400">Disabled</span>
          </div>
        </div>
      </div>

      {/* PRIMARY VARIANT - SMALL */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">Primary Icon-Only - Small</h3>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <Button variant="primary" size="small" iconOnly aria-label="Normal">
              <ArrowRight size={18} />
            </Button>
            <span className="text-xs text-neutral-400">Normal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-0_25 rounded-full bg-gradient-to-r from-feedback-info-950 to-extra-purple-950 text-neutral-0 aspect-square flex items-center justify-center">
              <ArrowRight size={18} />
            </div>
            <span className="text-xs text-neutral-400">Hover</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button variant="primary" size="small" iconOnly disabled aria-label="Disabled">
              <ArrowRight size={18} />
            </Button>
            <span className="text-xs text-neutral-400">Disabled</span>
          </div>
        </div>
      </div>

      {/* SECONDARY VARIANT - LARGE */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">Secondary Icon-Only - Large</h3>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <Button variant="secondary" iconOnly aria-label="Normal">
              <ArrowRight size={24} />
            </Button>
            <span className="text-xs text-neutral-400">Normal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-0_75 rounded-full bg-extra-purple-100 border-2 border-feedback-info-950 aspect-square flex items-center justify-center">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-feedback-info-950 to-extra-purple-950">
                <ArrowRight size={24} />
              </div>
            </div>
            <span className="text-xs text-neutral-400">Hover</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button variant="secondary" iconOnly disabled aria-label="Disabled">
              <ArrowRight size={24} />
            </Button>
            <span className="text-xs text-neutral-400">Disabled</span>
          </div>
        </div>
      </div>

      {/* SECONDARY VARIANT - SMALL */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-600">Secondary Icon-Only - Small</h3>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <Button variant="secondary" size="small" iconOnly aria-label="Normal">
              <ArrowRight size={18} />
            </Button>
            <span className="text-xs text-neutral-400">Normal</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="p-0_25 rounded-full bg-extra-purple-100 border-2 border-feedback-info-950 aspect-square flex items-center justify-center">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-feedback-info-950 to-extra-purple-950">
                <ArrowRight size={18} />
              </div>
            </div>
            <span className="text-xs text-neutral-400">Hover</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button variant="secondary" size="small" iconOnly disabled aria-label="Disabled">
              <ArrowRight size={18} />
            </Button>
            <span className="text-xs text-neutral-400">Disabled</span>
          </div>
        </div>
      </div>
    </div>
  ),
}
