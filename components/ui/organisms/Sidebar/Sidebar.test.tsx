import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from './Sidebar'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      mainNavigation: 'Main navigation',
      gameChangers: 'Game Changers',
      myTeam: 'My Team',
      notifications: 'Notifications',
      profile: 'Profile',
      expandSidebar: 'Expand sidebar',
      collapseSidebar: 'Collapse sidebar',
      closeMenu: 'Close Menu',
    }
    return translations[key] || key
  },
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string
    alt: string
    className?: string
    width?: number
    height?: number
    priority?: boolean
  }) => <img src={src} alt={alt} className={className} />,
}))

// Mock user store
vi.mock('@/stores/user.store', () => ({
  useUserStore: () => ({
    user: {
      name: 'John',
      lastname: 'Doe',
      profileImageUrl: '/profile-img/profile.png',
    },
  }),
}))

// Mock i18n navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/game-changers',
}))

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders navigation items', () => {
    render(<Sidebar />)

    expect(screen.getByText('Game Changers')).toBeInTheDocument()
    expect(screen.getByText('My Team')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('renders logo by default', () => {
    render(<Sidebar />)

    expect(screen.getByAltText('PlayStation')).toBeInTheDocument()
  })

  it('hides logo when hideLogo is true', () => {
    render(<Sidebar hideLogo />)

    expect(screen.queryByAltText('PlayStation')).not.toBeInTheDocument()
  })

  it('renders toggle button when onToggle is provided', () => {
    const onToggle = vi.fn()
    render(<Sidebar onToggle={onToggle} />)

    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  })

  it('hides toggle button when hideToggle is true', () => {
    const onToggle = vi.fn()
    render(<Sidebar onToggle={onToggle} hideToggle />)

    expect(screen.queryByRole('button', { name: 'Collapse sidebar' })).not.toBeInTheDocument()
  })

  it('calls onToggle when toggle button is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<Sidebar onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('shows expand button when collapsed', () => {
    const onToggle = vi.fn()
    render(<Sidebar isCollapsed onToggle={onToggle} />)

    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
  })

  it('applies data-test-id attribute', () => {
    render(<Sidebar data-test-id="sidebar" />)

    expect(screen.getByRole('complementary')).toHaveAttribute('data-test-id', 'sidebar')
  })

  it('renders user profile with name', () => {
    render(<Sidebar />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
