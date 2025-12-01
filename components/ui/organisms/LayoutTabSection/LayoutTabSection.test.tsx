import { describe, it, vi, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LayoutTabSection } from './LayoutTabSection'

import type { Mock } from 'vitest'

// --- 🔧 Mocks ---
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => key),
}))

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

vi.mock('@radix-ui/react-tabs', () => ({
  Root: ({ children, value }: any) => (
    <div data-testid="tabs-root" data-value={value}>
      {children}
    </div>
  ),
  List: ({ children }: any) => <div data-testid="tabs-list">{children}</div>,
  Trigger: ({ children, value, className }: any) => (
    <button data-testid={`tab-${value}`} className={className}>
      {children}
    </button>
  ),
}))

// --- Get actual mocked function ---
import { usePathname } from 'next/navigation'

const sections = [
  { value: 'account', label: 'Account', href: '/settings/account', icon: 'A' },
  { value: 'password', label: 'Password', href: '/settings/password', icon: 'P' },
]

describe('LayoutTabSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly (snapshot)', () => {
    ;(usePathname as Mock).mockReturnValue('/settings/account')

    const { asFragment } = render(
      <LayoutTabSection sections={sections}>
        <div>Child content</div>
      </LayoutTabSection>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('sets the correct tab based on pathname', () => {
    ;(usePathname as Mock).mockReturnValue('/settings/password')

    render(
      <LayoutTabSection sections={sections}>
        <div>Content</div>
      </LayoutTabSection>,
    )

    const root = screen.getByTestId('tabs-root')

    expect(root.getAttribute('data-value')).toBe('password')
  })

  it('renders each section as a tab', () => {
    ;(usePathname as Mock).mockReturnValue('/settings/account')

    render(
      <LayoutTabSection sections={sections}>
        <div>Content</div>
      </LayoutTabSection>,
    )

    expect(screen.getByTestId('tab-account')).toBeInTheDocument()
    expect(screen.getByTestId('tab-password')).toBeInTheDocument()

    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('renders children', () => {
    ;(usePathname as Mock).mockReturnValue('/settings/account')

    render(
      <LayoutTabSection sections={sections}>
        <div data-testid="child">Child content</div>
      </LayoutTabSection>,
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
