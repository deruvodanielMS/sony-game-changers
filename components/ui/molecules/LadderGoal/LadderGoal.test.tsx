import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LadderGoal } from './LadderGoal'

describe('LadderGoal', () => {
  it('renders with text', () => {
    render(<LadderGoal text="Parent Ambition Goal" />)
    expect(screen.getByText('Parent Ambition Goal')).toBeInTheDocument()
  })

  it('renders as div when no onClick is provided', () => {
    const { container } = render(<LadderGoal text="Test Goal" />)
    const element = container.querySelector('div[class*="flex"]')
    expect(element).toBeInTheDocument()
    expect(element?.tagName).toBe('DIV')
  })

  it('renders as button when onClick is provided', () => {
    const handleClick = vi.fn()
    render(<LadderGoal text="Test Goal" onClick={handleClick} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<LadderGoal text="Test Goal" onClick={handleClick} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('truncates long text with ellipsis', () => {
    const longText = 'This is a very long goal description that should be truncated with ellipsis'
    const { container } = render(<LadderGoal text={longText} />)
    const textElement = container.querySelector('span')
    expect(textElement).toHaveClass('line-clamp-1')
    expect(textElement).toHaveClass('text-ellipsis')
  })

  it('applies custom className', () => {
    const { container } = render(<LadderGoal text="Test Goal" className="custom-class" />)
    const element = container.querySelector('.custom-class')
    expect(element).toBeInTheDocument()
  })

  it('has correct icon with proper styling', () => {
    const { container } = render(<LadderGoal text="Test Goal" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('size-1.5')
    expect(icon).toHaveClass('text-neutral-1000')
  })

  it('has aria-hidden on icon', () => {
    const { container } = render(<LadderGoal text="Test Goal" />)
    const icon = container.querySelector('svg')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies transition-opacity when clickable', () => {
    const handleClick = vi.fn()
    const { container } = render(<LadderGoal text="Test Goal" onClick={handleClick} />)
    const button = container.querySelector('button')
    expect(button).toHaveClass('transition-opacity')
    expect(button).toHaveClass('cursor-pointer')
  })

  it('does not apply cursor-pointer when not clickable', () => {
    const { container } = render(<LadderGoal text="Test Goal" />)
    const div = container.querySelector('div[class*="flex"]')
    expect(div).not.toHaveClass('cursor-pointer')
  })
})
