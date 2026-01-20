import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Breadcrumb', () => {
  it('renders nothing when items array is empty', () => {
    const { container } = render(<Breadcrumb items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders single item without separator', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
  })

  it('renders multiple items with separators', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ]
    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Current' }]
    render(<Breadcrumb items={items} />)

    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('does not render link for last item', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current', href: '/current' },
    ]
    render(<Breadcrumb items={items} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveTextContent('Home')
  })

  it('applies aria-current to last item', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Current' }]
    render(<Breadcrumb items={items} />)

    const currentItem = screen.getByText('Current')
    expect(currentItem).toHaveAttribute('aria-current', 'page')
  })

  it('applies bold style to last item', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Current' }]
    render(<Breadcrumb items={items} />)

    const currentItem = screen.getByText('Current')
    expect(currentItem).toHaveClass('font-bold')
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Breadcrumb items={[{ label: 'Home' }]} className="custom-class" />,
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with data-testid', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} data-testid="breadcrumb" />)
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
  })

  it('has accessible breadcrumb navigation landmark', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />)
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
  })
})
