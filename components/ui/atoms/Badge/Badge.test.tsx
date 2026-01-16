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
    expect(badge).toHaveClass('bg-neutral-200', 'text-neutral-800')
    expect(badge).toHaveClass('px-0.5', 'py-0.125')
  })

  it('applies success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-feedback-success-100', 'text-feedback-success-600')
  })

  it('applies warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-feedback-warning-100', 'text-feedback-warning-600')
  })

  it('applies error variant', () => {
    render(<Badge variant="error">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-feedback-error-100', 'text-feedback-error-600')
  })

  it('applies info variant', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-extra-blue-100', 'text-extra-blue-600')
  })

  it('applies primary variant', () => {
    render(<Badge variant="primary">Primary</Badge>)
    const badge = screen.getByText('Primary')
    expect(badge).toHaveClass('bg-extra-pink-100', 'text-extra-pink-600')
  })

  it('applies secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText('Secondary')
    expect(badge).toHaveClass('bg-extra-green-100', 'text-extra-green-600')
  })

  it('applies small size', () => {
    render(<Badge size="sm">Small</Badge>)
    const badge = screen.getByText('Small')
    expect(badge).toHaveClass('px-0.375', 'py-0.0625', 'text-xs')
  })

  it('applies medium size', () => {
    render(<Badge size="md">Medium</Badge>)
    const badge = screen.getByText('Medium')
    expect(badge).toHaveClass('px-0.5', 'py-0.125', 'text-sm')
  })

  it('applies large size', () => {
    render(<Badge size="lg">Large</Badge>)
    const badge = screen.getByText('Large')
    expect(badge).toHaveClass('px-0.75', 'py-0.25', 'text-base')
  })

  it('merges custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-class')
    expect(badge).toHaveClass('bg-neutral-200') // default variant still applies
  })

  it('applies data-test-id attribute', () => {
    render(<Badge data-test-id="custom-badge">Test</Badge>)
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument()
  })
})
