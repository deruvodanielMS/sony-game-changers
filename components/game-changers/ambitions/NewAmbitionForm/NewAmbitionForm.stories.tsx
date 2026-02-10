import type { Meta, StoryObj } from '@storybook/react'
import { NewAmbitionForm } from './NewAmbitionForm'

const meta: Meta<typeof NewAmbitionForm> = {
  title: 'GameChangers/Ambitions/NewAmbitionForm',
  component: NewAmbitionForm,
}

export default meta

type Story = StoryObj<typeof NewAmbitionForm>

export const Default: Story = {
  args: {},
}
