import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionHeader } from './SectionHeader'

describe('SectionHeader', () => {
  it('renders title', () => {
    render(<SectionHeader title="Test Title" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
  })

  it('renders description when provided', () => {
    render(<SectionHeader title="Test Title" description="Test description" />)
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<SectionHeader title="Test Title" />)
    expect(container.querySelector('p')).not.toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    render(<SectionHeader title="Test Title" actions={<button>Action Button</button>} />)
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
  })

  it('does not render actions section when not provided', () => {
    const { container } = render(<SectionHeader title="Test Title" />)
    const actionsContainer = container.querySelector('[class*="gap-0_75"]')
    expect(actionsContainer).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<SectionHeader title="Test Title" className="custom-class" />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('custom-class')
  })

  it('applies data-test-id', () => {
    const { container } = render(<SectionHeader title="Test Title" data-test-id="section-header" />)
    expect(container.querySelector('[data-test-id="section-header"]')).toBeInTheDocument()
  })

  it('applies correct layout classes', () => {
    const { container } = render(<SectionHeader title="Test Title" />)
    const header = container.querySelector('header')
    expect(header).toHaveClass(
      'flex',
      'flex-col',
      'md:flex-row',
      'md:items-center',
      'gap-1_5',
      'bg-neutral-0',
      'w-full',
    )
  })

  it('title has correct typography classes', () => {
    render(<SectionHeader title="Test Title" />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('text-h4', 'font-bold', 'leading-h4')
  })

  it('description has correct typography classes', () => {
    render(<SectionHeader title="Test Title" description="Test description" />)
    const description = screen.getByText('Test description')
    expect(description).toHaveClass('text-body-small', 'leading-body-small', 'font-normal')
  })

  it('renders multiple actions', () => {
    render(
      <SectionHeader
        title="Test Title"
        actions={
          <>
            <button>Action 1</button>
            <button>Action 2</button>
          </>
        }
      />,
    )
    expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument()
  })

  describe('snapshots', () => {
    it('matches snapshot with title only', () => {
      const { container } = render(<SectionHeader title="Test Title" />)
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot with title and description', () => {
      const { container } = render(
        <SectionHeader title="Test Title" description="Test description" />,
      )
      expect(container).toMatchSnapshot()
    })

    it('matches snapshot with actions', () => {
      const { container } = render(
        <SectionHeader title="Test Title" actions={<button>Action</button>} />,
      )
      expect(container).toMatchSnapshot()
    })
  })
})
