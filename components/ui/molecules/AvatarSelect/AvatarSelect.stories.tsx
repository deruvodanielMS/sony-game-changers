import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AvatarSelect } from './AvatarSelect'

const meta: Meta<typeof AvatarSelect> = {
  title: 'Molecules/AvatarSelect',
  component: AvatarSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAvatarSelect: { action: 'avatars selected' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const mockAvatars = [
  { uid: '1', name: 'John Doe' },
  { uid: '2', name: 'Jane Smith' },
  { uid: '3', name: 'Bob Johnson' },
  { uid: '4', name: 'Alice Williams' },
  { uid: '5', name: 'Charlie Brown' },
  { uid: '6', name: 'Diana Prince' },
  { uid: '7', name: 'Eve Adams' },
  { uid: '8', name: 'Frank Castle' },
]

export const Default: Story = {
  args: {
    options: mockAvatars,
    selected: [],
    showItems: 5,
  },
}

export const WithSelection: Story = {
  args: {
    options: mockAvatars,
    selected: ['1', '3', '5'],
    showItems: 5,
  },
}

export const ShowThreeItems: Story = {
  args: {
    options: mockAvatars,
    selected: [],
    showItems: 3,
  },
}

export const AllItemsShown: Story = {
  args: {
    options: mockAvatars.slice(0, 4),
    selected: ['2'],
    showItems: 5,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(['1', '2'])

    return (
      <div className="space-y-4">
        <AvatarSelect {...args} selected={selected} onAvatarSelect={setSelected} />
        <div className="text-sm text-neutral-600">Selected: {selected.join(', ') || 'None'}</div>
      </div>
    )
  },
  args: {
    options: mockAvatars,
    showItems: 5,
  },
}

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])

    return (
      <div className="space-y-6 p-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Select Team Members</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Click on avatars to select/deselect team members. Click the + button to see more.
          </p>
          <AvatarSelect options={mockAvatars} selected={selected} onAvatarSelect={setSelected} />
        </div>
        <div className="p-3 bg-neutral-100 rounded">
          <p className="text-sm font-semibold">Selected ({selected.length}):</p>
          <p className="text-sm text-neutral-600 mt-1">
            {selected.length > 0
              ? selected
                  .map((id) => mockAvatars.find((a) => a.uid === id)?.name)
                  .filter(Boolean)
                  .join(', ')
              : 'No members selected'}
          </p>
        </div>
      </div>
    )
  },
}
