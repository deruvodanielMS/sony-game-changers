import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AmbitionLaddering } from './AmbitionLaddering'
import type { LadderedAmbition } from './AmbitionLaddering.types'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'Laddered Ambitions',
      searchPlaceholder: 'Search...',
      addButton: 'Add Laddered Ambition',
      totalAmbitions: '{count} total Ambitions',
      viewSwitcherLabel: 'View switcher',
      viewGrid: 'Grid view',
      viewList: 'List view',
    }
    return translations[key] || key
  },
}))

// Mock i18n navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock useMediaQuery
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (breakpoint: string) => {
    // Simulate desktop view
    return breakpoint === '(min-width: 768px)' || breakpoint === '(min-width: 1024px)'
  },
}))

const mockAmbitions: LadderedAmbition[] = [
  {
    id: '1',
    title: 'Improve team collaboration',
    uid: 'user-1',
    userName: 'John Doe',
    avatarUrl: '/profile-img/Avatar1.png',
    progress: 75,
    status: 'In Progress',
    goalType: 'business',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Complete project documentation',
    uid: 'user-2',
    userName: 'Jane Smith',
    avatarUrl: '/profile-img/Avatar2.png',
    progress: 45,
    status: 'Draft',
    goalType: 'business',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
]

describe('AmbitionLaddering', () => {
  it('should render in grid view by default', () => {
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={vi.fn()} />)

    // Grid view should show cards
    expect(screen.getByText('Improve team collaboration')).toBeInTheDocument()
    expect(screen.getByText('Complete project documentation')).toBeInTheDocument()
  })

  it('should toggle to list view when list button is clicked', async () => {
    const user = userEvent.setup()
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={vi.fn()} />)

    // Find and click the list view button
    const listButton = screen.getByLabelText('List view')
    await user.click(listButton)

    // Wait for list view to render
    await waitFor(() => {
      // List view should have table headers
      expect(screen.getByText('NAME')).toBeInTheDocument()
      expect(screen.getByText('AMBITION')).toBeInTheDocument()
      expect(screen.getByText('STATUS')).toBeInTheDocument()
    })
  })

  it('should toggle back to grid view when grid button is clicked', async () => {
    const user = userEvent.setup()
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={vi.fn()} />)

    // Switch to list view first
    const listButton = screen.getByLabelText('List view')
    await user.click(listButton)

    await waitFor(() => {
      expect(screen.getByText('NAME')).toBeInTheDocument()
    })

    // Switch back to grid view
    const gridButton = screen.getByLabelText('Grid view')
    await user.click(gridButton)

    // List headers should not be present in grid view
    await waitFor(() => {
      expect(screen.queryByText('NAME')).not.toBeInTheDocument()
    })
  })

  it.skip('should filter ambitions by search query', async () => {
    const user = userEvent.setup()
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={vi.fn()} />)

    const searchInput = screen.getByPlaceholderText('Search...')
    await user.type(searchInput, 'documentation')

    // Wait for debounce (300ms) + animation (300ms) to complete
    await waitFor(
      () => {
        expect(screen.getByText('Complete project documentation')).toBeInTheDocument()
        expect(screen.queryByText('Improve team collaboration')).not.toBeInTheDocument()
      },
      { timeout: 1000 },
    )
  })

  it('should call onAddAmbition when add button is clicked', async () => {
    const user = userEvent.setup()
    const onAddAmbition = vi.fn()
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={onAddAmbition} />)

    const addButton = screen.getByText('Add Laddered Ambition')
    await user.click(addButton)

    expect(onAddAmbition).toHaveBeenCalledTimes(1)
  })

  it('should show active state on grid button by default', () => {
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={vi.fn()} />)

    const gridButton = screen.getByLabelText('Grid view')
    expect(gridButton).toHaveAttribute('aria-selected', 'true')
  })

  it('should show active state on list button when in list view', async () => {
    const user = userEvent.setup()
    render(<AmbitionLaddering ambitions={mockAmbitions} onAddAmbition={vi.fn()} />)

    const listButton = screen.getByLabelText('List view')
    await user.click(listButton)

    await waitFor(() => {
      expect(listButton).toHaveAttribute('aria-selected', 'true')
    })
  })
})
