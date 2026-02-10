import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { UserCircle, Users, Briefcase } from 'lucide-react'
import { BigSelectField } from './BigSelectField'
import type { BigSelectOption } from './BigSelectField.types'

const meta: Meta<typeof BigSelectField> = {
  title: 'UI/Molecules/BigSelectField',
  component: BigSelectField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A large select field component with support for avatars, icons, labels, and descriptions. Designed for important selections like user assignments.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the select field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the field',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof BigSelectField>

const userOptions: BigSelectOption[] = [
  {
    value: '1',
    label: 'John Doe',
    description: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    value: '2',
    label: 'Jane Smith',
    description: 'Engineering Lead',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    value: '3',
    label: 'Bob Johnson',
    description: 'Senior Designer',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    value: '4',
    label: 'Alice Williams',
    description: 'Data Scientist',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    value: '5',
    label: 'Charlie Brown',
    description: 'Marketing Director',
    avatar: 'https://i.pravatar.cc/150?img=5',
    disabled: true,
  },
]

const teamOptions: BigSelectOption[] = [
  {
    value: 'engineering',
    label: 'Engineering Team',
    description: '12 members',
    icon: <Briefcase width={24} className="text-extra-blue-600" />,
  },
  {
    value: 'design',
    label: 'Design Team',
    description: '8 members',
    icon: <Users width={24} className="text-extra-purple-500" />,
  },
  {
    value: 'product',
    label: 'Product Team',
    description: '6 members',
    icon: <Briefcase width={24} className="text-extra-green-600" />,
  },
]

export const Default: Story = {
  args: {
    options: userOptions,
    placeholder: 'Select option',
  },
}

export const WithLabel: Story = {
  args: {
    options: userOptions,
    label: 'Owner',
    placeholder: 'Select owner',
  },
}

export const WithLabelRequired: Story = {
  args: {
    options: userOptions,
    label: 'Owner',
    placeholder: 'Select owner',
    required: true,
  },
}

export const WithValue: Story = {
  args: {
    options: userOptions,
    label: 'Owner',
    placeholder: 'Select owner',
    value: '1',
  },
}

export const WithError: Story = {
  args: {
    options: userOptions,
    label: 'Owner',
    placeholder: 'Select owner',
    required: true,
    error: 'This field is required.',
  },
}

export const WithCustomPlaceholderIcon: Story = {
  args: {
    options: userOptions,
    label: 'Assign to',
    placeholder: 'Select a team member',
    placeholderIcon: <UserCircle width={24} className="text-extra-blue-600" />,
  },
}

export const WithIcons: Story = {
  args: {
    options: teamOptions,
    label: 'Team',
    placeholder: 'Select team',
  },
}

export const WithIconsAndValue: Story = {
  args: {
    options: teamOptions,
    label: 'Team',
    placeholder: 'Select team',
    value: 'engineering',
  },
}

export const Disabled: Story = {
  args: {
    options: userOptions,
    label: 'Owner',
    placeholder: 'Select owner',
    value: '1',
    disabled: true,
  },
}

export const DisabledWithoutValue: Story = {
  args: {
    options: userOptions,
    label: 'Owner',
    placeholder: 'Select owner',
    disabled: true,
  },
}

export const LongList: Story = {
  args: {
    options: [
      ...userOptions,
      {
        value: '6',
        label: 'Diana Prince',
        description: 'UX Researcher',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      {
        value: '7',
        label: 'Ethan Hunt',
        description: 'DevOps Engineer',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      {
        value: '8',
        label: 'Fiona Gallagher',
        description: 'Content Strategist',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      {
        value: '9',
        label: 'George Miller',
        description: 'Business Analyst',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      {
        value: '10',
        label: 'Hannah Montana',
        description: 'HR Manager',
        avatar: 'https://i.pravatar.cc/150?img=10',
      },
    ],
    label: 'Owner',
    placeholder: 'Select owner',
  },
}

export const NoDescriptions: Story = {
  args: {
    options: [
      {
        value: '1',
        label: 'Option One',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        value: '2',
        label: 'Option Two',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        value: '3',
        label: 'Option Three',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ],
    label: 'Select',
    placeholder: 'Choose an option',
  },
}

export const InteractiveExample: Story = {
  args: {
    options: userOptions,
    label: 'Project Owner',
    placeholder: 'Select project owner',
    required: true,
  },
  render: (args) => {
    const [value, setValue] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')

    const handleChange = (newValue: string) => {
      setValue(newValue)
      setError('')
    }

    const handleValidate = () => {
      if (!value) {
        setError('Please select a project owner')
      } else {
        setError('')
        alert(`Selected: ${value}`)
      }
    }

    return (
      <div className="flex flex-col gap-2">
        <BigSelectField {...args} value={value} onValueChange={handleChange} error={error} />
        <button
          onClick={handleValidate}
          className="px-2 py-1 bg-neutral-1000 text-neutral-0 rounded-default"
        >
          Validate
        </button>
      </div>
    )
  },
}
