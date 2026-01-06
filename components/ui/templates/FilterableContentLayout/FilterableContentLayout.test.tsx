import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { FilterableContentLayout } from './FilterableContentLayout'
import type { FilterableContentLayoutProps } from './FilterableContentLayout.types'

// Mock hooks
vi.mock('@/hooks/useScrollDirection', () => ({
  useScrollDirection: () => ({ scrollDirection: 'up', scrollY: 0 }),
}))

const messages = {
  Goals: {
    filters: {
      clearAll: 'Clear all',
      clearFieldsButton: 'Clear fields',
      showStatus: 'Show {count} status',
      hideStatus: 'Hide status',
      showCategory: 'Show {count} category',
      hideCategory: 'Hide category',
    },
  },
}

const renderWithIntl = (ui: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const mockTranslations = {
  filtersButton: 'Filters',
  searchLabel: 'Search',
  filterByLabel: 'Filter by',
  teamMembersLabel: 'Team Members',
  clearAll: 'Clear All',
  showResults: 'Show Results',
}

const mockFilters = [
  {
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' },
    ],
    selected: [],
    onSelect: vi.fn(),
  },
]

const mockAvatarSelector = {
  options: [
    { uid: '1', name: 'User 1', url: '/avatar1.png' },
    { uid: '2', name: 'User 2', url: '/avatar2.png' },
  ],
  selected: [],
  onAvatarSelect: vi.fn(),
  showItems: 4,
}

const mockSearchField = {
  value: '',
  onChange: vi.fn(),
  placeholder: 'Search...',
  label: 'Search',
}

const defaultProps: FilterableContentLayoutProps = {
  header: <div>Test Header</div>,
  children: <div>Test Content</div>,
  filters: mockFilters,
  drawerTitle: 'Filter Options',
  translations: mockTranslations,
  onClearFilters: vi.fn(),
}

describe('FilterableContentLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders header and content', () => {
    renderWithIntl(<FilterableContentLayout {...defaultProps} />)

    expect(screen.getByText('Test Header')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders mobile filter button', async () => {
    renderWithIntl(<FilterableContentLayout {...defaultProps} />)

    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: /filters/i })
      expect(filterButton).toBeInTheDocument()
    })
  })

  it('opens filter drawer when filter button is clicked', async () => {
    const user = userEvent.setup()

    renderWithIntl(<FilterableContentLayout {...defaultProps} />)

    const filterButton = screen.getByRole('button', { name: /filters/i })
    await user.click(filterButton)

    await waitFor(() => {
      expect(screen.getByText('Filter Options')).toBeInTheDocument()
    })
  })

  it('displays active filter count badge when filters are active', () => {
    renderWithIntl(<FilterableContentLayout {...defaultProps} activeFiltersCount={3} />)

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onClearFilters when clear button is clicked in drawer', async () => {
    const user = userEvent.setup()
    const onClearFilters = vi.fn()

    renderWithIntl(
      <FilterableContentLayout
        {...defaultProps}
        onClearFilters={onClearFilters}
        activeFiltersCount={2}
      />,
    )

    const filterButton = screen.getByRole('button', { name: /filters/i })
    await user.click(filterButton)

    await waitFor(async () => {
      const clearButton = screen.getByRole('button', { name: /clear all/i })
      await user.click(clearButton)
      expect(onClearFilters).toHaveBeenCalled()
    })
  })

  it('renders search field when provided', async () => {
    const user = userEvent.setup()

    renderWithIntl(<FilterableContentLayout {...defaultProps} searchField={mockSearchField} />)

    const filterButton = screen.getByRole('button', { name: /filters/i })
    await user.click(filterButton)

    await waitFor(() => {
      const searchFields = screen.getAllByPlaceholderText('Search...')
      expect(searchFields.length).toBeGreaterThan(0)
    })
  })

  it('renders avatar selector when provided', async () => {
    const user = userEvent.setup()

    renderWithIntl(
      <FilterableContentLayout {...defaultProps} avatarSelector={mockAvatarSelector} />,
    )

    const filterButton = screen.getByRole('button', { name: /filters/i })
    await user.click(filterButton)

    await waitFor(() => {
      expect(screen.getByText('Team Members')).toBeInTheDocument()
    })
  })

  it('renders primary action button when provided', () => {
    const primaryAction = <button data-testid="new-goal-button">New Goal</button>

    renderWithIntl(<FilterableContentLayout {...defaultProps} primaryAction={primaryAction} />)

    expect(screen.getAllByTestId('new-goal-button').length).toBeGreaterThan(0)
  })

  it('closes drawer when show results button is clicked', async () => {
    const user = userEvent.setup()

    renderWithIntl(<FilterableContentLayout {...defaultProps} />)

    const filterButton = screen.getByRole('button', { name: /filters/i })
    await user.click(filterButton)

    await waitFor(async () => {
      const showResultsButton = screen.getByRole('button', { name: /show results/i })
      await user.click(showResultsButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('Filter Options')).not.toBeInTheDocument()
    })
  })

  it('disables clear button when no filters are active', async () => {
    const user = userEvent.setup()

    renderWithIntl(<FilterableContentLayout {...defaultProps} activeFiltersCount={0} />)

    const filterButton = screen.getByRole('button', { name: /filters/i })
    await user.click(filterButton)

    await waitFor(() => {
      const clearButton = screen.getByRole('button', { name: /clear all/i })
      expect(clearButton).toBeDisabled()
    })
  })

  it('applies custom content className', () => {
    const { container } = renderWithIntl(
      <FilterableContentLayout {...defaultProps} contentClassName="custom-class" />,
    )

    const contentDiv = container.querySelector('.custom-class')
    expect(contentDiv).toBeInTheDocument()
  })
})
