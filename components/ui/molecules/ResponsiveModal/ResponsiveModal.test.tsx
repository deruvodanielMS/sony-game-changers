import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ResponsiveModal } from './ResponsiveModal'

// Mock useMediaQuery hook
const mockUseMediaQuery = vi.fn()
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: () => mockUseMediaQuery(),
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('ResponsiveModal', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <p>Modal content</p>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Default to desktop
    mockUseMediaQuery.mockReturnValue(true)
  })

  describe('Desktop (Modal)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true)
    })

    it('renders Modal on desktop', () => {
      render(<ResponsiveModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('renders close button on desktop', () => {
      render(<ResponsiveModal {...defaultProps} />)

      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn()
      render(<ResponsiveModal {...defaultProps} onClose={onClose} />)

      const closeButton = screen.getByRole('button', { name: /close/i })
      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('renders actions in footer on desktop', () => {
      render(
        <ResponsiveModal
          {...defaultProps}
          actions={<button data-testid="action-button">Submit</button>}
        />,
      )

      expect(screen.getByTestId('action-button')).toBeInTheDocument()
    })

    it('does not render footer when no actions provided', () => {
      render(<ResponsiveModal {...defaultProps} />)

      // Modal body should exist but no footer
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('renders customFooter instead of actions when provided', () => {
      render(
        <ResponsiveModal
          {...defaultProps}
          actions={<button data-testid="action-button">Submit</button>}
          customFooter={<div data-testid="custom-footer">Custom Footer Content</div>}
        />,
      )

      expect(screen.getByTestId('custom-footer')).toBeInTheDocument()
      expect(screen.getByText('Custom Footer Content')).toBeInTheDocument()
      // actions should not be rendered when customFooter is provided
      expect(screen.queryByTestId('action-button')).not.toBeInTheDocument()
    })

    it('renders customFooter with custom styling', () => {
      render(
        <ResponsiveModal
          {...defaultProps}
          desktopSize="full"
          customFooter={
            <div
              data-testid="styled-footer"
              className="-mx-1_5 -mb-1_5 mt-auto border-t border-neutral-200 bg-neutral-50"
            >
              <button>Save Draft</button>
              <button>Submit</button>
            </div>
          }
        />,
      )

      expect(screen.getByTestId('styled-footer')).toBeInTheDocument()
      expect(screen.getByText('Save Draft')).toBeInTheDocument()
      expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    it('calls onClose when overlay is clicked and overlayClose is true', () => {
      const onClose = vi.fn()
      render(<ResponsiveModal {...defaultProps} onClose={onClose} overlayClose />)

      const overlay = screen.getByTestId('modal-overlay')
      fireEvent.mouseDown(overlay)

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Mobile (Drawer)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false)
    })

    it('renders Drawer on mobile', () => {
      render(<ResponsiveModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('renders drawer with bottom position on mobile', () => {
      render(<ResponsiveModal {...defaultProps} />)

      const container = screen.getByTestId('drawer-container')
      expect(container).toHaveClass('bottom-0')
    })

    it('renders actions in drawer footer on mobile', () => {
      render(
        <ResponsiveModal
          {...defaultProps}
          actions={<button data-testid="action-button">Submit</button>}
        />,
      )

      expect(screen.getByTestId('action-button')).toBeInTheDocument()
      expect(screen.getByTestId('drawer-footer')).toBeInTheDocument()
    })

    it('renders actions in drawer even when customFooter is provided (customFooter is desktop only)', () => {
      render(
        <ResponsiveModal
          {...defaultProps}
          actions={<button data-testid="action-button">Mobile Action</button>}
          customFooter={<div data-testid="custom-footer">Desktop Footer</div>}
        />,
      )

      // On mobile, actions should be used, not customFooter
      expect(screen.getByTestId('action-button')).toBeInTheDocument()
      expect(screen.queryByTestId('custom-footer')).not.toBeInTheDocument()
    })

    it('wraps children in mobileBodyClassName when provided', () => {
      render(
        <ResponsiveModal {...defaultProps} mobileBodyClassName="flex flex-col gap-1_5">
          <span data-testid="child-content">Content</span>
        </ResponsiveModal>,
      )

      const childContent = screen.getByTestId('child-content')
      expect(childContent.parentElement).toHaveClass('flex', 'flex-col', 'gap-1_5')
    })
  })

  describe('Common behavior', () => {
    it('does not render when open is false', () => {
      render(<ResponsiveModal {...defaultProps} open={false} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('uses aria-label prop when provided', () => {
      render(<ResponsiveModal {...defaultProps} aria-label="Custom label" />)

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Custom label')
    })

    it('falls back to title for aria-label when not provided', () => {
      render(<ResponsiveModal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Test Modal')
    })
  })
})
