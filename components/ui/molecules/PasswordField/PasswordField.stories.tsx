import type { Meta, StoryObj } from '@storybook/react'
import { PasswordField } from './PasswordField'

const meta: Meta<typeof PasswordField> = {
  title: 'Molecules/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PasswordField>

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
    'data-test-id': 'pw-default',
  },
}

export const Toggled: Story = {
  args: {
    placeholder: 'Visible now',
    initialType: 'text',
    'data-test-id': 'pw-visible',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    placeholder: 'Read only',
    readOnly: true,
    value: 'cannot edit',
  },
}

export const CustomToggleProps: Story = {
  args: {
    placeholder: 'Custom toggle',
    toggleButtonProps: { 'aria-label': 'Custom toggle', className: 'text-blue-600' },
  },
}

export const Playground: Story = {
  args: {
    placeholder: 'Play with initialType',
    initialType: 'password',
  },
}
