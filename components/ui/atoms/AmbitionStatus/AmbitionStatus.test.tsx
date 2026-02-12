import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AmbitionStatus } from './AmbitionStatus'

describe('AmbitionStatus', () => {
  it('renders children correctly', () => {
    render(<AmbitionStatus>Test Status</AmbitionStatus>)
    expect(screen.getByText('Test Status')).toBeInTheDocument()
  })

  it('applies default variant and size', () => {
    render(<AmbitionStatus data-test-id="status">Default</AmbitionStatus>)
    const status = screen.getByTestId('status')
    expect(status).toHaveClass('text-neutral-500')
  })

  it('applies draft variant with warning color', () => {
    render(<AmbitionStatus variant="draft">Draft</AmbitionStatus>)
    const status = screen.getByText('Draft')
    expect(status).toHaveClass('text-feedback-warning-500')
  })

  it('applies awaiting-approval variant with pink color', () => {
    render(<AmbitionStatus variant="awaiting-approval">Awaiting Approval</AmbitionStatus>)
    const status = screen.getByText('Awaiting Approval')
    expect(status).toHaveClass('text-extra-pink-500')
  })

  it('applies in-progress variant with info color', () => {
    render(<AmbitionStatus variant="in-progress">In Progress</AmbitionStatus>)
    const status = screen.getByText('In Progress')
    expect(status).toHaveClass('text-feedback-info-500')
  })

  it('applies done variant with success color', () => {
    render(<AmbitionStatus variant="done">Done</AmbitionStatus>)
    const status = screen.getByText('Done')
    expect(status).toHaveClass('text-feedback-success-500')
  })

  it('applies archived variant with neutral color', () => {
    render(<AmbitionStatus variant="archived">Archived</AmbitionStatus>)
    const status = screen.getByText('Archived')
    expect(status).toHaveClass('text-neutral-500')
  })

  it('applies small size', () => {
    render(<AmbitionStatus size="sm">Small</AmbitionStatus>)
    const status = screen.getByText('Small')
    expect(status).toHaveClass(
      'text-[length:var(--font-size-body-small)]',
      'leading-[var(--line-height-body-small)]',
    )
  })

  it('applies medium size', () => {
    render(<AmbitionStatus size="md">Medium</AmbitionStatus>)
    const status = screen.getByText('Medium')
    expect(status).toHaveClass(
      'text-[length:var(--font-size-body)]',
      'leading-[var(--line-height-body)]',
    )
  })

  it('merges custom className', () => {
    render(<AmbitionStatus className="custom-class">Custom</AmbitionStatus>)
    const status = screen.getByText('Custom')
    expect(status).toHaveClass('custom-class')
    expect(status).toHaveClass('text-neutral-500') // default variant still applies
  })

  it('applies data-test-id attribute', () => {
    render(<AmbitionStatus data-test-id="custom-status">Test</AmbitionStatus>)
    expect(screen.getByTestId('custom-status')).toBeInTheDocument()
  })
})
