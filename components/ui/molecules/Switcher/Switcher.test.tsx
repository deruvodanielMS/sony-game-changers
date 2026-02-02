import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switcher } from './Switcher'
import { RadarIcon } from '@/components/ui/foundations/Icons'

describe('Switcher', () => {
  const defaultItems = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ]

  it('renders all items', () => {
    render(<Switcher items={defaultItems} value="option1" onChange={vi.fn()} />)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('marks the selected item as active', () => {
    render(<Switcher items={defaultItems} value="option2" onChange={vi.fn()} />)

    const option2 = screen.getByRole('tab', { name: 'Option 2' })
    expect(option2).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onChange when clicking an item', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Switcher items={defaultItems} value="option1" onChange={handleChange} />)

    await user.click(screen.getByText('Option 2'))

    expect(handleChange).toHaveBeenCalledWith('option2')
  })

  it('does not call onChange when clicking disabled item', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const itemsWithDisabled = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2', disabled: true },
      { id: 'option3', label: 'Option 3' },
    ]

    render(<Switcher items={itemsWithDisabled} value="option1" onChange={handleChange} />)

    await user.click(screen.getByText('Option 2'))

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders with small size', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} size="small" />,
    )

    expect(container.firstChild).toHaveClass('h-3')
  })

  it('renders with large size', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} size="large" />,
    )

    expect(container.firstChild).toHaveClass('p-0_5')
  })

  it('applies generic variant styles', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} variant="generic" />,
    )

    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--neutral-100)' })
  })

  it('applies success variant styles', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} variant="success" />,
    )

    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--neutral-100)' })
  })

  it('applies info variant styles', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} variant="info" />,
    )

    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--neutral-100)' })
  })

  it('applies danger variant styles', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} variant="danger" />,
    )

    expect(container.firstChild).toHaveStyle({ backgroundColor: 'var(--neutral-100)' })
  })

  it('renders items with icons', () => {
    const itemsWithIcons = [
      { id: 'option1', label: 'Option 1', icon: <RadarIcon data-testid="icon-1" /> },
      { id: 'option2', label: 'Option 2', icon: <RadarIcon data-testid="icon-2" /> },
    ]

    render(<Switcher items={itemsWithIcons} value="option1" onChange={vi.fn()} />)

    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
  })

  it('renders items with icons only (no labels)', () => {
    const iconOnlyItems = [
      { id: 'option1', icon: <RadarIcon data-testid="icon-1" /> },
      { id: 'option2', icon: <RadarIcon data-testid="icon-2" /> },
    ]

    render(<Switcher items={iconOnlyItems} value="option1" onChange={vi.fn()} />)

    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} className="custom-class" />,
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('sets aria-label on the tablist', () => {
    render(
      <Switcher items={defaultItems} value="option1" onChange={vi.fn()} ariaLabel="Custom label" />,
    )

    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Custom label')
  })

  it('disables button when item is disabled', () => {
    const itemsWithDisabled = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2', disabled: true },
    ]

    render(<Switcher items={itemsWithDisabled} value="option1" onChange={vi.fn()} />)

    const option2Button = screen.getByRole('tab', { name: 'Option 2' })
    expect(option2Button).toBeDisabled()
    expect(option2Button).toHaveAttribute('aria-disabled', 'true')
  })

  it('applies cursor-pointer to enabled items', () => {
    render(<Switcher items={defaultItems} value="option1" onChange={vi.fn()} />)

    const option2Button = screen.getByRole('tab', { name: 'Option 2' })
    expect(option2Button).toHaveClass('cursor-pointer')
  })

  it('applies cursor-not-allowed to disabled items', () => {
    const itemsWithDisabled = [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2', disabled: true },
    ]

    render(<Switcher items={itemsWithDisabled} value="option1" onChange={vi.fn()} />)

    const option2Button = screen.getByRole('tab', { name: 'Option 2' })
    expect(option2Button).toHaveClass('cursor-not-allowed')
  })
})
