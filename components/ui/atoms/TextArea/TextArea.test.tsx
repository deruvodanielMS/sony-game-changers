import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<TextArea />)
      expect(screen.getByRole('textbox')).toBeDefined()
    })

    it('renders as textarea element', () => {
      const { container } = render(<TextArea />)
      expect(container.querySelector('textarea')).toBeDefined()
    })

    it('applies custom className', () => {
      render(<TextArea className="custom-class" />)
      expect(screen.getByRole('textbox').className).toContain('custom-class')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTextAreaElement>()
      render(<TextArea ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })

    it('renders with placeholder', () => {
      render(<TextArea placeholder="Enter text..." />)
      expect(screen.getByPlaceholderText('Enter text...')).toBeDefined()
    })

    it('renders with custom rows', () => {
      render(<TextArea rows={5} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('rows')).toBe('5')
    })

    it('renders with default value', () => {
      render(<TextArea defaultValue="Initial text" />)
      expect(screen.getByRole('textbox')).toHaveValue('Initial text')
    })
  })

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<TextArea variant="default" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('border-neutral-300')
      expect(textarea?.className).toContain('bg-neutral-0')
    })

    it('renders error variant', () => {
      const { container } = render(<TextArea variant="error" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('border-feedback-danger-600')
      expect(textarea?.className).toContain('bg-feedback-danger-10')
    })
  })

  describe('Sizes', () => {
    it('renders default size', () => {
      const { container } = render(<TextArea size="default" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('min-h-space-6')
      expect(textarea?.className).toContain('text-body')
    })

    it('renders small size', () => {
      const { container } = render(<TextArea size="small" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('min-h-space-4')
      expect(textarea?.className).toContain('text-body-small')
    })
  })

  describe('Resize Options', () => {
    it('renders with vertical resize by default', () => {
      const { container } = render(<TextArea />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('resize-y')
    })

    it('renders with no resize', () => {
      const { container } = render(<TextArea resize="none" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('resize-none')
    })

    it('renders with horizontal resize', () => {
      const { container } = render(<TextArea resize="horizontal" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('resize-x')
    })

    it('renders with both resize', () => {
      const { container } = render(<TextArea resize="both" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('resize')
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      render(<TextArea disabled />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.hasAttribute('disabled')).toBe(true)
    })

    it('applies disabled styles', () => {
      const { container } = render(<TextArea disabled />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('disabled:bg-neutral-100')
      expect(textarea?.className).toContain('disabled:cursor-not-allowed')
      expect(textarea?.className).toContain('disabled:opacity-50')
    })

    it('renders readonly state', () => {
      render(<TextArea readOnly value="Read-only content" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.hasAttribute('readonly')).toBe(true)
    })

    it('applies readonly styles', () => {
      const { container } = render(<TextArea readOnly value="Read-only" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('read-only:bg-neutral-100')
      expect(textarea?.className).toContain('read-only:cursor-default')
    })
  })

  describe('Accessibility', () => {
    it('renders with aria-label', () => {
      render(<TextArea aria-label="Description" />)
      expect(screen.getByLabelText('Description')).toBeDefined()
    })

    it('renders with aria-describedby', () => {
      render(<TextArea aria-describedby="helper-text" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('aria-describedby')).toBe('helper-text')
    })

    it('renders with aria-invalid for error state', () => {
      render(<TextArea aria-invalid="true" variant="error" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('aria-invalid')).toBe('true')
    })

    it('renders with id attribute', () => {
      render(<TextArea id="comment-field" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('id')).toBe('comment-field')
    })

    it('renders with name attribute', () => {
      render(<TextArea name="comments" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('name')).toBe('comments')
    })
  })

  describe('HTML Attributes', () => {
    it('passes through data-testid', () => {
      render(<TextArea data-testid="custom-textarea" />)
      expect(screen.getByTestId('custom-textarea')).toBeDefined()
    })

    it('passes through maxLength attribute', () => {
      render(<TextArea maxLength={500} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('maxLength')).toBe('500')
    })

    it('passes through required attribute', () => {
      render(<TextArea required />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.hasAttribute('required')).toBe(true)
    })

    it('passes through autoComplete attribute', () => {
      render(<TextArea autoComplete="off" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea.getAttribute('autoComplete')).toBe('off')
    })
  })

  describe('Long Text', () => {
    it('handles long text content', () => {
      const longText = 'Lorem ipsum '.repeat(100)
      render(<TextArea defaultValue={longText} />)
      expect(screen.getByRole('textbox')).toHaveValue(longText)
    })

    it('handles multiline text', () => {
      const multilineText = 'Line 1\nLine 2\nLine 3'
      render(<TextArea defaultValue={multilineText} />)
      expect(screen.getByRole('textbox')).toHaveValue(multilineText)
    })
  })

  describe('Combination of Props', () => {
    it('renders with variant, size, and resize combined', () => {
      const { container } = render(<TextArea variant="error" size="small" resize="none" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('border-feedback-danger-600')
      expect(textarea?.className).toContain('min-h-space-4')
      expect(textarea?.className).toContain('resize-none')
    })

    it('renders with all custom props', () => {
      render(
        <TextArea
          variant="error"
          size="small"
          resize="vertical"
          placeholder="Enter comments"
          rows={3}
          maxLength={200}
          className="custom-class"
          data-testid="full-textarea"
          aria-label="Comments"
          required
        />,
      )
      const textarea = screen.getByTestId('full-textarea')
      expect(textarea).toBeDefined()
      expect(textarea.className).toContain('custom-class')
      expect(textarea.getAttribute('rows')).toBe('3')
      expect(textarea.getAttribute('maxLength')).toBe('200')
      expect(textarea.hasAttribute('required')).toBe(true)
    })
  })

  describe('Focus States', () => {
    it('applies focus styles', () => {
      const { container } = render(<TextArea />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('focus:ring-2')
      expect(textarea?.className).toContain('focus-visible:border-accent-primary')
    })

    it('applies focus styles for error variant', () => {
      const { container } = render(<TextArea variant="error" />)
      const textarea = container.querySelector('textarea')
      expect(textarea?.className).toContain('focus:ring-feedback-danger-600/20')
      expect(textarea?.className).toContain('focus-visible:border-feedback-danger-600')
    })
  })
})
