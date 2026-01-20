import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ActivityItem } from './ActivityItem'

describe('ActivityItem', () => {
  it('renders with user name and date', async () => {
    render(
      <ActivityItem user={{ name: 'John Doe' }} date="2 hours ago">
        <span>completed the task</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('completed the task')).toBeInTheDocument()
  })

  it('renders with user avatar', async () => {
    render(
      <ActivityItem user={{ name: 'Jane Smith', avatar: '/avatar.jpg' }} date="1 day ago">
        <span>created the ambition</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      expect(screen.getByAltText('Jane Smith')).toBeInTheDocument()
    })
    const avatar = screen.getByAltText('Jane Smith')
    expect(avatar.getAttribute('src')).toContain('avatar.jpg')
  })

  it('renders children content', async () => {
    render(
      <ActivityItem user={{ name: 'Bob Johnson' }} date="3 hours ago">
        <div>
          <span>changed status to</span>
          <strong>Completed</strong>
        </div>
      </ActivityItem>,
    )

    await waitFor(() => {
      expect(screen.getByText('changed status to')).toBeInTheDocument()
    })
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('applies small size variant', async () => {
    render(
      <ActivityItem
        user={{ name: 'Alice Brown' }}
        date="now"
        size="sm"
        data-test-id="activity-item"
      >
        <span>updated</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      const container = screen.getByTestId('activity-item')
      expect(container).toHaveClass('gap-0.5')
    })
  })

  it('applies medium size variant', async () => {
    render(
      <ActivityItem
        user={{ name: 'Charlie Wilson' }}
        date="5 min ago"
        size="md"
        data-test-id="activity-item"
      >
        <span>commented</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      const container = screen.getByTestId('activity-item')
      expect(container).toHaveClass('gap-1')
    })
  })

  it('applies custom className', async () => {
    render(
      <ActivityItem
        user={{ name: 'David Lee' }}
        date="yesterday"
        className="custom-class"
        data-test-id="activity-item"
      >
        <span>approved</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      const container = screen.getByTestId('activity-item')
      expect(container).toHaveClass('custom-class')
    })
  })

  it('applies custom avatar size', async () => {
    render(
      <ActivityItem user={{ name: 'Eva Martinez' }} date="2 days ago" avatarSize="lg">
        <span>started work</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      const avatar = screen.getByAltText('Eva Martinez')
      // Avatar lg size = 48px = size-3 (3 * 16 = 48)
      const avatarContainer = avatar.parentElement
      expect(avatarContainer).toHaveClass('size-3')
    })
  })

  it('renders without avatar when not provided', async () => {
    render(
      <ActivityItem user={{ name: 'Frank White' }} date="now">
        <span>joined</span>
      </ActivityItem>,
    )

    await waitFor(() => {
      expect(screen.getByText('Frank White')).toBeInTheDocument()
    })
    // Avatar should still render with initials fallback
    const avatar = screen.getByAltText('Frank White')
    expect(avatar).toBeInTheDocument()
  })
})
