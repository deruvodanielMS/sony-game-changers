import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toast } from './Toast'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      closeNotification: 'Close notification',
    }
    return translations[key] || key
  },
}))

describe('Toast', () => {
  describe('Rendering', () => {
    it('renders with content', () => {
      render(<Toast content="Test message" />)
      expect(screen.getByText('Test message')).toBeDefined()
    })

    it('renders with message prop', () => {
      render(<Toast message="Message text" />)
      expect(screen.getByText('Message text')).toBeDefined()
    })

    it('renders with title and description', () => {
      render(<Toast title="Title" description="Description text" />)
      expect(screen.getByText('Title')).toBeDefined()
      expect(screen.getByText('Description text')).toBeDefined()
    })

    it('has proper role and aria-live attributes', () => {
      render(<Toast content="Test" />)
      const toast = screen.getByRole('status')
      expect(toast.getAttribute('aria-live')).toBe('polite')
    })

    it('uses tokenized width class', () => {
      const { container } = render(<Toast content="Test" />)
      const toast = container.querySelector('[role="status"]')
      expect(toast?.className).toContain('w-toast-width')
    })
  })

  describe('Variants', () => {
    it('renders success variant by default', () => {
      const { container } = render(<Toast content="Success" />)
      const toast = container.querySelector('[role="status"]')
      expect(toast?.className).toContain('bg-feedback-success-100')
    })

    it('renders error variant', () => {
      const { container } = render(<Toast content="Error" variant="error" />)
      const toast = container.querySelector('[role="status"]')
      expect(toast?.className).toContain('bg-feedback-error-100')
    })

    it('renders info variant', () => {
      const { container } = render(<Toast content="Info" variant="info" />)
      const toast = container.querySelector('[role="status"]')
      expect(toast?.className).toContain('bg-feedback-info-100')
    })
  })

  describe('Close button', () => {
    it('shows close button by default', () => {
      render(<Toast content="Test" />)
      expect(screen.getByLabelText('Close notification')).toBeDefined()
    })

    it('hides close button when showClose is false', () => {
      render(<Toast content="Test" showClose={false} />)
      expect(screen.queryByLabelText('Close notification')).toBeNull()
    })

    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn()
      render(<Toast content="Test" onClose={onClose} />)
      fireEvent.click(screen.getByLabelText('Close notification'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('close button has accessible label', () => {
      render(<Toast content="Test" />)
      const closeButton = screen.getByLabelText('Close notification')
      expect(closeButton).toBeDefined()
    })
  })
})
