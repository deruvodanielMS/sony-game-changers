import type { Meta, StoryObj } from '@storybook/react'
import { LadderedAmbition } from './LadderedAmbition'
import { GOAL_STATUSES } from '@/domain/goal'

const meta: Meta<typeof LadderedAmbition> = {
  title: 'GameChangers/Ambitions/LadderedAmbition',
  component: LadderedAmbition,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof LadderedAmbition>

export const Draft: Story = {
  args: {
    title:
      'This is the space for an amazing laddered Ambition name that can have the extension of one line of text, and if it’s more extensive will have an ellipsis.',
    userName: 'Kylie Davies',
    avatarUrl: '/profile-img/kylie-davies.png',
    progress: 0,
    status: GOAL_STATUSES.DRAFT,
    statusLabel: 'Draft',
    statusVariant: 'draft',
    arrowType: 'Laddered middle',
    href: '/ambitions/1',
  },
}

export const InProgress: Story = {
  args: {
    ...Draft.args,
    progress: 35,
    status: GOAL_STATUSES.AWAITING_APPROVAL,
    statusLabel: 'Awaiting approval',
    statusVariant: 'awaiting-approval',
  },
}
