import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Typography } from './Typography'
import { TYPOGRAPHY_COLORS } from './Typography.constants'

describe('Typography', () => {
  it('renders with default variant', () => {
    const { getByText } = render(<Typography>Test content</Typography>)
    expect(getByText('Test content')).toBeDefined()
  })

  it('renders correct semantic element for headings', () => {
    const { container } = render(<Typography variant="h1">Heading</Typography>)
    expect(container.querySelector('h1')).toBeDefined()
  })

  it('renders paragraph by default for body variants', () => {
    const { container } = render(<Typography variant="body">Body text</Typography>)
    expect(container.querySelector('p')).toBeDefined()
  })

  it('uses custom element with as prop', () => {
    const { container } = render(
      <Typography variant="body" as="span">
        Span text
      </Typography>,
    )
    expect(container.querySelector('span')).toBeDefined()
  })

  it('applies color variants', () => {
    const { container: defaultContainer } = render(<Typography color="default">Default</Typography>)
    const { container: primaryContainer } = render(<Typography color="primary">Primary</Typography>)
    const { container: dangerContainer } = render(<Typography color="danger">Danger</Typography>)

    const defaultElement = defaultContainer.firstChild as HTMLElement
    const primaryElement = primaryContainer.firstChild as HTMLElement
    const dangerElement = dangerContainer.firstChild as HTMLElement

    expect(defaultElement.style.color).toBe('var(--color-neutral-1000)')
    expect(primaryElement.style.color).toBe('var(--color-accent-primary)')
    expect(dangerElement.style.color).toBe('var(--color-feedback-danger-600)')
  })

  it('applies custom className', () => {
    const { getByText } = render(<Typography className="custom-class">Text</Typography>)
    expect(getByText('Text').className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>()
    render(<Typography ref={ref}>Text</Typography>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('renders all heading variants with correct elements', () => {
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
    const { container } = render(
      <>
        {variants.map((variant) => (
          <Typography key={variant} variant={variant}>
            {variant}
          </Typography>
        ))}
      </>,
    )
    variants.forEach((variant) => {
      expect(container.querySelector(variant)).toBeDefined()
    })
  })

  it('passes through HTML attributes', () => {
    const { getByLabelText } = render(
      <Typography data-testid="test-typography" aria-label="test">
        Text
      </Typography>,
    )
    const element = getByLabelText('test')
    expect(element.getAttribute('aria-label')).toBe('test')
  })

  it('handles empty children gracefully', () => {
    const { container } = render(<Typography />)
    expect(container.firstChild).toBeDefined()
    expect(container.firstChild?.nodeName).toBe('P')
  })

  it('merges custom inline styles with color prop', () => {
    const { container } = render(
      <Typography color="primary" style={{ fontWeight: 'bold', fontSize: '20px' }}>
        Text
      </Typography>,
    )
    const element = container.firstChild as HTMLElement
    expect(element.style.color).toBe(TYPOGRAPHY_COLORS.primary)
    expect(element.style.fontWeight).toBe('bold')
    expect(element.style.fontSize).toBe('20px')
  })

  it('renders all body variants correctly', () => {
    const { getByText } = render(
      <>
        <Typography variant="body">Body</Typography>
        <Typography variant="bodySmall">Body Small</Typography>
        <Typography variant="bodyTiny">Body Tiny</Typography>
      </>,
    )
    expect(getByText('Body')).toBeDefined()
    expect(getByText('Body Small')).toBeDefined()
    expect(getByText('Body Tiny')).toBeDefined()
  })

  it('applies fontWeight variants correctly', () => {
    const { getByText } = render(
      <>
        <Typography variant="body" fontWeight="normal">
          Normal
        </Typography>
        <Typography variant="body" fontWeight="semibold">
          Semibold
        </Typography>
        <Typography variant="body" fontWeight="bold">
          Bold
        </Typography>
      </>,
    )
    expect(getByText('Normal').className).toContain('font-normal')
    expect(getByText('Semibold').className).toContain('font-semibold')
    expect(getByText('Bold').className).toContain('font-bold')
  })

  it('headings default to semibold font weight', () => {
    const { getByText } = render(<Typography variant="h1">Heading</Typography>)
    expect(getByText('Heading').className).toContain('font-semibold')
  })
})
