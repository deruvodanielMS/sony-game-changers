import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FilterMultiSelect } from './FilterMultiSelect'

const mockOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

describe('FilterMultiSelect', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      render(<FilterMultiSelect label="Filter" options={mockOptions} onSelect={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Filter' })).toBeDefined()
    })

    it('shows "All" when no selection', () => {
      render(<FilterMultiSelect label="Filter" options={mockOptions} onSelect={vi.fn()} />)
      expect(screen.getByText('All')).toBeDefined()
    })

    it('shows selected option label when one is selected', () => {
      render(
        <FilterMultiSelect
          label="Filter"
          options={mockOptions}
          onSelect={vi.fn()}
          selected={['opt1']}
        />,
      )
      expect(screen.getByText('Option 1')).toBeDefined()
    })

    it('shows count when multiple options are selected', () => {
      render(
        <FilterMultiSelect
          label="Filter"
          options={mockOptions}
          onSelect={vi.fn()}
          selected={['opt1', 'opt2']}
        />,
      )
      expect(screen.getByText('(2)')).toBeDefined()
    })
  })

  describe('Interactions', () => {
    it('opens dropdown when clicked', () => {
      render(<FilterMultiSelect label="Filter" options={mockOptions} onSelect={vi.fn()} />)
      fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
      expect(screen.getByRole('list')).toBeDefined()
    })

    it('calls onSelect when option is clicked', () => {
      const onSelect = vi.fn()
      render(<FilterMultiSelect label="Filter" options={mockOptions} onSelect={onSelect} />)
      fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
      fireEvent.click(screen.getByText('Option 1'))
      expect(onSelect).toHaveBeenCalledWith(['opt1'])
    })

    it('removes option from selection when already selected', () => {
      const onSelect = vi.fn()
      render(
        <FilterMultiSelect
          label="Filter"
          options={mockOptions}
          onSelect={onSelect}
          selected={['opt1']}
        />,
      )
      fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
      // Use getAllByText and click the one in the list (second element)
      const option1Elements = screen.getAllByText('Option 1')
      fireEvent.click(option1Elements[1]) // Click the list item, not the button label
      expect(onSelect).toHaveBeenCalledWith([])
    })
  })

  describe('Single mode', () => {
    it('replaces selection in single mode', () => {
      const onSelect = vi.fn()
      render(
        <FilterMultiSelect
          label="Filter"
          options={mockOptions}
          onSelect={onSelect}
          selected={['opt1']}
          single
        />,
      )
      fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
      fireEvent.click(screen.getByText('Option 2'))
      expect(onSelect).toHaveBeenCalledWith(['opt2'])
    })
  })
})
