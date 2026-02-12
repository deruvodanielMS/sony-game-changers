import type { Meta, StoryObj } from '@storybook/react'
import { LadderingModal } from './LadderingModal'
import type { Goal } from '@/domain/goal'
import type { ParentAmbition } from './LadderingModal.types'

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

const mockGoal: Goal = {
  id: '1',
  uid: 'user-1',
  title:
    'Ensure core title features meet established quality bars to achieve a strong critical reception score.',
  status: 'draft',
  userName: 'Adam Reynolds',
  avatarUrl: '',
  progress: 0,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

const mockCompletedGoal: Goal = {
  id: '2',
  uid: 'user-2',
  title: 'Implement comprehensive testing strategy across all game systems.',
  status: 'completed',
  userName: 'Sarah Johnson',
  avatarUrl: '',
  progress: 100,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

const mockAwaitingApprovalGoal: Goal = {
  id: '3',
  uid: 'user-3',
  title: 'Optimize rendering pipeline for improved performance on all platforms.',
  status: 'awaiting_approval',
  userName: 'Michael Chen',
  avatarUrl: '',
  description: 'Focus on PS5 and PC optimization',
  progress: 75,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

const mockParentAmbitions: ParentAmbition[] = [
  {
    id: 'division',
    title: 'AAA Division Ambition',
    userName: 'James Miller',
    avatarUrl: '',
  },
  {
    id: 'team',
    title: 'AAA Team Ambition',
    userName: 'Jürgen Schneider',
    avatarUrl: '',
  },
]

export const Default: Story = {
  args: {
    open: true,
    selectedGoal: mockGoal,
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
  },
}

export const WithCompletedGoal: Story = {
  args: {
    open: true,
    selectedGoal: mockCompletedGoal,
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
  },
}

export const WithAwaitingApprovalGoal: Story = {
  args: {
    open: true,
    selectedGoal: mockAwaitingApprovalGoal,
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
  },
}

export const WithoutParentAmbitions: Story = {
  args: {
    open: true,
    selectedGoal: mockGoal,
    onClose: () => {},
  },
}

export const Closed: Story = {
  args: {
    open: false,
    selectedGoal: mockGoal,
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
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
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
  },
}

export const MobileBottomSheet: Story = {
  args: {
    open: true,
    selectedGoal: mockGoal,
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
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
    parentAmbitions: mockParentAmbitions,
    onClose: () => {},
  },
}
