import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('next/navigation', () => {
  return {
    usePathname: vi.fn(),
  }
})

vi.mock('@/i18n/navigation', () => {
  return {
    Link: ({ href, children }: any) => <a href={href}>{children}</a>,
  }
})

vi.mock('@radix-ui/react-tabs', async () => {
  const React = await import('react')
  return {
    Root: ({ value, children, ...rest }: any) => (
      <div data-testid="tabs-root" data-value={value} {...rest}>
        {children}
      </div>
    ),

    List: ({ children, ...rest }: any) => (
      <div data-testid="tabs-list" {...rest}>
        {children}
      </div>
    ),

    Trigger: ({ value, children, asChild, ...rest }: any) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
          'data-testid': `tab-trigger-${value}`,
          ...rest,
        })
      }

      return (
        <button data-testid={`tab-trigger-${value}`} {...rest}>
          {children}
        </button>
      )
    },
  }
})

import { LayoutTabSection } from './LayoutTabSection'
import { usePathname } from 'next/navigation'

const mockUsePathname = usePathname as unknown as ReturnType<typeof vi.fn>
const MockIcon = () => <svg data-testid="mock-icon" />

const sectionsMock = [
  {
    value: 'profile',
    label: 'Profile',
    href: '/settings/profile',
    icon: <MockIcon />,
  },
  {
    value: 'billing',
    label: 'Billing',
    href: '/settings/billing',
    icon: <MockIcon />,
  },
]

describe('LayoutTabSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUsePathname.mockReturnValue('/en/game-changers/profile')
  })

  it('renders both desktop and mobile tab lists', () => {
    render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div>Child content</div>
      </LayoutTabSection>,
    )

    const lists = screen.getAllByTestId('tabs-list')
    expect(lists.length).toBe(2)
  })

  it('renders all section labels and icons', () => {
    render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div>Children</div>
      </LayoutTabSection>,
    )

    expect(screen.getAllByText('Profile')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Billing')[0]).toBeInTheDocument()

    const icons = screen.getAllByTestId('mock-icon')
    expect(icons.length).toBe(4)
  })

  it('preserves <a> as the interactive element so we can verify hrefs', () => {
    render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div>Children</div>
      </LayoutTabSection>,
    )

    const profileLinks = screen.getAllByText('Profile')
    const profileLink = profileLinks[0].closest('a')
    expect(profileLink).toBeTruthy()
    expect(profileLink).toHaveAttribute('href', '/settings/profile')

    const billingLinks = screen.getAllByText('Billing')
    const billingLink = billingLinks[0].closest('a')
    expect(billingLink).toBeTruthy()
    expect(billingLink).toHaveAttribute('href', '/settings/billing')
  })

  it('marks the current tab value based on the pathname (last segment)', () => {
    render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div>Children</div>
      </LayoutTabSection>,
    )

    const root = screen.getByTestId('tabs-root')
    expect(root.getAttribute('data-value')).toBe('profile')
  })

  it('renders the children section', () => {
    render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div data-testid="child-slot">Hello children</div>
      </LayoutTabSection>,
    )

    expect(screen.getByTestId('child-slot')).toBeInTheDocument()
  })

  it('works with a different pathname (billing active)', () => {
    mockUsePathname.mockReturnValue('/en/game-changers/billing')

    render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div>Children</div>
      </LayoutTabSection>,
    )

    const root = screen.getByTestId('tabs-root')
    expect(root.getAttribute('data-value')).toBe('billing')
  })

  it('matches snapshot', () => {
    const { container } = render(
      <LayoutTabSection basePath="game-changers" sections={sectionsMock}>
        <div>Snapshot child</div>
      </LayoutTabSection>,
    )

    expect(container).toMatchSnapshot()
  })
})
