import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'UI/Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Default checkbox',
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Checked checkbox',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Disabled checked checkbox',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Small checkbox',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    'aria-label': 'Medium checkbox',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    'aria-label': 'Large checkbox',
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="flex flex-col gap-2">
        <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Controlled checkbox" />
        <p className="text-sm">Checked: {checked ? 'Yes' : 'No'}</p>
      </div>
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <label className="flex items-center gap-0.5 cursor-pointer">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm">I agree to the terms and conditions</span>
      </label>
    )
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox size="sm" defaultChecked aria-label="Small" />
      <Checkbox size="md" defaultChecked aria-label="Medium" />
      <Checkbox size="lg" defaultChecked aria-label="Large" />
    </div>
  ),
}
