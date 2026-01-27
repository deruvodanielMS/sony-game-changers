import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from './SearchField'
import { useState } from 'react'

const meta: Meta<typeof SearchField> = {
  title: 'Molecules/SearchField',
  component: SearchField,
  args: {
    placeholder: 'Search...',
  },
  argTypes: {
    debounce: {
      control: { type: 'number' },
      description: 'Debounce delay in ms',
    },
    buttonSearch: {
      control: { type: 'boolean' },
      description: 'If true, enables manual search button',
    },
  },
}

export default meta

type Story = StoryObj<typeof SearchField>

export const Default: Story = {
  args: {
    onChange: (value: string) => console.log('Search value:', value),
  },
}

export const WithDebounce: Story = {
  render: () => {
    const [actualSearchValue, setActualSearchValue] = useState('')
    return (
      <>
        <SearchField
          placeholder="Type to search with debounce..."
          debounce={2000}
          onChange={(value) => setActualSearchValue(value)}
        />
        <p className="mt-2">Search value (after 2000 ms): {actualSearchValue}</p>
      </>
    )
  },
}

export const WithSearchButton: Story = {
  render: () => {
    const [actualSearchValue, setActualSearchValue] = useState('')
    return (
      <>
        <SearchField
          buttonSearch
          placeholder="Click to search..."
          onChange={(value) => setActualSearchValue(value)}
        />
        <p className="mt-2">Search value: {actualSearchValue}</p>
      </>
    )
  },
}

export const Prefilled: Story = {
  render: () => {
    const [actualSearchValue, setActualSearchValue] = useState('')
    return (
      <>
        <SearchField
          placeholder="Type to search with debounce..."
          defaultValue="Initial Value"
          onChange={(value) => setActualSearchValue(value)}
        />
        <p className="mt-2">Search value: {actualSearchValue}</p>
      </>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search disabled...',
    onChange: (value: string) => console.log('Search value:', value),
  },
}
