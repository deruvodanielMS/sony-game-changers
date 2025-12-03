import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from 'lucide-react'
import { SidebarNavItem } from './SidebarNavItem'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('SidebarNavItem', () => {
  const defaultProps = {
    label: 'Home',
    icon: <Home data-testid="home-icon" />,
  }

  describe('Rendering', () => {
    it('renders label and icon', () => {
      render(<SidebarNavItem {...defaultProps} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    })

    it('renders as button by default', () => {
      render(<SidebarNavItem {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders as link when href is provided', () => {
      render(<SidebarNavItem {...defaultProps} href="/home" />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/home')
    })

    it('forwards data-test-id', () => {
      const { container } = render(<SidebarNavItem {...defaultProps} data-test-id="custom-item" />)
      const element = container.querySelector('[data-test-id="custom-item"]')
      expect(element).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<SidebarNavItem {...defaultProps} className="custom-class" />)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })
  })

  describe('Active State', () => {
    it('applies active styles when isActive is true', () => {
      render(<SidebarNavItem {...defaultProps} isActive />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-neutral-800')
      expect(button).toHaveClass('text-neutral-0')
    })

    it('applies default styles when not active', () => {
      render(<SidebarNavItem {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-neutral-1000')
      expect(button).toHaveClass('hover:bg-neutral-200')
    })

    it('sets aria-current when active', () => {
      render(<SidebarNavItem {...defaultProps} isActive />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page')
    })

    it('does not set aria-current when not active', () => {
      render(<SidebarNavItem {...defaultProps} />)
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-current')
    })
  })

  describe('Collapsed State', () => {
    it('hides label when collapsed', () => {
      const { container } = render(<SidebarNavItem {...defaultProps} isCollapsed />)
      // Label is not rendered in DOM when collapsed
      const label = container.querySelector('.truncate')
      expect(label).not.toBeInTheDocument()
    })

    it('shows icon when collapsed', () => {
      render(<SidebarNavItem {...defaultProps} isCollapsed />)
      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    })

    it('shows tooltip when collapsed', () => {
      render(<SidebarNavItem {...defaultProps} isCollapsed />)
      // Tooltip was removed from the component - no longer displayed
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('sets aria-label when collapsed', () => {
      render(<SidebarNavItem {...defaultProps} isCollapsed />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Home')
    })

    it('does not set aria-label when expanded', () => {
      render(<SidebarNavItem {...defaultProps} />)
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-label')
    })

    it('centers content when collapsed', () => {
      render(<SidebarNavItem {...defaultProps} isCollapsed />)
      expect(screen.getByRole('button')).toHaveClass('justify-center')
    })
  })

  describe('Badge', () => {
    it('renders badge when provided and not collapsed', () => {
      render(<SidebarNavItem {...defaultProps} badge="5" />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('does not render badge when collapsed', () => {
      render(<SidebarNavItem {...defaultProps} badge="5" isCollapsed />)
      const button = screen.getByRole('button')
      expect(button.querySelector('.min-w-5')).not.toBeInTheDocument()
    })

    it('shows badge in tooltip when collapsed', () => {
      render(<SidebarNavItem {...defaultProps} badge="5" isCollapsed />)
      // Tooltip was removed - badge is hidden when collapsed
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
      expect(screen.queryByText('5')).not.toBeInTheDocument()
    })

    it('applies active badge styles when item is active', () => {
      const { container } = render(<SidebarNavItem {...defaultProps} badge="5" isActive />)
      const badge = container.querySelector('.bg-accent-primary')
      expect(badge).toBeInTheDocument()
    })

    it('applies default badge styles when item is not active', () => {
      const { container } = render(<SidebarNavItem {...defaultProps} badge="5" />)
      const badge = container.querySelector('.bg-neutral-200')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Click Handler', () => {
    it('calls onClick when button is clicked', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<SidebarNavItem {...defaultProps} onClick={onClick} />)

      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick for link variant', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<SidebarNavItem {...defaultProps} href="/home" onClick={onClick} />)

      await user.click(screen.getByRole('link'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Keyboard Navigation', () => {
    it('is keyboard accessible', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<SidebarNavItem {...defaultProps} onClick={onClick} />)

      await user.tab()
      expect(screen.getByRole('button')).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('has visible focus styles', () => {
      render(<SidebarNavItem {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus-visible:outline-none')
      // Ring was removed - now uses outline-none consistently
      expect(button).toHaveClass('outline-none')
    })
  })

  describe('Accessibility', () => {
    it('icon has aria-hidden', () => {
      render(<SidebarNavItem {...defaultProps} />)
      const button = screen.getByRole('button')
      const iconContainer = button.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })

    it('tooltip has correct role', () => {
      render(<SidebarNavItem {...defaultProps} isCollapsed />)
      // Tooltip was removed from component
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('button has role="button" when not a link', () => {
      render(<SidebarNavItem {...defaultProps} />)
      expect(screen.getByRole('button')).toHaveAttribute('role', 'button')
    })
  })

  describe('Transitions', () => {
    it('has transition classes', () => {
      render(<SidebarNavItem {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('transition-all')
      expect(button).toHaveClass('duration-fast')
    })

    it('tooltip has transition classes', () => {
      render(<SidebarNavItem {...defaultProps} isCollapsed />)
      // Tooltip was removed - no transition classes to verify
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })
})
