import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'
import type { TextFieldProps } from './TextField.types'

const meta: Meta<typeof TextField> = {
  title: 'Atoms/TextField',
  component: TextField,
  argTypes: {
    type: { control: { type: 'text' } },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
  },
}
export default meta

type Story = StoryObj<typeof TextField>

const LeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
  </svg>
)
const RightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const Default: Story = {
  args: {
    placeholder: 'Type here...',
    type: 'text',
  },
}

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search',
    leftIcon: LeftIcon,
  },
}

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Amount',
    rightIcon: RightIcon,
    type: 'number',
  },
}

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Both',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
  },
}


export const States: Story = {
  render: (args: TextFieldProps) => (
    <div className="space-y-2 w-80">
      <TextField {...args} placeholder="Default" />
      <TextField {...args} placeholder="Disabled" disabled />
      <TextField {...args} placeholder="Read only" readOnly value="Can't edit" />
      <TextField {...args} placeholder="Error" aria-invalid="true" />
    </div>
  ),
  args: {},
}

export const CustomWidth: Story = {
  render: (args: TextFieldProps) => (
    <div className="space-y-2">
      <TextField {...args} placeholder="Default fullWidth (w-full)" />
      <TextField {...args} placeholder="Fixed width" fullWidth={false} className="w-96" />
    </div>
  ),
  args: {
  },
}

export const Playground: Story = {
  args: {
    placeholder: 'Playground',
  },
}
