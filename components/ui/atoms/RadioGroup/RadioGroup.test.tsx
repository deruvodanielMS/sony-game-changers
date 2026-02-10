import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  const defaultItems = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]

  it('renders all radio items', () => {
    render(<RadioGroup items={defaultItems} value="option1" onChange={vi.fn()} />)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('marks the selected item', () => {
    render(<RadioGroup items={defaultItems} value="option2" onChange={vi.fn()} />)

    const option2Radio = screen.getByRole('radio', { name: 'Option 2' })
    expect(option2Radio).toBeChecked()
  })

  it('calls onChange when clicking an item', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<RadioGroup items={defaultItems} value="option1" onChange={handleChange} />)

    const option2Label = screen.getByText('Option 2')
    await user.click(option2Label)

    expect(handleChange).toHaveBeenCalledWith('option2')
  })

  it('does not call onChange when clicking a disabled item', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    const itemsWithDisabled = [
      ...defaultItems,
      { id: 'option4', label: 'Option 4', disabled: true },
    ]

    render(<RadioGroup items={itemsWithDisabled} value="option1" onChange={handleChange} />)

    const option4Label = screen.getByText('Option 4')
    await user.click(option4Label)

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders with small size', () => {
    const { container } = render(
      <RadioGroup items={defaultItems} value="option1" onChange={vi.fn()} size="small" />,
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with large size', () => {
    const { container } = render(
      <RadioGroup items={defaultItems} value="option1" onChange={vi.fn()} size="large" />,
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with icons', () => {
    const itemsWithIcons = [
      { id: 'option1', label: 'Option 1', icon: <span>🔥</span> },
      { id: 'option2', label: 'Option 2', icon: <span>⭐</span> },
    ]

    render(<RadioGroup items={itemsWithIcons} value="option1" onChange={vi.fn()} />)

    expect(screen.getByText('🔥')).toBeInTheDocument()
    expect(screen.getByText('⭐')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup
        items={defaultItems}
        value="option1"
        onChange={vi.fn()}
        className="custom-class"
      />,
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies aria-label', () => {
    render(
      <RadioGroup
        items={defaultItems}
        value="option1"
        onChange={vi.fn()}
        ariaLabel="Custom label"
      />,
    )
    expect(screen.getByRole('radiogroup', { name: 'Custom label' })).toBeInTheDocument()
  })
})
