import type { Meta, StoryObj } from '@storybook/react'
import { Target, Rocket, Star } from 'lucide-react'
import { TypeIcon } from './TypeIcon'

const meta: Meta<typeof TypeIcon> = {
  title: 'UI/Molecules/TypeIcon',
  component: TypeIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays an icon with a gradient background to visually identify different types of ambitions. Used in cards, headers, and lists to provide quick visual identification.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['business', 'manager-effectiveness', 'personal-growth-and-development'],
      description: 'Type of ambition',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon container',
    },
  },
}

export default meta
type Story = StoryObj<typeof TypeIcon>

export const Business: Story = {
  args: {
    type: 'business',
  },
}

export const ManagerEffectiveness: Story = {
  args: {
    type: 'manager-effectiveness',
  },
}

export const PersonalGrowth: Story = {
  args: {
    type: 'personal-growth-and-development',
  },
}

export const SmallSize: Story = {
  args: {
    type: 'business',
    size: 'sm',
  },
}

export const MediumSize: Story = {
  args: {
    type: 'business',
    size: 'md',
  },
}

export const LargeSize: Story = {
  args: {
    type: 'business',
    size: 'lg',
  },
}

export const CustomGradient: Story = {
  args: {
    type: 'business',
    gradient: ['#ff6b6b', '#feca57'],
  },
}

export const CustomIcon: Story = {
  args: {
    type: 'business',
    icon: Rocket,
  },
}

// All types example
export const AllTypes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" />
        <span className="text-xs">Business</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="manager-effectiveness" />
        <span className="text-xs">Manager</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="personal-growth-and-development" />
        <span className="text-xs">Personal</span>
      </div>
    </div>
  ),
}

// All sizes example
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" size="sm" />
        <span className="text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" size="md" />
        <span className="text-xs">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" size="lg" />
        <span className="text-xs">Large</span>
      </div>
    </div>
  ),
}

// Custom gradients
export const CustomGradients: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <TypeIcon type="business" gradient={['#667eea', '#764ba2']} />
      <TypeIcon type="business" gradient={['#f093fb', '#f5576c']} />
      <TypeIcon type="business" gradient={['#4facfe', '#00f2fe']} />
      <TypeIcon type="business" gradient={['#43e97b', '#38f9d7']} />
      <TypeIcon type="business" gradient={['#fa709a', '#fee140']} />
    </div>
  ),
}

// With custom icons
export const WithCustomIcons: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <TypeIcon type="business" icon={Target} />
      <TypeIcon type="business" icon={Rocket} />
      <TypeIcon type="business" icon={Star} />
    </div>
  ),
}
