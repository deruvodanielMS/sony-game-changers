import type { Meta, StoryObj } from '@storybook/react'
import { MetadataDisplay } from './MetadataDisplay'

const meta: Meta<typeof MetadataDisplay> = {
  title: 'Molecules/MetadataDisplay',
  component: MetadataDisplay,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays creation and update metadata with user avatar, name, and timestamps. Commonly used in headers and cards to show ownership and activity information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant for mobile (sm) or desktop (md)',
    },
    avatarSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
  },
}

export default meta
type Story = StoryObj<typeof MetadataDisplay>

export const Default: Story = {
  args: {
    userName: 'John Doe',
    avatarUrl: '/profile-img/person1.webp',
    createdDate: 'Jan 15, 2024',
  },
}

export const WithoutAvatar: Story = {
  args: {
    userName: 'Jane Smith',
    createdDate: 'Jan 15, 2024',
  },
}

export const WithUpdatedDate: Story = {
  args: {
    userName: 'Mike Chen',
    avatarUrl: '/profile-img/person2.webp',
    createdDate: 'Jan 15, 2024',
    updatedDate: 'Jan 16, 2024',
  },
}

export const WithInfo: Story = {
  args: {
    userName: 'Sarah Johnson',
    avatarUrl: '/profile-img/person3.webp',
    createdDate: 'Jan 15, 2024',
    showInfo: true,
    infoTooltip: 'This ambition was created as part of Q1 planning',
  },
}

export const Complete: Story = {
  args: {
    userName: 'David Park',
    avatarUrl: '/profile-img/person4.webp',
    createdDate: 'Jan 15, 2024',
    updatedDate: 'Jan 16, 2024',
    showInfo: true,
    infoTooltip: 'Last modified by Emma Wilson',
  },
}

export const SmallSize: Story = {
  args: {
    userName: 'Lisa Brown',
    avatarUrl: '/profile-img/person5.webp',
    createdDate: 'Jan 15, 2024',
    updatedDate: 'Jan 16, 2024',
    size: 'sm',
  },
}

export const CustomLabels: Story = {
  args: {
    userName: 'Carlos Garcia',
    avatarUrl: '/profile-img/person1.webp',
    createdDate: '15 ene 2024',
    updatedDate: '16 ene 2024',
    createdByLabel: 'Creado por',
    onLabel: 'el',
    lastUpdatedLabel: 'Última actualización',
  },
}

export const LargeAvatar: Story = {
  args: {
    userName: 'Emma Wilson',
    avatarUrl: '/profile-img/person2.webp',
    createdDate: 'Jan 15, 2024',
    avatarSize: 'md',
  },
}

// Examples in different contexts
export const InCard: Story = {
  render: () => (
    <div className="max-w-2xl p-2 bg-neutral-100 rounded-1.5">
      <h3 className="text-lg font-bold mb-1">Improve Team Communication</h3>
      <MetadataDisplay
        userName="John Doe"
        avatarUrl="/profile-img/person1.webp"
        createdDate="Jan 15, 2024"
        updatedDate="Jan 16, 2024"
        showInfo
        infoTooltip="Last modified by manager"
      />
    </div>
  ),
}

export const InHeader: Story = {
  render: () => (
    <div className="max-w-3xl">
      <div className="flex flex-col gap-2 p-2 bg-neutral-100 rounded-1.5">
        <div className="flex items-center gap-1">
          <div className="size-3 bg-gradient-to-l from-[#5577f4] to-[#d061ff] rounded-full" />
          <h2 className="text-xl font-bold">Enhance Customer Experience</h2>
        </div>
        <MetadataDisplay
          userName="Sarah Johnson"
          avatarUrl="/profile-img/person3.webp"
          createdDate="Jan 10, 2024"
          updatedDate="Jan 15, 2024"
        />
      </div>
    </div>
  ),
}

export const MultipleMobile: Story = {
  render: () => (
    <div className="max-w-sm flex flex-col gap-2">
      <div className="p-1.5 bg-neutral-50 rounded-1">
        <MetadataDisplay
          userName="John Doe"
          avatarUrl="/profile-img/person1.webp"
          createdDate="Jan 15, 2024"
          size="sm"
          avatarSize="xs"
        />
      </div>
      <div className="p-1.5 bg-neutral-50 rounded-1">
        <MetadataDisplay
          userName="Jane Smith"
          avatarUrl="/profile-img/person2.webp"
          createdDate="Jan 14, 2024"
          updatedDate="Jan 16, 2024"
          size="sm"
          avatarSize="xs"
        />
      </div>
    </div>
  ),
}
