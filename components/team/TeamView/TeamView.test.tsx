import { fireEvent, render, screen } from '@testing-library/react'
import type { HTMLAttributes, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TeamView } from './TeamView'

const mockPush = vi.fn()
const mockUseMediaQuery = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: { count?: number }) => {
    if (key === 'totalMembers' && values?.count !== undefined) {
      return `Total members: ${values.count}`
    }
    return key
  },
}))

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (query: string) => mockUseMediaQuery(query),
}))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  m: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}))

vi.mock('@/components/ui/organisms/SectionHeader', () => ({
  SectionHeader: ({ title, description }: { title: string; description: string }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}))

vi.mock('@/components/ui/molecules/SearchField', () => ({
  SearchField: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string
    onChange: (value: string) => void
    placeholder: string
  }) => (
    <input
      aria-label="team-search"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}))

vi.mock('@/components/ui/molecules/Switcher', () => ({
  Switcher: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div>
      <button
        type="button"
        aria-pressed={value === 'grid'}
        aria-label="switch-grid"
        onClick={() => onChange('grid')}
      >
        Grid
      </button>
      <button
        type="button"
        aria-pressed={value === 'list'}
        aria-label="switch-list"
        onClick={() => onChange('list')}
      >
        List
      </button>
    </div>
  ),
}))

vi.mock('@/components/team/TeamMemberCard', () => ({
  TeamMemberCard: ({ name, onClick }: { name: string; onClick?: () => void }) => (
    <button type="button" onClick={onClick}>
      {name}
    </button>
  ),
}))

vi.mock('@/components/ui/molecules/EmptyState', () => ({
  EmptyState: ({ title }: { title: string }) => <div>{title}</div>,
}))

vi.mock('@/components/ui/atoms/Avatar', () => ({
  Avatar: ({ alt }: { alt: string }) => <span>{alt}</span>,
}))

const members = [
  { uid: 'user-1', name: 'Alice Doe', url: '/alice.png', role: 'Manager' },
  { uid: 'user-2', name: 'Bob Smith', url: '/bob.png', role: 'Developer' },
]

describe('TeamView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Desktop by default: matches md and lg
    mockUseMediaQuery.mockReturnValue(true)
  })

  it('renders only the search field in filter bar', () => {
    render(<TeamView members={members} />)

    expect(screen.getAllByRole('textbox')).toHaveLength(1)
  })

  it('navigates to ambitions with assignee when a member card is clicked', () => {
    render(<TeamView members={members} />)

    fireEvent.click(screen.getByRole('button', { name: 'Alice Doe' }))

    expect(mockPush).toHaveBeenCalledWith('/game-changers/ambitions?assignee=user-1')
  })

  it('navigates to ambitions on Enter key from list row', () => {
    render(<TeamView members={members} />)

    fireEvent.click(screen.getByRole('button', { name: 'switch-list' }))

    const rowButton = screen.getByRole('button', { name: /Bob Smith/i })
    fireEvent.keyDown(rowButton, { key: 'Enter' })

    expect(mockPush).toHaveBeenCalledWith('/game-changers/ambitions?assignee=user-2')
  })

  it('navigates to ambitions on Space key from list row', () => {
    render(<TeamView members={members} />)

    fireEvent.click(screen.getByRole('button', { name: 'switch-list' }))

    const rowButton = screen.getByRole('button', { name: /Alice Doe/i })
    fireEvent.keyDown(rowButton, { key: ' ' })

    expect(mockPush).toHaveBeenCalledWith('/game-changers/ambitions?assignee=user-1')
  })
})
