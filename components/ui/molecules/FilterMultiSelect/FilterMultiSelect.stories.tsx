import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FilterMultiSelect } from './FilterMultiSelect'

const meta: Meta<typeof FilterMultiSelect> = {
  title: 'Molecules/FilterMultiSelect',
  component: FilterMultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'option selected' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const statusOptions = [
  { label: 'Not Started', value: 'not-started' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'on-hold' },
]

const typeOptions = [
  { label: 'Business', value: 'business' },
  { label: 'Personal Growth', value: 'personal-growth' },
  { label: 'Manager Effectiveness', value: 'manager-effectiveness' },
]

export const Default: Story = {
  args: {
    label: 'Status',
    options: statusOptions,
    selected: [],
  },
}

export const WithSelection: Story = {
  args: {
    label: 'Status',
    options: statusOptions,
    selected: ['in-progress', 'completed'],
  },
}

export const SingleSelect: Story = {
  args: {
    label: 'Type',
    options: typeOptions,
    selected: ['business'],
    single: true,
  },
}

export const LongOptions: Story = {
  args: {
    label: 'Categories',
    options: [
      { label: 'Category 1', value: '1' },
      { label: 'Category 2', value: '2' },
      { label: 'Category 3', value: '3' },
      { label: 'Category 4', value: '4' },
      { label: 'Category 5', value: '5' },
      { label: 'Category 6', value: '6' },
      { label: 'Category 7', value: '7' },
      { label: 'Category 8', value: '8' },
    ],
    selected: ['2', '5'],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <FilterMultiSelect {...args} selected={selected} onSelect={setSelected} />
        <div className="text-sm text-neutral-600">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </div>
      </div>
    )
  },
  args: {
    label: 'Status',
    options: statusOptions,
  },
}

export const MultipleFilters: Story = {
  render: () => {
    const [statusFilter, setStatusFilter] = useState<string[]>([])
    const [typeFilter, setTypeFilter] = useState<string[]>([])

    return (
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Filter Goals</h3>
        <div className="flex gap-2">
          <FilterMultiSelect
            label="Status"
            options={statusOptions}
            selected={statusFilter}
            onSelect={setStatusFilter}
          />
          <FilterMultiSelect
            label="Type"
            options={typeOptions}
            selected={typeFilter}
            onSelect={setTypeFilter}
          />
        </div>
        <div className="p-3 bg-neutral-100 rounded">
          <p className="text-sm font-semibold">Active Filters:</p>
          <p className="text-sm text-neutral-600 mt-1">
            Status: {statusFilter.length > 0 ? statusFilter.join(', ') : 'All'}
          </p>
          <p className="text-sm text-neutral-600">
            Type: {typeFilter.length > 0 ? typeFilter.join(', ') : 'All'}
          </p>
        </div>
      </div>
    )
  },
}
