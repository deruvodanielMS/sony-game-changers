import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MobileHeader } from './MobileHeader'
import translations from '@/messages/en.json'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return (translations.MobileHeader as Record<string, string>)[key] || key
  },
}))

describe('MobileHeader', () => {
  describe('Rendering', () => {
    it('renders logo and hamburger button', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={false} />)

      expect(screen.getByAltText('PlayStation - Home')).toBeInTheDocument()
      expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument()
    })

    it('renders as banner landmark', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={false} />)

      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('Menu States', () => {
    it('shows hamburger icon when menu is closed', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={false} />)

      const button = screen.getByLabelText('Open navigation menu')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('shows X icon when menu is open', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={true} />)

      const button = screen.getByLabelText('Close navigation menu')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('has correct aria-controls attribute', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={false} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-controls', 'mobile-navigation-drawer')
    })
  })

  describe('Interactions', () => {
    it('calls onMenuClick when button is clicked', async () => {
      const user = userEvent.setup()
      const onMenuClick = vi.fn()

      render(<MobileHeader onMenuClick={onMenuClick} menuOpen={false} />)

      const button = screen.getByLabelText('Open navigation menu')
      await user.click(button)

      expect(onMenuClick).toHaveBeenCalledTimes(1)
    })

    it('button is keyboard accessible', async () => {
      const user = userEvent.setup()
      const onMenuClick = vi.fn()

      render(<MobileHeader onMenuClick={onMenuClick} menuOpen={false} />)

      const button = screen.getByRole('button')
      await user.tab()

      expect(button).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(onMenuClick).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for closed menu', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={false} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open navigation menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-controls', 'mobile-navigation-drawer')
    })

    it('has proper ARIA attributes for open menu', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={true} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Close navigation menu')
      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(button).toHaveAttribute('aria-controls', 'mobile-navigation-drawer')
    })

    it('logo has descriptive alt text', () => {
      render(<MobileHeader onMenuClick={vi.fn()} menuOpen={false} />)

      const logo = screen.getByAltText('PlayStation - Home')
      expect(logo).toBeInTheDocument()
    })
  })
})
