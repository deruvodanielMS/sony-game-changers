import type { Meta, StoryObj } from '@storybook/react'
import { LadderingModal } from './LadderingModal'
import type { Ambition } from '@/domain/ambition'

const meta: Meta<typeof LadderingModal> = {
  title: 'Organisms/LadderingModal',
  component: LadderingModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-screen h-screen">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const mockGoal: Ambition = {
  id: '1',
  title:
    'Ensure core title features meet established quality bars to achieve a strong critical reception score.',
  status: 'draft',
  userName: 'Adam Reynolds',
  avatarUrl: '',
}

const mockCompletedGoal: Ambition = {
  id: '2',
  title: 'Implement comprehensive testing strategy across all game systems.',
  status: 'completed',
  userName: 'Sarah Johnson',
  avatarUrl: '',
}

const mockAwaitingApprovalGoal: Ambition = {
  id: '3',
  title: 'Optimize rendering pipeline for improved performance on all platforms.',
  status: 'awaiting_approval',
  userName: 'Michael Chen',
  avatarUrl: '',
  description: 'Focus on PS5 and PC optimization',
}

export const Default: Story = {
  args: {
    open: true,
    selectedGoal: mockGoal,
  },
}

export const WithCompletedGoal: Story = {
  args: {
    open: true,
    selectedGoal: mockCompletedGoal,
  },
}

export const WithAwaitingApprovalGoal: Story = {
  args: {
    open: true,
    selectedGoal: mockAwaitingApprovalGoal,
  },
}

export const Closed: Story = {
  args: {
    open: false,
    selectedGoal: mockGoal,
  },
}

export const WithLongTitle: Story = {
  args: {
    open: true,
    selectedGoal: {
      ...mockGoal,
      title:
        'This is an extremely long goal title that should demonstrate how the component handles text overflow and wrapping in various screen sizes and container widths to ensure proper display and readability.',
    },
  },
}

export const MobileBottomSheet: Story = {
  args: {
    open: true,
    selectedGoal: mockGoal,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const WithShortTitle: Story = {
  args: {
    open: true,
    selectedGoal: {
      ...mockGoal,
      title: 'Quick win goal',
    },
  },
}
