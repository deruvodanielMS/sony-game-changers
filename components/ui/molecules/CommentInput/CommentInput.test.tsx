import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommentInput } from './CommentInput'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      placeholder: 'Add a comment...',
      submitHint: 'Press Ctrl+Enter to submit',
    }
    return translations[key] || key
  },
}))

describe('CommentInput', () => {
  it('renders with avatar and textarea', () => {
    render(<CommentInput avatarAlt="Test User" />)

    expect(screen.getByAltText('Test User')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument()
  })

  it('displays custom placeholder', () => {
    render(<CommentInput avatarAlt="User" placeholder="Custom placeholder" />)

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('shows submit hint when onSubmit is provided', () => {
    render(<CommentInput avatarAlt="User" onSubmit={vi.fn()} />)

    expect(screen.getByText('Press Ctrl+Enter to submit')).toBeInTheDocument()
  })

  it('does not show submit hint when onSubmit is not provided', () => {
    render(<CommentInput avatarAlt="User" />)

    expect(screen.queryByText('Press Ctrl+Enter to submit')).not.toBeInTheDocument()
  })

  it('handles uncontrolled input', async () => {
    const user = userEvent.setup()
    render(<CommentInput avatarAlt="User" />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Test comment')

    expect(textarea).toHaveValue('Test comment')
  })

  it('handles controlled input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(<CommentInput avatarAlt="User" value="" onChange={handleChange} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'T')

    expect(handleChange).toHaveBeenCalledWith('T')

    rerender(<CommentInput avatarAlt="User" value="T" onChange={handleChange} />)
    expect(textarea).toHaveValue('T')
  })

  it('calls onSubmit when Ctrl+Enter is pressed', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<CommentInput avatarAlt="User" onSubmit={handleSubmit} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Test comment')
    await user.keyboard('{Control>}{Enter}{/Control}')

    expect(handleSubmit).toHaveBeenCalledWith('Test comment')
  })

  it('calls onSubmit when Meta+Enter is pressed (Mac)', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<CommentInput avatarAlt="User" onSubmit={handleSubmit} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Test comment')
    await user.keyboard('{Meta>}{Enter}{/Meta}')

    expect(handleSubmit).toHaveBeenCalledWith('Test comment')
  })

  it('does not submit empty or whitespace-only comments', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<CommentInput avatarAlt="User" onSubmit={handleSubmit} />)

    const textarea = screen.getByRole('textbox')

    // Try submitting empty
    await user.keyboard('{Control>}{Enter}{/Control}')
    expect(handleSubmit).not.toHaveBeenCalled()

    // Try submitting whitespace
    await user.type(textarea, '   ')
    await user.keyboard('{Control>}{Enter}{/Control}')
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('clears textarea after submit in uncontrolled mode', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<CommentInput avatarAlt="User" onSubmit={handleSubmit} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Test comment')
    await user.keyboard('{Control>}{Enter}{/Control}')

    expect(textarea).toHaveValue('')
  })

  it('does not clear textarea after submit in controlled mode', async () => {
    const handleSubmit = vi.fn()
    const handleChange = vi.fn()
    const user = userEvent.setup()

    const { rerender } = render(
      <CommentInput avatarAlt="User" value="" onChange={handleChange} onSubmit={handleSubmit} />,
    )

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Test comment')

    // Update the controlled value after typing
    rerender(
      <CommentInput
        avatarAlt="User"
        value="Test comment"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    )

    await user.keyboard('{Control>}{Enter}{/Control}')

    expect(handleSubmit).toHaveBeenCalledWith('Test comment')

    rerender(
      <CommentInput
        avatarAlt="User"
        value="Test comment"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />,
    )

    // Value should remain (parent component controls it)
    expect(textarea).toHaveValue('Test comment')
  })

  it('shows character count when enabled', () => {
    render(<CommentInput avatarAlt="User" defaultValue="Test" maxLength={100} showCharCount />)

    expect(screen.getByText('4/100')).toBeInTheDocument()
  })

  it('highlights character count when over limit', async () => {
    const user = userEvent.setup()

    render(<CommentInput avatarAlt="User" maxLength={5} showCharCount />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, '123456')

    const charCount = screen.getByText('6/5')
    expect(charCount).toHaveClass('text-feedback-error-600')
  })

  it('applies custom className', () => {
    render(<CommentInput avatarAlt="User" className="custom-class" data-test-id="comment-input" />)

    const container = screen.getByTestId('comment-input')
    expect(container).toHaveClass('custom-class')
  })

  it('applies size variants', () => {
    const { rerender } = render(
      <CommentInput avatarAlt="User" size="sm" data-test-id="comment-input" />,
    )

    const textarea = screen.getByTestId('comment-input-textarea')
    expect(textarea).toHaveClass('h-18', 'text-sm')

    rerender(<CommentInput avatarAlt="User" size="lg" data-test-id="comment-input" />)
    expect(textarea).toHaveClass('h-28')
  })

  it('respects disabled state', () => {
    render(<CommentInput avatarAlt="User" disabled />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('applies custom height', () => {
    render(<CommentInput avatarAlt="User" height="200px" data-test-id="comment-input" />)

    const textarea = screen.getByTestId('comment-input-textarea')
    expect(textarea).toHaveStyle({ height: '200px' })
  })
})
