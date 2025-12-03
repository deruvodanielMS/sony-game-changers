import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ProgressRing } from './ProgressRing'

describe('ProgressRing', () => {
  it('renders with default props', () => {
    const { container } = render(<ProgressRing progress={50} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies correct size', () => {
    const { container } = render(<ProgressRing progress={50} size={64} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '64')
    expect(svg).toHaveAttribute('height', '64')
  })

  it('normalizes progress above 100 to 100', () => {
    const { container } = render(<ProgressRing progress={150} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('normalizes progress below 0 to 0', () => {
    const { container } = render(<ProgressRing progress={-10} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ProgressRing progress={50} className="custom-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
  })

  it('applies data-test-id', () => {
    const { container } = render(<ProgressRing progress={50} data-test-id="progress-ring" />)
    const svg = container.querySelector('[data-test-id="progress-ring"]')
    expect(svg).toBeInTheDocument()
  })

  it('renders two circles (background and progress)', () => {
    const { container } = render(<ProgressRing progress={50} />)
    const circles = container.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
  })

  it('applies gradient to progress circle', () => {
    const { container } = render(<ProgressRing progress={50} />)
    const linearGradient = container.querySelector('linearGradient')
    expect(linearGradient).toBeInTheDocument()
  })

  it('gradient uses correct colors from theme', () => {
    const { container } = render(<ProgressRing progress={50} />)
    const stops = container.querySelectorAll('stop')
    expect(stops).toHaveLength(2)
    expect(stops[0]).toHaveAttribute('offset', '0%')
    expect(stops[1]).toHaveAttribute('offset', '100%')
  })

  it('applies rotate-[-90deg] class for correct start position', () => {
    const { container } = render(<ProgressRing progress={50} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('rotate-[-90deg]')
  })

  describe('snapshots', () => {
    it('matches snapshot at 0% progress', () => {
      const { container } = render(<ProgressRing progress={0} />)
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot at 50% progress', () => {
      const { container } = render(<ProgressRing progress={50} />)
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot at 100% progress', () => {
      const { container } = render(<ProgressRing progress={100} />)
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot with custom size and strokeWidth', () => {
      const { container } = render(<ProgressRing progress={75} size={64} strokeWidth={8} />)
      expect(container).toMatchSnapshot()
    })
  })
})
