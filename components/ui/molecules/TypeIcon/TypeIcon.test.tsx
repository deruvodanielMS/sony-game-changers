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

  it('applies small size', () => {
    render(<TypeIcon type="business" size="sm" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('size-2')
  })

  it('applies medium size by default', () => {
    render(<TypeIcon type="business" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('size-3')
  })

  it('applies large size', () => {
    render(<TypeIcon type="business" size="lg" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveClass('size-4')
  })

  it('applies custom gradient', () => {
    render(<TypeIcon type="business" gradient={['#ff0000', '#00ff00']} data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveStyle({
      backgroundImage: 'linear-gradient(to left, #ff0000, #00ff00)',
    })
  })

  it('applies default gradient', () => {
    render(<TypeIcon type="business" data-test-id="type-icon" />)

    const icon = screen.getByTestId('type-icon')
    expect(icon).toHaveStyle({
      backgroundImage: 'linear-gradient(to left, #5577f4, #d061ff)',
    })
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
