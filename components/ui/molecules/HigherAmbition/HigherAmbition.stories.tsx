import type { Meta, StoryObj } from '@storybook/react'
import { HigherAmbition } from './HigherAmbition'

const meta = {
  title: 'Molecules/HigherAmbition',
  component: HigherAmbition,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'HigherAmbition displays a parent goal/ambition with an upward arrow icon, indicating hierarchical parent (higher level). Based on Figma design specifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the higher ambition',
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
} satisfies Meta<typeof HigherAmbition>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default static display of a higher ambition without interaction
 */
export const Default: Story = {
  args: {
    text: 'Foster a high-performing engineering culture that balances technical excellence with professional growth through continuous Feedback.',
    goalType: 'business',
  },
}

/**
 * Clickable variant with hover interaction
 */
export const Clickable: Story = {
  args: {
    text: 'Foster a high-performing engineering culture that balances technical excellence with professional growth through continuous Feedback.',
    goalType: 'manager-effectiveness',
    onClick: () => console.log('Navigate to parent goal'),
  },
}

/**
 * Long text that gets truncated with ellipsis
 */
export const LongText: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <HigherAmbition
        goalType="personal-growth-and-development"
        text="This is a very long higher ambition description that demonstrates how the component handles text overflow with ellipsis truncation to maintain the layout integrity and prevent breaking the design"
      />
    </div>
  ),
}

/**
 * In a card context showing usage with ambition detail header
 */
export const InCardContext: Story = {
  render: () => (
    <div className="rounded-large bg-neutral-100 p-2">
      <HigherAmbition
        goalType="business"
        text="Foster a high-performing engineering culture that balances technical excellence with professional growth."
        onClick={() => console.log('Navigate to parent')}
      />
      <div className="mt-1.5 border-t border-neutral-300 pt-1.5">
        <h3 className="text-h5 leading-h5 font-semibold text-neutral-1000">
          Empower team autonomy by improving deployment processes
        </h3>
        <p className="text-body-small leading-body-small text-neutral-600">
          This is the child ambition content that relates to the parent shown above.
        </p>
      </div>
    </div>
  ),
}

/**
 * Multiple higher ambitions showing navigation path
 */
export const NavigationPath: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <HigherAmbition
        text="Strategic company vision for 2026"
        goalType="business"
        onClick={() => console.log('Navigate to top level')}
      />
      <div className="ml-2">
        <HigherAmbition
          text="Foster engineering culture with technical excellence"
          goalType="manager-effectiveness"
          onClick={() => console.log('Navigate to parent')}
        />
      </div>
      <div className="ml-4 p-2 bg-neutral-100 rounded-large">
        <p className="text-body-small text-neutral-600">
          Current ambition: Empower team autonomy by improving deployment processes
        </p>
      </div>
    </div>
  ),
}

/**
 * All goal types with gradient icons
 */
export const AllGoalTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <HigherAmbition
        text="Business strategic initiative"
        goalType="business"
        onClick={() => console.log('Navigate to business goal')}
      />
      <HigherAmbition
        text="Manager effectiveness improvement"
        goalType="manager-effectiveness"
        onClick={() => console.log('Navigate to manager goal')}
      />
      <HigherAmbition
        text="Personal growth and development plan"
        goalType="personal-growth-and-development"
        onClick={() => console.log('Navigate to personal goal')}
      />
    </div>
  ),
}
