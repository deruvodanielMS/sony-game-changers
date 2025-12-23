import type { Meta, StoryObj } from '@storybook/react'
import { GoalCard } from './GoalCard'
import { Goal, GOAL_TYPES } from '@/types/goals'

// --------------------------------------------------
// Storybook Meta
// --------------------------------------------------
const meta: Meta<typeof GoalCard> = {
  title: 'Organisms/GoalCard',
  component: GoalCard,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof GoalCard>

// --------------------------------------------------
// Datos de ejemplo
// --------------------------------------------------
const baseGoal: Goal = {
  id: 'g1',
  userName: 'John Doe',
  title: 'Improve Leadership Skills',
  description: 'Become a better team leader',
  avatarUrl: '',
  status: 'draft',
  goalType: GOAL_TYPES.BUSINESS,
}

const ladderGoals: Array<Goal> = [
  {
    id: 'lg1',
    userName: 'Jane Smith',
    title: 'Complete leadership course',
    avatarUrl: '',
    status: 'completed',
  },
  {
    id: 'lg2',
    userName: 'Mike Johnson',
    title: 'Hold monthly feedback sessions',
    avatarUrl: '',
    status: 'draft',
  },
]

// --------------------------------------------------
// Stories
// --------------------------------------------------

export const NoChildren: Story = {
  args: {
    goal: baseGoal,
    ladderGoals: [],
    allowAddChildrenGoals: false,
    'data-testid': 'goal-card-no-children',
  },
}

export const WithChildren: Story = {
  args: {
    goal: baseGoal,
    ladderGoals,
    allowAddChildrenGoals: false,
    'data-testid': 'goal-card-children',
  },
}

export const AddChildrenButton: Story = {
  args: {
    goal: baseGoal,
    ladderGoals: [],
    allowAddChildrenGoals: true,
    'data-testid': 'goal-card-add-button',
  },
}

export const WithChildrenAndAddButton: Story = {
  args: {
    goal: baseGoal,
    ladderGoals,
    allowAddChildrenGoals: true,
    'data-testid': 'goal-card-full',
  },
}
