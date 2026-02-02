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

  it('renders progress selector by default', async () => {
    render(<AchievementItem text="Task 1" />)

    await waitFor(() => {
      const tablist = screen.getByRole('tablist')
      expect(tablist).toBeInTheDocument()
    })

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
  })

  it('renders with default progress as off-track', async () => {
    render(<AchievementItem text="Task 1" />)

    await waitFor(() => {
      const offTrackButton = screen.getByRole('tab', { name: /Off track/i })
      expect(offTrackButton).toHaveAttribute('aria-selected', 'true')
    })
  })

  it('does NOT apply line-through when completed (design spec)', async () => {
    render(<AchievementItem text="Completed task" completed />)

    await waitFor(() => {
      const text = screen.getByText('Completed task')
      expect(text).not.toHaveClass('line-through')
    })
  })

  it('shows progress selector by default', async () => {
    render(<AchievementItem text="Task 1" />)

    await waitFor(() => {
      const tablist = screen.getByRole('tablist')
      expect(tablist).toBeInTheDocument()
    })

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
  })

  it('hides progress selector when showProgressSelector is false', async () => {
    render(<AchievementItem text="Task 1" showProgressSelector={false} />)

    await waitFor(() => {
      const tablist = screen.queryByRole('tablist')
      expect(tablist).not.toBeInTheDocument()
    })
  })

  it('calls onProgressChange when progress button is clicked', async () => {
    const handleProgressChange = vi.fn()
    const user = userEvent.setup()

    render(<AchievementItem text="Task 1" onProgressChange={handleProgressChange} />)

    await waitFor(() => {
      const tabs = screen.getAllByRole('tab')
      expect(tabs.length).toBeGreaterThan(0)
    })

    const onTrackButton = screen.getByRole('tab', { name: /On Track/i })
    await user.click(onTrackButton)

    expect(handleProgressChange).toHaveBeenCalledWith('on-track')
  })

  it('highlights selected progress status', async () => {
    render(<AchievementItem text="Task 1" progress="on-track" />)

    await waitFor(() => {
      const onTrackButton = screen.getByRole('tab', { name: /On Track/i })
      expect(onTrackButton).toHaveAttribute('aria-selected', 'true')
    })
  })

  it('applies small size variant with items-start', async () => {
    render(<AchievementItem text="Task 1" size="sm" data-test-id="achievement" />)

    await waitFor(() => {
      const container = screen.getByTestId('achievement')
      expect(container).toHaveClass('flex-col', 'items-start')
    })
  })

  it('applies default background color', async () => {
    render(<AchievementItem text="Task 1" data-test-id="achievement" />)

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
