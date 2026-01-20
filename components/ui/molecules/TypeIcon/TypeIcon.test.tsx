import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Target } from 'lucide-react'
import { TypeIcon } from './TypeIcon'

describe('TypeIcon', () => {
  it('renders with business type', () => {
    render(<TypeIcon type="business" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-label', 'business ambition')
  })

  it('renders with manager-effectiveness type', () => {
    render(<TypeIcon type="manager-effectiveness" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveAttribute('aria-label', 'manager-effectiveness ambition')
  })

  it('renders with personal-growth-and-development type', () => {
    render(<TypeIcon type="personal-growth-and-development" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveAttribute('aria-label', 'personal-growth-and-development ambition')
  })

  it('applies metadata variant with correct size', () => {
    render(<TypeIcon type="business" variant="metadata" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('size-1.5')
    expect(icon).toHaveClass('bg-neutral-600')
  })

  it('applies badge variant by default', () => {
    render(<TypeIcon type="business" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('size-3')
    expect(icon).toHaveClass('bg-neutral-100')
  })

  it('applies badge variant explicitly', () => {
    render(<TypeIcon type="business" variant="badge" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('size-3')
    expect(icon).toHaveClass('bg-neutral-100')
  })

  it('renders correct icon for business type', () => {
    const { container } = render(<TypeIcon type="business" data-test-id="type-icon" />)

    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('renders with solid background colors instead of gradients', () => {
    render(<TypeIcon type="business" data-test-id="type-icon" />)

    const iconElement = screen.getByTestId('type-icon')
    expect(iconElement).toHaveClass('bg-neutral-100')
    // Should not have inline background-image style (gradients removed)
    expect(iconElement).not.toHaveAttribute('style', expect.stringContaining('background'))
  })

  it('applies custom className', () => {
    render(<TypeIcon type="business" className="custom-class" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('custom-class')
  })

  it('renders custom icon', () => {
    render(<TypeIcon type="business" icon={Target} data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toBeInTheDocument()
  })

  it('has correct accessibility role', () => {
    render(<TypeIcon type="business" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveAttribute('role', 'img')
  })
})
