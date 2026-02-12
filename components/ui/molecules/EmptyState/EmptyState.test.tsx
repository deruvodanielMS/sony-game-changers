import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Plus } from 'lucide-react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders title correctly', () => {
    render(<EmptyState title="No items found" />)

    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <EmptyState
        title="No items found"
        description="Try adjusting your filters or search terms"
      />,
    )

    expect(screen.getByText('No items found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters or search terms')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<EmptyState title="No items found" />)

    expect(screen.queryByText('Try adjusting your filters')).not.toBeInTheDocument()
  })

  it('renders action button when actionLabel and onAction are provided', () => {
    const onAction = vi.fn()
    render(<EmptyState title="No items found" actionLabel="Create new item" onAction={onAction} />)

    expect(screen.getByRole('button', { name: 'Create new item' })).toBeInTheDocument()
  })

  it('does not render action button when actionLabel is missing', () => {
    const onAction = vi.fn()
    render(<EmptyState title="No items found" onAction={onAction} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('does not render action button when onAction is missing', () => {
    render(<EmptyState title="No items found" actionLabel="Create new item" />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<EmptyState title="No items found" actionLabel="Create new item" onAction={onAction} />)

    await user.click(screen.getByRole('button', { name: 'Create new item' }))

    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<EmptyState title="No items found" className="custom-class" data-testid="empty-state" />)

    expect(screen.getByTestId('empty-state')).toHaveClass('custom-class')
  })

  it('renders action button with icon when actionIcon is provided', () => {
    const onAction = vi.fn()
    render(
      <EmptyState
        title="No items found"
        actionLabel="Create new item"
        actionIcon={<Plus data-testid="action-icon" />}
        onAction={onAction}
      />,
    )

    expect(screen.getByRole('button', { name: 'Create new item' })).toBeInTheDocument()
    expect(screen.getByTestId('action-icon')).toBeInTheDocument()
  })

  it('has border and rounded styling', () => {
    render(<EmptyState title="No items found" data-testid="empty-state" />)

    const element = screen.getByTestId('empty-state')
    expect(element).toHaveClass('border')
    expect(element).toHaveClass('border-neutral-300')
    expect(element).toHaveClass('rounded-small')
  })

  it('renders with data-testid', () => {
    render(<EmptyState title="No items found" data-testid="empty-state" />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })
})
