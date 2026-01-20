import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AchievementItem } from './AchievementItem'

describe('AchievementItem', () => {
  it('renders with text', async () => {
    render(<AchievementItem text="Complete onboarding" />)

    await waitFor(() => {
      expect(screen.getByText('Complete onboarding')).toBeInTheDocument()
    })
  })

  it('renders unchecked by default', async () => {
    render(<AchievementItem text="Task 1" />)

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()
    })
  })

  it('renders checked when completed is true', async () => {
    render(<AchievementItem text="Task 1" completed />)

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })
  })

  it('does NOT apply line-through when completed (design spec)', async () => {
    render(<AchievementItem text="Completed task" completed />)

    await waitFor(() => {
      const text = screen.getByText('Completed task')
      expect(text).not.toHaveClass('line-through')
    })
  })

  it('calls onToggle when checkbox is clicked', async () => {
    const handleToggle = vi.fn()
    const user = userEvent.setup()

    render(<AchievementItem text="Task 1" onToggle={handleToggle} />)

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(handleToggle).toHaveBeenCalledWith(true)
  })

  it('shows progress selector when not completed', async () => {
    render(<AchievementItem text="Task 1" completed={false} />)

    await waitFor(() => {
      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toBeInTheDocument()
    })

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
  })

  it('hides progress selector when completed', async () => {
    render(<AchievementItem text="Task 1" completed />)

    await waitFor(() => {
      const radioGroup = screen.queryByRole('radiogroup')
      expect(radioGroup).not.toBeInTheDocument()
    })
  })

  it('hides progress selector when showProgressSelector is false', async () => {
    render(<AchievementItem text="Task 1" showProgressSelector={false} />)

    await waitFor(() => {
      const radioGroup = screen.queryByRole('radiogroup')
      expect(radioGroup).not.toBeInTheDocument()
    })
  })

  it('calls onProgressChange when progress button is clicked', async () => {
    const handleProgressChange = vi.fn()
    const user = userEvent.setup()

    render(<AchievementItem text="Task 1" onProgressChange={handleProgressChange} />)

    await waitFor(() => {
      const radios = screen.getAllByRole('radio')
      expect(radios.length).toBeGreaterThan(0)
    })

    const onTrackButton = screen.getByRole('radio', { name: /On Track/i })
    await user.click(onTrackButton)

    expect(handleProgressChange).toHaveBeenCalledWith('on-track')
  })

  it('highlights selected progress status', async () => {
    render(<AchievementItem text="Task 1" progress="on-track" />)

    await waitFor(() => {
      const onTrackButton = screen.getByRole('radio', { name: /On Track/i })
      expect(onTrackButton).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('applies small size variant', async () => {
    render(<AchievementItem text="Task 1" size="sm" data-test-id="achievement" />)

    await waitFor(() => {
      const container = screen.getByTestId('achievement')
      expect(container).toHaveClass('flex-col', 'items-center')
    })
  })

  it('applies completed background color (feedback-success)', async () => {
    render(<AchievementItem text="Task 1" completed data-test-id="achievement" />)

    await waitFor(() => {
      const container = screen.getByTestId('achievement')
      expect(container).toHaveClass('bg-feedback-success-100', 'border-feedback-success-200')
    })
  })

  it('applies default background color when not completed', async () => {
    render(<AchievementItem text="Task 1" completed={false} data-test-id="achievement" />)

    await waitFor(() => {
      const container = screen.getByTestId('achievement')
      expect(container).toHaveClass('bg-neutral-0', 'border-neutral-200')
    })
  })

  it('applies custom className', async () => {
    render(<AchievementItem text="Task 1" className="custom-class" data-test-id="achievement" />)

    await waitFor(() => {
      const container = screen.getByTestId('achievement')
      expect(container).toHaveClass('custom-class')
    })
  })
})
