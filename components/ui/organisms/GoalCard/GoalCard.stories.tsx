import type { Meta, StoryObj } from '@storybook/react'
import { GoalCard } from './GoalCard'
import { Goal, GOAL_TYPES } from '@/domain/goal'

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
// Sample data - Updated to match Figma design
// --------------------------------------------------
const baseGoal: Goal = {
  id: 'g1',
  uid: 'user-1',
  userName: 'James Miller',
  title:
    'Improve operational efficiency and project delivery timelines by optimizing team workflows and using regular Check-ins to ensure alignment with quarterly business targets.',
  description: 'Become a better team leader',
  avatarUrl: '/profile-img/james-miller.png',
  status: 'awaiting_approval',
  goalType: GOAL_TYPES.BUSINESS,
  progress: 50,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  parent: {
    id: 'parent-1',
    title:
      'Maximize organizational value by aligning technical resources with global business priorities to drive sustainable growth and innovation through consistent Feedback.',
  },
}

const ladderGoals: Array<Goal> = [
  {
    id: 'lg1',
    uid: 'user-2',
    userName: 'Kylie Davies',
    title:
      'Reduce infrastructure operational costs by identifying and eliminating redundant cloud resources to improve the overall project budget efficiency.',
    avatarUrl: '/profile-img/kylie-davies.png',
    status: 'draft',
    progress: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lg2',
    uid: 'user-3',
    userName: 'Kylie Davies',
    title:
      'Accelerate the time-to-market for new platform features by streamlining the internal validation process to meet evolving business demands faster.',
    avatarUrl: '/profile-img/kylie-davies.png',
    status: 'awaiting_approval',
    progress: 33,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lg3',
    uid: 'user-4',
    userName: 'Kylie Davies',
    title:
      'Enhance product reliability to increase user retention rates and maintain the high brand standards expected by Sony Interactive Entertainment.',
    avatarUrl: '/profile-img/kylie-davies.png',
    status: 'completed',
    progress: 100,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// --------------------------------------------------
// Stories - Updated to showcase new Figma design
// --------------------------------------------------

/**
 * Main goal card without parent and without laddered goals.
 * Shows: Avatar + Type Icon, Title, Progress Bar (50%)
 */
export const NoChildren: Story = {
  args: {
    goal: { ...baseGoal, parent: undefined },
    ladderGoals: [],
    allowAddChildrenGoals: false,
    'data-testid': 'goal-card-no-children',
  },
}

/**
 * Complete card matching Figma design (node-id=5212-58530).
 * Shows:
 * - Higher Ambition with Arrow
 * - Main goal with Progress Bar (50%)
 * - 3 Laddered goals with Arrows and Progress/Status
 * - Bottom section with "Add" button and "Hide/View" toggle
 */
export const CompleteDesign: Story = {
  args: {
    goal: baseGoal,
    ladderGoals,
    allowAddChildrenGoals: true,
    'data-testid': 'goal-card-complete',
  },
}

/**
 * Card with parent goal (Higher Ambition) but no laddered goals.
 * Shows: Higher Ambition + Arrow connector + Main goal
 */
export const WithParentOnly: Story = {
  args: {
    goal: baseGoal,
    ladderGoals: [],
    allowAddChildrenGoals: false,
    'data-testid': 'goal-card-parent-only',
  },
}

/**
 * Card with laddered goals but no parent.
 * Shows: Main goal + Laddered goals with Arrow connectors
 */
export const WithChildren: Story = {
  args: {
    goal: { ...baseGoal, parent: undefined },
    ladderGoals,
    allowAddChildrenGoals: false,
    'data-testid': 'goal-card-children',
  },
}

/**
 * Card with "Add laddered Ambition" button enabled.
 */
export const AddChildrenButton: Story = {
  args: {
    goal: { ...baseGoal, parent: undefined },
    ladderGoals: [],
    allowAddChildrenGoals: true,
    'data-testid': 'goal-card-add-button',
  },
}

/**
 * Card with varied progress states to showcase ProgressBar variants.
 * - Main goal: 75% (in-progress, blue)
 * - Laddered 1: Draft status badge
 * - Laddered 2: 100% (completed, green)
 */
export const VariedProgressStates: Story = {
  args: {
    goal: { ...baseGoal, progress: 75, parent: undefined },
    ladderGoals: [
      ladderGoals[0], // Draft
      { ...ladderGoals[2], progress: 100 }, // Completed
    ],
    allowAddChildrenGoals: false,
    'data-testid': 'goal-card-progress-states',
  },
}
