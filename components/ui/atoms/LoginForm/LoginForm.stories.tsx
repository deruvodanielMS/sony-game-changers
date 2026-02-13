import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'

const meta = {
  title: 'Atoms/LoginForm',
  component: LoginForm,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
