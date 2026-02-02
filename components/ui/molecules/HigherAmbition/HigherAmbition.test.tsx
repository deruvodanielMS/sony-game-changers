import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HigherAmbition } from './HigherAmbition'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('HigherAmbition', () => {
  it('renders with text', () => {
    render(<HigherAmbition text="Parent Goal Ambition" goalType="business" />)
    expect(screen.getByText('Parent Goal Ambition')).toBeInTheDocument()
  })

  it('renders as div when no onClick is provided', () => {
    const { container } = render(<HigherAmbition text="Test Goal" />)
    const element = container.querySelector('div[class*="flex"]')
    expect(element).toBeInTheDocument()
    expect(element?.tagName).toBe('DIV')
  })

  it('renders as button when onClick is provided', () => {
    const handleClick = vi.fn()
    render(<HigherAmbition text="Test Goal" onClick={handleClick} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<HigherAmbition text="Test Goal" onClick={handleClick} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(<HigherAmbition text="Test Goal" className="custom-class" />)
    const element = container.querySelector('.custom-class')
    expect(element).toBeInTheDocument()
  })

  it('has correct default styles', () => {
    const { container } = render(<HigherAmbition text="Test Goal" />)
    const element = container.querySelector('div[class*="flex"]')
    expect(element).toHaveClass('flex', 'items-center', 'gap-1', 'h-2')
  })

  it('renders icon with info-500 border', () => {
    const { container } = render(<HigherAmbition text="Test Goal" />)
    const iconContainer = container.querySelector('div[class*="border-feedback-info-500"]')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('border-2', 'border-feedback-info-500')
  })

  it('truncates long text with ellipsis', () => {
    const longText = 'This is a very long text that should be truncated with ellipsis'
    const { container } = render(<HigherAmbition text={longText} />)
    const textElement = container.querySelector('span')
    expect(textElement).toHaveClass('overflow-hidden', 'text-ellipsis', 'whitespace-nowrap')
  })

  it('has correct text color', () => {
    const { container } = render(<HigherAmbition text="Test Goal" />)
    const textElement = container.querySelector('span')
    expect(textElement).toHaveClass('text-neutral-600')
  })

  it('renders type icon', () => {
    const { container } = render(<HigherAmbition text="Test Goal" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
