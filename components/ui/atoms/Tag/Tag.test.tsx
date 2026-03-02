import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders the label text', () => {
    render(<Tag label="Design System" />)
    expect(screen.getByText('Design System')).toBeInTheDocument()
  })

  it('does not render × button when onRemove is omitted', () => {
    render(<Tag label="No Remove" />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('renders × button when onRemove is provided', () => {
    render(<Tag label="With Remove" onRemove={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onRemove when × button is clicked', async () => {
    const handleRemove = vi.fn()
    const user = userEvent.setup()

    render(<Tag label="Removable" onRemove={handleRemove} />)
    await user.click(screen.getByRole('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('applies outlined variant class by default', () => {
    render(<Tag label="Outlined" data-test-id="tag" />)
    const tag = screen.getByTestId('tag')
    expect(tag).toHaveClass('border')
    expect(tag).toHaveClass('border-neutral-1000')
    expect(tag).toHaveClass('bg-neutral-0')
  })

  it('applies filled variant class when variant="filled"', () => {
    render(<Tag label="Filled" variant="filled" data-test-id="tag" />)
    const tag = screen.getByTestId('tag')
    expect(tag).toHaveClass('bg-neutral-1000')
  })

  it('merges custom className', () => {
    render(<Tag label="Custom" className="my-custom-class" data-test-id="tag" />)
    const tag = screen.getByTestId('tag')
    expect(tag).toHaveClass('my-custom-class')
    // default variant still applies
    expect(tag).toHaveClass('border-neutral-1000')
  })

  it('uses removeAriaLabel when provided', () => {
    render(<Tag label="Item" onRemove={() => {}} removeAriaLabel="Delete Item" />)
    expect(screen.getByRole('button', { name: 'Delete Item' })).toBeInTheDocument()
  })

  it('remove button aria-label is required for accessibility (type-enforced)', () => {
    // removeAriaLabel is required by TagProps when onRemove is set (discriminated union)
    // This ensures all remove buttons are localized at the call site
    render(<Tag label="Item" onRemove={() => {}} removeAriaLabel="Retirer Item" />)
    expect(screen.getByRole('button', { name: 'Retirer Item' })).toBeInTheDocument()
  })

  it('applies data-test-id as data-testid', () => {
    render(<Tag label="Test" data-test-id="tag-id" />)
    expect(screen.getByTestId('tag-id')).toBeInTheDocument()
  })

  it('applies sm size classes', () => {
    render(<Tag label="Small" size="sm" data-test-id="tag" />)
    const tag = screen.getByTestId('tag')
    expect(tag).toHaveClass('px-0_5')
    expect(tag).toHaveClass('py-0_25')
    expect(tag).toHaveClass('text-body-small')
  })

  it('applies md size classes', () => {
    render(<Tag label="Medium" size="md" data-test-id="tag" />)
    const tag = screen.getByTestId('tag')
    expect(tag).toHaveClass('px-0_5')
    expect(tag).toHaveClass('py-0_5')
    expect(tag).toHaveClass('text-body')
  })
})
