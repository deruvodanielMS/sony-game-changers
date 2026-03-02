import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'Visual variant of the tag',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the tag',
    },
    label: {
      control: 'text',
      description: 'The text label to display',
    },
    onRemove: {
      action: 'removed',
      description: 'Called when the × button is clicked. If omitted, no × is shown',
    },
    removeAriaLabel: {
      control: 'text',
      description: 'Accessible label for the remove button',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

/**
 * Default tag with outlined variant (white background, dark border)
 */
export const Default: Story = {
  args: {
    label: 'Tag Label',
  },
}

/**
 * Filled tag with dark/black pill background and white text
 */
export const Filled: Story = {
  args: {
    label: 'Tag Label',
    variant: 'filled',
  },
}

/**
 * Tag with a remove button — clicking × calls onRemove
 */
export const WithRemove: Story = {
  args: {
    label: 'Removable Tag',
    onRemove: () => {},
    removeAriaLabel: 'Remove tag',
  },
}

/**
 * All variants in both sizes, with and without remove button
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-body-small text-neutral-500 font-semibold">Outlined</p>
        <div className="flex flex-wrap items-center gap-2">
          <Tag label="Medium" variant="outlined" size="md" />
          <Tag label="Small" variant="outlined" size="sm" />
          <Tag
            label="With Remove"
            variant="outlined"
            size="md"
            onRemove={() => {}}
            removeAriaLabel="Remove tag"
          />
          <Tag
            label="With Remove"
            variant="outlined"
            size="sm"
            onRemove={() => {}}
            removeAriaLabel="Remove tag"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-body-small text-neutral-500 font-semibold">Filled</p>
        <div className="flex flex-wrap items-center gap-2">
          <Tag label="Medium" variant="filled" size="md" />
          <Tag label="Small" variant="filled" size="sm" />
          <Tag
            label="With Remove"
            variant="filled"
            size="md"
            onRemove={() => {}}
            removeAriaLabel="Remove tag"
          />
          <Tag
            label="With Remove"
            variant="filled"
            size="sm"
            onRemove={() => {}}
            removeAriaLabel="Remove tag"
          />
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive playground — use controls to explore all props
 */
export const Playground: Story = {
  args: {
    label: 'Playground Tag',
    variant: 'outlined',
    size: 'md',
    onRemove: () => {},
    removeAriaLabel: 'Remove tag',
  },
}
