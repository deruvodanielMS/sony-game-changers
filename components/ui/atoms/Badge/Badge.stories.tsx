import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['counter', 'icon', 'dot'],
      description:
        'Visual type of badge — counter shows a number, icon shows a semantic icon, dot is a small indicator',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'error',
        'error-dark',
        'neutral',
        'default',
        'pending',
        'success',
        'info',
        'warning',
      ],
      description: 'Color / semantic variant',
    },
    count: {
      control: { type: 'number' },
      description: 'Number to show (counter type only)',
    },
    max: {
      control: { type: 'number' },
      description: 'Max value before showing `+{max}`. Defaults to 9',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Icon size (icon type only). Defaults to md',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Counter ─────────────────────────────────────────────────────────────────

/**
 * Default counter badge — neutral variant, single digit count
 */
export const Counter: Story = {
  args: {
    type: 'counter',
    variant: 'neutral',
    count: 3,
  },
}

/**
 * All counter variants side by side
 */
export const CounterAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge type="counter" variant="default" count={1} />
      <Badge type="counter" variant="neutral" count={2} />
      <Badge type="counter" variant="success" count={3} />
      <Badge type="counter" variant="info" count={4} />
      <Badge type="counter" variant="warning" count={5} />
      <Badge type="counter" variant="error" count={6} />
      <Badge type="counter" variant="error-dark" count={7} />
      <Badge type="counter" variant="pending" count={8} />
    </div>
  ),
}

/**
 * Counter overflows to `+9` when count exceeds max (default max = 9)
 */
export const CounterOverflow: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Badge type="counter" variant="error" count={9} />
      <Badge type="counter" variant="error" count={10} />
      <Badge type="counter" variant="error" count={99} />
      <Badge type="counter" variant="info" count={5} max={3} />
    </div>
  ),
}

/**
 * Counter with ring (used as an overlay on avatars)
 */
export const CounterWithRing: Story = {
  render: () => (
    <div className="flex gap-3 items-center p-2 bg-neutral-200 rounded-md">
      <Badge type="counter" variant="neutral" count={2} className="ring-2 ring-neutral-0" />
      <Badge type="counter" variant="error" count={5} className="ring-2 ring-neutral-0" />
    </div>
  ),
}

// ─── Icon ─────────────────────────────────────────────────────────────────────

/**
 * Default icon badge — success variant, medium size
 */
export const Icon: Story = {
  args: {
    type: 'icon',
    variant: 'success',
    size: 'md',
  },
}

/**
 * All icon variants (each variant maps to its own icon)
 */
export const IconAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge type="icon" variant="pending" />
      <Badge type="icon" variant="success" />
      <Badge type="icon" variant="info" />
      <Badge type="icon" variant="warning" />
      <Badge type="icon" variant="error" />
      <Badge type="icon" variant="error-dark" />
    </div>
  ),
}

/**
 * Icon size comparison — sm (12 px) vs md (16 px)
 */
export const IconSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-1">
        <Badge type="icon" variant="success" size="sm" />
        <span className="text-xs text-neutral-600">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Badge type="icon" variant="success" size="md" />
        <span className="text-xs text-neutral-600">md</span>
      </div>
    </div>
  ),
}

// ─── Dot ─────────────────────────────────────────────────────────────────────

/**
 * Default dot badge — small circular indicator
 */
export const Dot: Story = {
  args: {
    type: 'dot',
    variant: 'success',
  },
}

/**
 * All dot variants
 */
export const DotAllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge type="dot" variant="default" />
      <Badge type="dot" variant="neutral" />
      <Badge type="dot" variant="success" />
      <Badge type="dot" variant="info" />
      <Badge type="dot" variant="warning" />
      <Badge type="dot" variant="error" />
      <Badge type="dot" variant="error-dark" />
      <Badge type="dot" variant="pending" />
    </div>
  ),
}

// ─── All types together ───────────────────────────────────────────────────────

/**
 * Overview of all three badge types
 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <span className="text-body-small text-neutral-600 w-16">counter</span>
        <Badge type="counter" variant="neutral" count={4} />
        <Badge type="counter" variant="success" count={12} />
        <Badge type="counter" variant="error" count={99} />
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-body-small text-neutral-600 w-16">icon</span>
        <Badge type="icon" variant="success" />
        <Badge type="icon" variant="warning" />
        <Badge type="icon" variant="error" />
        <Badge type="icon" variant="info" />
        <Badge type="icon" variant="pending" />
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-body-small text-neutral-600 w-16">dot</span>
        <Badge type="dot" variant="success" />
        <Badge type="dot" variant="warning" />
        <Badge type="dot" variant="error" />
        <Badge type="dot" variant="info" />
        <Badge type="dot" variant="pending" />
      </div>
    </div>
  ),
}
