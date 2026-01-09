import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  describe('Rendering', () => {
    it('renders spinner element', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
      expect(spinner.tagName).toBe('svg')
    })

    it('has aria-hidden attribute', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })

    it('renders with correct SVG structure', () => {
      const { container } = render(<Spinner />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      const circles = svg?.querySelectorAll('circle')
      expect(circles?.length).toBe(2) // Background circle + progress circle
    })
  })

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      render(<Spinner size="small" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-[var(--spinner-small)]', 'h-[var(--spinner-small)]')
    })

    it('renders medium size correctly (default)', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-[var(--spinner-medium)]', 'h-[var(--spinner-medium)]')
    })

    it('renders large size correctly', () => {
      render(<Spinner size="large" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('w-[var(--spinner-large)]', 'h-[var(--spinner-large)]')
    })
  })

  describe('Gradient', () => {
    it('renders with gradient', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      const gradient = spinner.querySelector('linearGradient')
      expect(gradient).toBeInTheDocument()
    })

    it('gradient uses correct color stops', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      const stops = spinner.querySelectorAll('stop')
      expect(stops?.length).toBe(2)
    })
  })

  describe('Animation', () => {
    it('has spinner-dash animation on circle element', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      const circles = spinner.querySelectorAll('circle')
      const animatedCircle = circles[1] // Second circle has the animation
      const style = animatedCircle?.getAttribute('style')
      expect(style).toContain('spinner-dash')
      expect(style).toContain('var(--spinner-duration)')
    })
  })

  describe('Custom className', () => {
    it('applies custom className alongside default classes', () => {
      render(<Spinner className="custom-class" data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveClass('custom-class')
      // Verify it has the size classes
      expect(spinner).toHaveClass('w-[var(--spinner-medium)]', 'h-[var(--spinner-medium)]')
    })
  })

  describe('Accessibility', () => {
    it('is hidden from screen readers', () => {
      render(<Spinner data-testid="spinner" />)
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
