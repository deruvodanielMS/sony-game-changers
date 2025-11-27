import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarNav } from './SidebarNav'

describe('SidebarNav', () => {
  it('renders children', () => {
    render(
      <SidebarNav>
        <div>Nav Item 1</div>
        <div>Nav Item 2</div>
      </SidebarNav>,
    )
    expect(screen.getByText('Nav Item 1')).toBeInTheDocument()
    expect(screen.getByText('Nav Item 2')).toBeInTheDocument()
  })

  it('has correct role', () => {
    render(<SidebarNav>Content</SidebarNav>)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has aria-label', () => {
    render(<SidebarNav>Content</SidebarNav>)
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<SidebarNav className="custom-class">Content</SidebarNav>)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('custom-class')
  })

  it('has flex-col layout', () => {
    render(<SidebarNav>Content</SidebarNav>)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('flex')
    expect(nav).toHaveClass('flex-col')
  })

  it('has gap between items', () => {
    render(<SidebarNav>Content</SidebarNav>)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('gap-0_25')
  })
})
