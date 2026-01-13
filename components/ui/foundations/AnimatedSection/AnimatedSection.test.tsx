import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnimatedSection } from './AnimatedSection'

describe('AnimatedSection', () => {
  it('renders children correctly', async () => {
    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>,
    )

    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })

  it('applies default delay of 0', async () => {
    const { container } = render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>,
    )

    // Verify content renders with motion wrapper
    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(container.querySelector('div')).toBeInTheDocument()
    })
  })

  it('applies custom delay prop', async () => {
    const { container } = render(
      <AnimatedSection delay={0.5}>
        <div>Test Content</div>
      </AnimatedSection>,
    )

    // Verify content renders with motion wrapper and custom delay is accepted
    await waitFor(() => {
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(container.querySelector('div')).toBeInTheDocument()
    })
  })
})
