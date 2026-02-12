import type { Meta, StoryObj } from '@storybook/react'
import { MainAmbition } from './MainAmbition'
import { GOAL_TYPES } from '@/domain/goal'

const meta: Meta<typeof MainAmbition> = {
  title: 'GameChangers/Ambitions/MainAmbition',
  component: MainAmbition,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof MainAmbition>

export const Default: Story = {
  args: {
    title:
      'This is the space for an amazing Ambition name that can have the extension of no more than two lines of text and is clickable to enter to the detail page.',
    userName: 'James Miller',
    avatarUrl: '/profile-img/james-miller.png',
    goalType: GOAL_TYPES.BUSINESS,
    progress: 40,
    href: '/en/ambitions/1',
    showLadderedIndicator: true,
  },
}

export const WithoutLadderedIndicator: Story = {
  args: {
    ...Default.args,
    showLadderedIndicator: false,
    progress: 80,
  },
}

export const TwoLineTitle: Story = {
  args: {
    title:
      'Create comprehensive documentation and testing suite for the new feature implementation',
    userName: 'James Miller',
    avatarUrl: '/profile-img/james-miller.png',
    goalType: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
    progress: 60,
    href: '/en/ambitions/1',
    showLadderedIndicator: false,
  },
}
