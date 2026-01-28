import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('renders checked when checked prop is true', () => {
    render(<Checkbox checked={true} aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('renders checked when defaultChecked is true', () => {
    render(<Checkbox defaultChecked aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('calls onCheckedChange when clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Checkbox onCheckedChange={handleChange} aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('toggles between checked and unchecked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Checkbox onCheckedChange={handleChange} aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true)

    await user.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('does not call onCheckedChange when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Checkbox disabled onCheckedChange={handleChange} aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies disabled styles when disabled', () => {
    render(<Checkbox disabled data-test-id="checkbox" aria-label="Test checkbox" />)
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('applies sm size', () => {
    render(<Checkbox size="sm" data-test-id="checkbox" aria-label="Test checkbox" />)
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('size-1')
  })

  it('applies md size', () => {
    render(<Checkbox size="md" data-test-id="checkbox" aria-label="Test checkbox" />)
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('size-1_5')
  })

  it('applies lg size', () => {
    render(<Checkbox size="lg" data-test-id="checkbox" aria-label="Test checkbox" />)
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('size-2')
  })

  it('merges custom className', () => {
    render(<Checkbox className="custom-class" data-test-id="checkbox" aria-label="Test checkbox" />)
    const checkbox = screen.getByTestId('checkbox')
    expect(checkbox).toHaveClass('custom-class')
  })

  it('applies aria-label', () => {
    render(<Checkbox aria-label="Accept terms" />)
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    expect(checkbox).toBeInTheDocument()
  })

  it('applies data-test-id attribute', () => {
    render(<Checkbox data-test-id="custom-checkbox" aria-label="Test checkbox" />)
    expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument()
  })

  it('supports required attribute', () => {
    render(<Checkbox required aria-label="Test checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-required', 'true')
  })
})
