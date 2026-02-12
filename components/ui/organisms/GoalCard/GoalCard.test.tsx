import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { GoalCard } from './GoalCard'
import { GOAL_STATUSES, GOAL_TYPES, type Goal } from '@/domain/goal'

vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} />
  },
}))

vi.mock('@/utils/generateInitialsAvatar', () => ({
  generateInitialsAvatarSrc: vi.fn(() => 'generated-avatar.png'),
}))

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, vars?: any) => {
    if (key === 'childrenGoalsLabel') return `${vars.goals} goals`
    if (key === 'addLadderedGoalLabel') return 'Add child goal'
    if (key === 'viewLadderedGoalsLabel') return 'View laddered Ambitions'
    if (key === 'hideLadderedGoalsLabel') return 'Hide laddered Ambitions'
    if (key === 'hideLabel') return 'Hide'
    if (key === 'viewLabel') return 'View'
    return key
  },
}))

vi.mock('@/stores/ui.store', () => ({
  useUIStore: () => ({
    openModal: vi.fn(),
    closeModal: vi.fn(),
  }),
}))

vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(() => true), // Default to desktop
}))

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const baseGoal: Goal = {
  id: '1',
  uid: 'user-1',
  title: 'Main Goal',
  description: '',
  userName: 'John Doe',
  goalType: GOAL_TYPES.BUSINESS,
  status: GOAL_STATUSES.AWAITING_APPROVAL,
  progress: 40,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-02T00:00:00Z',
  parent: { id: '0', title: 'Improve performance' },
}

const ladderGoals: Array<Goal> = [
  {
    id: '2',
    uid: 'user-2',
    title: 'Sub Goal A',
    userName: 'Jane Smith',
    status: GOAL_STATUSES.COMPLETED,
    progress: 100,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
]

describe('GoalCard', () => {
  it('renders main goal information', () => {
    render(
      <GoalCard
        goal={baseGoal}
        ladderGoals={[]}
        allowAddChildrenGoals={false}
        data-testid="goal-card"
      />,
    )

    // Main card
    expect(screen.getByTestId('goal-card')).toBeInTheDocument()

    // Title
    expect(screen.getByText('Main Goal')).toBeInTheDocument()

    // Description
    expect(screen.getByText('Improve performance')).toBeInTheDocument()

    // Avatar alt text = userName
    expect(screen.getByAltText('John Doe')).toBeInTheDocument()
  })

  it('renders ladder goals and allows collapsing content', async () => {
    render(<GoalCard goal={baseGoal} ladderGoals={ladderGoals} allowAddChildrenGoals={false} />)

    // Initially open: should show ladder goal and "Hide laddered Ambitions" button
    expect(screen.getByText('Sub Goal A')).toBeInTheDocument()
    expect(screen.getByAltText('Jane Smith')).toBeInTheDocument()
    // Button contains both desktop ("Hide laddered Ambitions") and mobile ("Hide") text
    const hideButton = screen.getByRole('button', { name: /Hide laddered Ambitions/i })
    expect(hideButton).toBeInTheDocument()

    // Collapse by clicking the toggle button
    fireEvent.click(hideButton)

    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.queryByText('Sub Goal A')).toBeNull()
    })

    // Button text should change to "View laddered Ambitions"
    expect(screen.getByRole('button', { name: /View laddered Ambitions/i })).toBeInTheDocument()
  })

  it('shows add-child-goal button when allowed', () => {
    render(<GoalCard goal={baseGoal} ladderGoals={ladderGoals} allowAddChildrenGoals={true} />)

    // This string comes from the mocked translations
    expect(screen.getByText('Add child goal')).toBeInTheDocument()
  })

  it('shows children goals count label', () => {
    render(<GoalCard goal={baseGoal} ladderGoals={ladderGoals} allowAddChildrenGoals={false} />)

    // Translated text: “1 goals”
    expect(screen.getByText('1 goals')).toBeInTheDocument()
  })

  it('renders type icon when goalType is provided', () => {
    render(<GoalCard goal={baseGoal} ladderGoals={[]} allowAddChildrenGoals={false} />)

    // Goal type icons have role="img" because lucide-react icons do
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBeGreaterThan(0)
  })
})
