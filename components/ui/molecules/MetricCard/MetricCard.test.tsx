import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetricCard } from './MetricCard'

const mockIcon = (
  <svg data-testid="mock-icon" width="48" height="48" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="20" fill="currentColor" />
  </svg>
)

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="Completed" value={18} />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
  })

  it('renders with icon when provided', () => {
    render(<MetricCard label="Completed" value={18} icon={mockIcon} />)
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('renders without icon when not provided', () => {
    const { container } = render(<MetricCard label="Completed" value={18} />)
    const iconContainer = container.querySelector('[aria-hidden="true"]')
    expect(iconContainer).not.toBeInTheDocument()
  })

  it('accepts string values', () => {
    render(<MetricCard label="Status" value="Active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('accepts number values', () => {
    render(<MetricCard label="Count" value={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <MetricCard label="Completed" value={18} className="custom-class" />,
    )
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })

  it('applies data-test-id', () => {
    const { container } = render(
      <MetricCard label="Completed" value={18} data-test-id="metric-card" />,
    )
    expect(container.querySelector('[data-test-id="metric-card"]')).toBeInTheDocument()
  })

  it('applies correct typography classes to label', () => {
    render(<MetricCard label="Completed" value={18} />)
    const label = screen.getByText('Completed')
    expect(label).toHaveClass('text-body-small', 'text-neutral-500', 'leading-body-small')
  })

  it('applies correct typography classes to value', () => {
    render(<MetricCard label="Completed" value={18} />)
    const value = screen.getByText('18')
    expect(value).toHaveClass('text-h5', 'font-semibold', 'text-neutral-1000', 'leading-h5')
  })

  it('applies correct layout classes', () => {
    const { container } = render(<MetricCard label="Completed" value={18} />)
    const card = container.firstChild
    expect(card).toHaveClass(
      'flex',
      'items-center',
      'gap-0_75',
      'bg-neutral-100',
      'rounded-default',
      'px-0_75',
      'py-0_75',
      'h-4_5',
    )
  })

  it('icon container has correct size when icon provided', () => {
    const { container } = render(<MetricCard label="Completed" value={18} icon={mockIcon} />)
    const iconContainer = container.querySelector('[aria-hidden="true"]')
    expect(iconContainer).toHaveClass('w-3', 'h-3', 'shrink-0')
  })

  describe('snapshots', () => {
    it('matches snapshot without icon', () => {
      const { container } = render(<MetricCard label="Completed" value={18} />)
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot with icon', () => {
      const { container } = render(<MetricCard label="Completed" value={18} icon={mockIcon} />)
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot with string value', () => {
      const { container } = render(<MetricCard label="Status" value="Active" icon={mockIcon} />)
      expect(container).toMatchSnapshot()
    })
  })
})
