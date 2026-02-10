import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from './RadioGroup'
import { Home, Settings, User } from 'lucide-react'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Atoms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const defaultItems = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
]

const itemsWithIcons = [
  { id: 'home', label: 'Home', icon: <Home width={18} /> },
  { id: 'profile', label: 'Profile', icon: <User width={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings width={18} /> },
]

const itemsWithDisabled = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2', disabled: true },
  { id: 'option3', label: 'Option 3' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return <RadioGroup items={defaultItems} value={value} onChange={setValue} />
  },
}

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return <RadioGroup items={defaultItems} value={value} onChange={setValue} size="small" />
  },
}

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return <RadioGroup items={defaultItems} value={value} onChange={setValue} size="large" />
  },
}

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('home')
    return <RadioGroup items={itemsWithIcons} value={value} onChange={setValue} size="large" />
  },
}

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return <RadioGroup items={itemsWithDisabled} value={value} onChange={setValue} />
  },
}

export const LongLabels: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    const items = [
      { id: 'option1', label: 'Business goals and objectives' },
      { id: 'option2', label: 'Personal growth and development activities' },
      { id: 'option3', label: 'Manager effectiveness and team leadership' },
    ]
    return <RadioGroup items={items} value={value} onChange={setValue} size="large" />
  },
}
