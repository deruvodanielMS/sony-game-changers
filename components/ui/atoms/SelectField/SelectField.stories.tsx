import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { SelectField } from './SelectField'
import type { SelectFieldProps } from './SelectField.types'

const meta: Meta<SelectFieldProps> = {
  title: 'Atoms/SelectField',
  component: SelectField,
  args: {
    disabled: false,
    placeholder: 'Select an option',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    options: {
      control: false,
    },
    icon: {
      control: false,
    },
    contentClassName: {
      control: false,
    },
    className: {
      control: 'text',
    },
    value: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
    onValueChange: {
      action: 'onValueChange',
    },
  },
}

export default meta

type Story = StoryObj<SelectFieldProps>

const simpleOptions = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

// 1. Default select with simple options
export const Default: Story = {
  args: {
    options: simpleOptions,
  },
}

// 2. Controlled mode (value prop)
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string | undefined>('option-2')

    return (
      <div className="max-w-xs">
        <SelectField {...args} options={simpleOptions} value={value} onValueChange={setValue} />
        <p className="mt-2 text-sm text-gray-600">
          Selected value: <span className="font-mono">{value ?? 'none'}</span>
        </p>
      </div>
    )
  },
  args: {
    placeholder: 'Controlled select',
  },
}

// 3. Uncontrolled mode (defaultValue)
export const Uncontrolled: Story = {
  args: {
    options: simpleOptions,
    defaultValue: 'option-1',
    placeholder: 'Uncontrolled select',
  },
}

// 4. Placeholder story
export const WithPlaceholder: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Choose an option…',
    defaultValue: undefined,
  },
}

// 5. Disabled state
export const Disabled: Story = {
  args: {
    options: simpleOptions,
    disabled: true,
    placeholder: 'Disabled select',
  },
}

// 6. Many items (scrollable list)
const manyOptions = Array.from({ length: 30 }).map((_, index) => ({
  label: `Item ${index + 1}`,
  value: `item-${index + 1}`,
}))

export const ManyItemsScrollable: Story = {
  args: {
    options: manyOptions,
    placeholder: 'Scroll to see more…',
  },
}

// 7. Custom className override
export const CustomClassName: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'With custom classes',
    className: 'border-green-500 focus-visible:ring-green-500',
    contentClassName: 'border-green-200',
  },
}

// 8. Custom options (children usage story)
export const CustomChildren: Story = {
  render: (args) => (
    <SelectField {...args} options={undefined}>
      <SelectPrimitive.Item
        value="custom-1"
        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none focus:bg-gray-100"
      >
        <SelectPrimitive.ItemText>Custom Option A</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
      <SelectPrimitive.Item
        value="custom-2"
        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none focus:bg-gray-100"
      >
        <SelectPrimitive.ItemText>Custom Option B</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    </SelectField>
  ),
  args: {
    placeholder: 'Custom children',
  },
}

// 9. Playground story for interactive prop tweaking
export const Playground: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Playground',
  },
}
