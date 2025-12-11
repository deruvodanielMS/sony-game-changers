// components/ui/atoms/SelectField/SelectField.test.tsx
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as SelectPrimitive from '@radix-ui/react-select'
import { vi } from 'vitest'

import { SelectField } from './SelectField'

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

describe('SelectField', () => {
  beforeAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    })
  })
  it('renders the root with data-testid', () => {
    render(
      <SelectField options={options} placeholder="Select an option" data-testid="select-field" />,
    )

    const root = screen.getByTestId('select-field')
    expect(root).toBeInTheDocument()
  })

  it('renders options from the options prop when opened', async () => {
    const user = userEvent.setup()

    render(
      <SelectField options={options} placeholder="Select an option" data-testid="select-field" />,
    )

    // Click on the placeholder text (inside the trigger)
    const triggerText = screen.getByText('Select an option')
    fireEvent.click(triggerText)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('calls onValueChange when an option is selected', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <SelectField
        options={options}
        placeholder="Select an option"
        data-testid="select-field"
        onValueChange={handleChange}
      />,
    )

    const triggerText = screen.getByText('Select an option')
    fireEvent.click(triggerText)

    const option2 = screen.getByText('Option 2')
    fireEvent.click(option2)

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith('option-2')
  })

  it('does not open options when disabled', async () => {
    const user = userEvent.setup()

    render(
      <SelectField
        options={options}
        disabled
        placeholder="Disabled"
        data-testid="select-field-disabled"
      />,
    )

    const triggerText = screen.getByText('Disabled')
    fireEvent.click(triggerText)

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
  })

  it('shows placeholder text when no value is selected', () => {
    render(<SelectField options={options} placeholder="Choose…" data-testid="select-field" />)

    // Use a regex to be robust against ellipsis variations
    expect(screen.getByText(/Choose/)).toBeInTheDocument()
  })

  it('supports basic keyboard navigation and selection', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <SelectField
        options={options}
        placeholder="Keyboard select"
        data-testid="select-field"
        onValueChange={handleChange}
      />,
    )

    const trigger = screen.getByTestId('select-field')

    // Open the select with a normal click
    fireEvent.click(trigger)

    // navigate and select with keyboard
    await user.keyboard('{ArrowDown}') // move to first option
    await user.keyboard('{Enter}') // select

    expect(handleChange).toHaveBeenCalled()
    const lastArg = handleChange.mock.calls.at(-1)?.[0]
    expect(typeof lastArg).toBe('string')
  })

  it('matches snapshot for closed state', () => {
    const { asFragment } = render(
      <SelectField options={options} placeholder="Snapshot" data-testid="select-field" />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot for open content', async () => {
    const user = userEvent.setup()

    const { asFragment } = render(
      <SelectField options={options} placeholder="Snapshot content" data-testid="select-field" />,
    )

    const triggerText = screen.getByText('Snapshot content')
    await fireEvent.click(triggerText)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders custom children when options are not provided', async () => {
    const user = userEvent.setup()

    render(
      <SelectField placeholder="Custom children" options={undefined} data-testid="select-field">
        <SelectPrimitive.Item
          value="custom-1"
          className="relative flex w-full cursor-default select-none items-center rounded-small px-2 py-2 text-sm outline-none focus:bg-gray-100"
        >
          <SelectPrimitive.ItemText>Custom A</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
        <SelectPrimitive.Item
          value="custom-2"
          className="relative flex w-full cursor-default select-none items-center rounded-small px-2 py-2 text-sm outline-none focus:bg-gray-100"
        >
          <SelectPrimitive.ItemText>Custom B</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
      </SelectField>,
    )

    const triggerText = screen.getByText('Custom children')

    await fireEvent.click(triggerText)

    expect(screen.getByText('Custom A')).toBeInTheDocument()
    expect(screen.getByText('Custom B')).toBeInTheDocument()
  })
})
