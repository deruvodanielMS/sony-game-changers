import type { Meta, StoryObj } from '@storybook/react'
import { LadderGoal } from './LadderGoal'

const meta = {
  title: 'UI/Molecules/LadderGoal',
  component: LadderGoal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'LadderGoal displays a parent ambition/goal with a visual indicator showing hierarchical relationship. Based on Figma design specifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the laddered goal',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler for navigation',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof LadderGoal>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default static display of a laddered goal without interaction
 */
export const Default: Story = {
  args: {
    text: 'Increase company revenue by 25%',
  },
}

/**
 * Clickable variant with hover interaction
 */
export const Clickable: Story = {
  args: {
    text: 'Increase company revenue by 25%',
    onClick: () => console.log('Navigate to parent goal'),
  },
}

/**
 * Long text that gets truncated with ellipsis
 */
export const LongText: Story = {
  args: {
    text: 'This is a very long goal description that demonstrates how the component handles text overflow with ellipsis truncation to maintain the layout integrity',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Multiple laddered goals stacked vertically
 */
export const MultipleGoals: Story = {
  args: {
    text: '',
  },
  render: () => (
    <div className="flex flex-col gap-1">
      <LadderGoal text="Level 1: Strategic Initiative" />
      <LadderGoal text="Level 2: Department Objective" onClick={() => {}} />
      <LadderGoal text="Level 3: Team Goal" onClick={() => {}} />
    </div>
  ),
}

/**
 * In a card context (typical usage)
 */
export const InCardContext: Story = {
  args: {
    text: '',
  },
  render: () => (
    <div className="rounded-large bg-neutral-100 p-2">
      <LadderGoal
        text="Increase company revenue by 25%"
        onClick={() => console.log('Navigate to parent')}
      />
      <div className="mt-1.5 border-t border-neutral-300 pt-1.5">
        <h3 className="text-h5 leading-h5 font-semibold text-neutral-1000">
          Launch new product line in Q2
        </h3>
        <p className="text-body-small leading-body-small text-neutral-600">
          This is the child goal content that relates to the parent shown above.
        </p>
      </div>
    </div>
  ),
}

/**
 * Dark background variant
 */
export const OnDarkBackground: Story = {
  args: {
    text: 'Increase company revenue by 25%',
    onClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-1000 p-3" data-theme="dark">
        <Story />
      </div>
    ),
  ],
}
