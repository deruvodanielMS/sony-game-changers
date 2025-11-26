import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'
import { FormControl } from '@/components/ui/molecules/FormControl/FormControl'
import { HELPER_TYPE } from '@/components/ui/molecules/FormControl/FormControl.types'

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
      description: 'Size of the textarea',
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Read-only state',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of visible text lines',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default textarea with placeholder
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

/**
 * All available variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default</h3>
        <TextArea placeholder="Default variant" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Error</h3>
        <TextArea variant="error" placeholder="Error variant" />
      </div>
    </div>
  ),
}

/**
 * All available sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default Size (96px min-height)</h3>
        <TextArea placeholder="Default size textarea" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Size (64px min-height)</h3>
        <TextArea size="small" placeholder="Small size textarea" />
      </div>
    </div>
  ),
}

/**
 * All possible states
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Default</h3>
        <TextArea placeholder="Normal state" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Hover (hover over it)</h3>
        <TextArea placeholder="Hover to see effect" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Focus (click inside)</h3>
        <TextArea placeholder="Focus to see ring effect" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Disabled</h3>
        <TextArea disabled placeholder="Disabled textarea" defaultValue="Cannot edit this" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Read-only</h3>
        <TextArea readOnly defaultValue="This is read-only content that cannot be modified" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Error State</h3>
        <TextArea
          variant="error"
          placeholder="Error state"
          defaultValue="This field has an error"
        />
      </div>
    </div>
  ),
}

/**
 * Different resize options
 */
export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Vertical (default)</h3>
        <TextArea resize="vertical" placeholder="Can resize vertically only" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">None</h3>
        <TextArea resize="none" placeholder="Cannot resize" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Horizontal</h3>
        <TextArea resize="horizontal" placeholder="Can resize horizontally only" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Both</h3>
        <TextArea resize="both" placeholder="Can resize in both directions" />
      </div>
    </div>
  ),
}

/**
 * TextArea with FormControl integration
 */
export const WithFormControl: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-4">Basic with Label</h3>
        <FormControl label="Comments">
          <TextArea placeholder="Enter your comments" />
        </FormControl>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Mandatory Field</h3>
        <FormControl label="Feedback" mandatory>
          <TextArea placeholder="Your feedback is required" />
        </FormControl>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">With Helper Before</h3>
        <FormControl
          label="Description"
          helperBefore={[{ type: HELPER_TYPE.INFO, message: 'Maximum 500 characters allowed' }]}
        >
          <TextArea placeholder="Enter description" maxLength={500} />
        </FormControl>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">With Error</h3>
        <FormControl
          label="Message"
          mandatory
          helperAfter={[{ type: HELPER_TYPE.ERROR, message: 'This field is required' }]}
        >
          <TextArea variant="error" placeholder="Enter message" />
        </FormControl>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">With Success</h3>
        <FormControl
          label="Review"
          helperAfter={[{ type: HELPER_TYPE.SUCCESS, message: 'Your review has been saved' }]}
        >
          <TextArea
            placeholder="Write your review"
            defaultValue="Great product! Highly recommended."
          />
        </FormControl>
      </div>
    </div>
  ),
}

/**
 * TextArea with long text content
 */
export const LongText: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">With Long Content</h3>
        <TextArea
          defaultValue={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">With Custom Rows</h3>
        <TextArea rows={10} placeholder="Textarea with 10 rows" />
      </div>
    </div>
  ),
}

/**
 * TextArea with character limit
 */
export const WithCharacterLimit: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Max Length 100</h3>
        <FormControl
          label="Short Comment"
          helperAfter={[{ type: HELPER_TYPE.INFO, message: 'Maximum 100 characters' }]}
        >
          <TextArea maxLength={100} placeholder="Type here (max 100 chars)" />
        </FormControl>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Max Length 500</h3>
        <FormControl
          label="Extended Feedback"
          helperAfter={[{ type: HELPER_TYPE.INFO, message: 'Maximum 500 characters' }]}
        >
          <TextArea maxLength={500} rows={6} placeholder="Type here (max 500 chars)" />
        </FormControl>
      </div>
    </div>
  ),
}

/**
 * Small size variants
 */
export const SmallSizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Default</h3>
        <TextArea size="small" placeholder="Small default textarea" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Error</h3>
        <TextArea size="small" variant="error" placeholder="Small error textarea" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Disabled</h3>
        <TextArea size="small" disabled placeholder="Small disabled textarea" />
      </div>
    </div>
  ),
}

/**
 * Playground for interactive testing
 */
export const Playground: Story = {
  args: {
    placeholder: 'Type your message here...',
    variant: 'default',
    size: 'default',
    resize: 'vertical',
    disabled: false,
    readOnly: false,
    rows: 4,
  },
}

/**
 * Custom className override example
 */
export const CustomClassName: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Custom Width</h3>
        <TextArea placeholder="Custom width 400px" className="max-w-[400px]" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Custom Background</h3>
        <TextArea placeholder="Custom background" className="bg-blue-50" />
      </div>
    </div>
  ),
}
