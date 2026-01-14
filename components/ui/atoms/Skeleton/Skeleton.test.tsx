import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton.tagName).toBe('DIV')
    })

    it('has aria-hidden attribute', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Variant Styles', () => {
    it('renders text variant correctly (default)', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('h-skeleton-body', 'rounded-tiny')
    })

    it('renders title variant correctly', () => {
      render(<Skeleton variant="h1" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('h-skeleton-h1', 'rounded-tiny')
    })

    it('renders heading variant correctly', () => {
      render(<Skeleton variant="h2" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('h-skeleton-h2', 'rounded-tiny')
    })

    it('renders circular variant correctly', () => {
      render(<Skeleton variant="circular" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-full')
    })

    it('renders rectangular variant correctly', () => {
      render(<Skeleton variant="rectangular" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-small')
    })

    it('renders avatar variant correctly', () => {
      render(<Skeleton variant="avatar" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-full', 'aspect-square')
    })

    it('renders button variant correctly', () => {
      render(<Skeleton variant="button" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('h-skeleton-button', 'rounded-small')
    })
  })

  describe('Animation', () => {
    it('has pulse animation class', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('animate-pulse')
    })

    it('has gradient background classes', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass(
        'bg-gradient-to-r',
        'from-neutral-200',
        'via-neutral-300',
        'to-neutral-200',
      )
    })
  })

  describe('Custom Dimensions', () => {
    it('applies custom width via style prop', () => {
      render(<Skeleton width="200px" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({ width: '200px' })
    })

    it('applies custom height via style prop', () => {
      render(<Skeleton height="100px" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({ height: '100px' })
    })

    it('applies both width and height via style props', () => {
      render(<Skeleton width="200px" height="100px" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({ width: '200px', height: '100px' })
    })
  })

  describe('Custom className', () => {
    it('applies custom className alongside default classes', () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('custom-class', 'animate-pulse', 'h-skeleton-body')
    })
  })

  describe('Accessibility', () => {
    it('is hidden from screen readers', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
