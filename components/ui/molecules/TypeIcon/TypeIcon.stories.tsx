import type { Meta, StoryObj } from '@storybook/react'
import { Rocket } from 'lucide-react'
import { TypeIcon } from './TypeIcon'

const meta: Meta<typeof TypeIcon> = {
  title: 'UI/Molecules/TypeIcon',
  component: TypeIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays an icon with a circular background to visually identify different types of ambitions. Used in cards (badge variant) and headers (metadata variant).',
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
    variant: {
      control: 'select',
      options: ['badge', 'metadata'],
      description: 'Visual variant - badge (48px) or metadata (24px)',
    },
  },
}

export default meta
type Story = StoryObj<typeof TypeIcon>

export const Business: Story = {
  args: {
    type: 'business',
    variant: 'badge',
  },
}

export const ManagerEffectiveness: Story = {
  args: {
    type: 'manager-effectiveness',
    variant: 'badge',
  },
}

export const PersonalGrowth: Story = {
  args: {
    type: 'personal-growth-and-development',
    variant: 'badge',
  },
}

export const BadgeVariant: Story = {
  args: {
    type: 'business',
    variant: 'badge',
  },
}

export const MetadataVariant: Story = {
  args: {
    type: 'business',
    variant: 'metadata',
  },
}

export const CustomIcon: Story = {
  args: {
    type: 'business',
    variant: 'badge',
    icon: Rocket,
  },
}

// All types example
export const AllTypes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" variant="badge" />
        <span className="text-xs">Business</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="manager-effectiveness" variant="badge" />
        <span className="text-xs">Manager</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="personal-growth-and-development" variant="badge" />
        <span className="text-xs">Personal</span>
      </div>
    </div>
  ),
}

// All variants example
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" variant="badge" />
        <span className="text-xs">Badge</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <TypeIcon type="business" variant="metadata" />
        <span className="text-xs">Metadata</span>
      </div>
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
