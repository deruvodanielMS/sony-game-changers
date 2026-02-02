import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('applies default variant and size', () => {
    render(<Badge data-test-id="badge">Default</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('text-neutral-500')
    expect(badge).toHaveClass('px-0_5', 'py-0_125')
  })

  it('applies success variant (no background, only text color)', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('text-feedback-success-500')
    expect(badge).not.toHaveClass('bg-feedback-success-100')
  })

  it('applies warning variant (no background)', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('text-feedback-warning-500')
    expect(badge).not.toHaveClass('bg-feedback-warning-100')
  })

  it('applies error variant (no background)', () => {
    render(<Badge variant="error">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('text-feedback-error-500')
    expect(badge).not.toHaveClass('bg-feedback-error-100')
  })

  it('applies info variant (no background)', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('text-feedback-info-500')
    expect(badge).not.toHaveClass('bg-extra-blue-100')
  })

  it('applies primary variant (no background)', () => {
    render(<Badge variant="primary">Primary</Badge>)
    const badge = screen.getByText('Primary')
    expect(badge).toHaveClass('text-extra-pink-500')
    expect(badge).not.toHaveClass('bg-extra-pink-100')
  })

  it('applies secondary variant (no background)', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText('Secondary')
    expect(badge).toHaveClass('text-feedback-success-500')
    expect(badge).not.toHaveClass('bg-extra-green-100')
  })

  it('applies small size', () => {
    render(<Badge size="sm">Small</Badge>)
    const badge = screen.getByText('Small')
    expect(badge).toHaveClass(
      'text-[length:var(--font-size-body-small)]',
      'leading-[var(--line-height-body-small)]',
    )
  })

  it('applies medium size', () => {
    render(<Badge size="md">Medium</Badge>)
    const badge = screen.getByText('Medium')
    expect(badge).toHaveClass(
      'text-[length:var(--font-size-body)]',
      'leading-[var(--line-height-body)]',
    )
  })

  it('applies large size', () => {
    render(<Badge size="lg">Large</Badge>)
    const badge = screen.getByText('Large')
    expect(badge).toHaveClass(
      'text-[length:var(--font-size-h6)]',
      'leading-[var(--line-height-h6)]',
    )
  })

  it('merges custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-class')
    expect(badge).toHaveClass('text-neutral-500') // default variant still applies
  })

  it('applies data-test-id attribute', () => {
    render(<Badge data-test-id="custom-badge">Test</Badge>)
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument()
  })
})
