import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetadataDisplay } from './MetadataDisplay'

describe('MetadataDisplay', () => {
  it('renders with user name', () => {
    render(<MetadataDisplay userName="John Doe" />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText(/Created by/i)).toBeInTheDocument()
  })

  it('renders with avatar', () => {
    render(<MetadataDisplay userName="Jane Smith" avatarUrl="/avatar.jpg" />)

    const avatar = screen.getByAltText('Jane Smith')
    expect(avatar).toBeInTheDocument()
    expect(avatar.getAttribute('src')).toContain('avatar.jpg')
  })

  it('renders with created date', () => {
    render(<MetadataDisplay userName="John Doe" createdDate="Jan 15, 2024" />)

    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
    expect(screen.getByText(/on/i)).toBeInTheDocument()
  })

  it('renders with updated date', () => {
    render(
      <MetadataDisplay userName="John Doe" createdDate="Jan 15, 2024" updatedDate="Jan 16, 2024" />,
    )

    expect(screen.getByText(/Last updated/i)).toBeInTheDocument()
    expect(screen.getByText('Jan 16, 2024')).toBeInTheDocument()
  })

  it('renders info icon when showInfo is true', () => {
    render(<MetadataDisplay userName="John Doe" showInfo infoTooltip="Additional information" />)

    const infoButton = screen.getByRole('button', { name: /Additional information/i })
    expect(infoButton).toBeInTheDocument()
  })

  it('does not render info icon when showInfo is false', () => {
    render(<MetadataDisplay userName="John Doe" showInfo={false} />)

    const infoButton = screen.queryByRole('button')
    expect(infoButton).not.toBeInTheDocument()
  })

  it('applies small size variant', () => {
    render(<MetadataDisplay userName="John Doe" size="sm" data-test-id="metadata" />)

    const container = screen.getByTestId('metadata')
    expect(container).toHaveClass('flex-col', 'gap-1', 'items-start')
  })

  it('applies medium size by default', () => {
    render(<MetadataDisplay userName="John Doe" data-test-id="metadata" />)

    const container = screen.getByTestId('metadata')
    expect(container).toHaveClass('gap-1')
    expect(container).not.toHaveClass('flex-col')
  })

  it('applies custom labels', () => {
    render(
      <MetadataDisplay
        userName="John Doe"
        createdDate="Jan 15, 2024"
        updatedDate="Jan 16, 2024"
        createdByLabel="Creado por"
        onLabel="el"
        lastUpdatedLabel="Última actualización"
      />,
    )

    expect(screen.getByText(/Creado por/i)).toBeInTheDocument()
    expect(screen.getByText(/el/i)).toBeInTheDocument()
    expect(screen.getByText(/Última actualización/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<MetadataDisplay userName="John Doe" className="custom-class" data-test-id="metadata" />)

    const container = screen.getByTestId('metadata')
    expect(container).toHaveClass('custom-class')
  })

  it('renders divider in desktop mode with updated date', () => {
    render(
      <MetadataDisplay
        userName="John Doe"
        createdDate="Jan 15, 2024"
        updatedDate="Jan 16, 2024"
        size="md"
        data-test-id="metadata"
      />,
    )

    const divider = screen.getByTestId('metadata').querySelector('.size-0\\.25')
    expect(divider).toBeInTheDocument()
  })

  it('does not render divider in mobile mode', () => {
    render(
      <MetadataDisplay
        userName="John Doe"
        createdDate="Jan 15, 2024"
        updatedDate="Jan 16, 2024"
        size="sm"
        data-test-id="metadata"
      />,
    )

    const divider = screen.getByTestId('metadata').querySelector('.size-0\\.25')
    expect(divider).not.toBeInTheDocument()
  })
})
