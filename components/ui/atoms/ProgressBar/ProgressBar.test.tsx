import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders with default props', () => {
    render(<ProgressBar progress={50} data-test-id="progress-bar" />)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  it('displays percentage text by default', () => {
    render(<ProgressBar progress={75} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('hides percentage text when showPercentage is false', () => {
    render(<ProgressBar progress={75} showPercentage={false} />)
    expect(screen.queryByText('75%')).not.toBeInTheDocument()
  })

  it('clamps progress value between 0 and 100', () => {
    const { rerender } = render(<ProgressBar progress={150} data-test-id="progress-bar" />)
    expect(screen.getByTestId('progress-bar')).toHaveAttribute('aria-valuenow', '100')

    rerender(<ProgressBar progress={-10} data-test-id="progress-bar" />)
    expect(screen.getByTestId('progress-bar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('applies L size variant', () => {
    render(<ProgressBar progress={50} size="L" data-test-id="progress-bar" />)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveClass('h-progress-bar-lg')
  })

  it('applies S size variant', () => {
    render(<ProgressBar progress={50} size="S" data-test-id="progress-bar" />)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar).toHaveClass('h-progress-bar-sm')
  })

  it('applies in-progress status styling', () => {
    render(<ProgressBar progress={50} status="in-progress" />)
    const percentage = screen.getByText('50%')
    expect(percentage).toHaveClass('text-feedback-info-500')
  })

  it('applies completed status styling', () => {
    render(<ProgressBar progress={100} status="completed" />)
    const percentage = screen.getByText('100%')
    expect(percentage).toHaveClass('text-feedback-success-950')
  })

  it('rounds decimal progress values', () => {
    render(<ProgressBar progress={67.8} />)
    expect(screen.getByText('68%')).toBeInTheDocument()
  })

  it('handles 0% progress', () => {
    render(<ProgressBar progress={0} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('handles 100% progress', () => {
    render(<ProgressBar progress={100} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<ProgressBar progress={50} className="custom-class" data-test-id="progress-bar" />)
    expect(screen.getByTestId('progress-bar')).toHaveClass('custom-class')
  })

  it('has proper accessibility attributes', () => {
    render(<ProgressBar progress={75} data-test-id="progress-bar" />)
    const progressBar = screen.getByTestId('progress-bar')

    expect(progressBar).toHaveAttribute('role', 'progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-label', 'Progress: 75%')
  })
})
