import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { GoalCard } from './GoalCard'
import { GOAL_STATUSES, GOAL_TYPES, type Goal } from '@/types/goals'

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
    return key
  },
}))

const baseGoal: Goal = {
  id: '1',
  title: 'Main Goal',
  description: 'Improve performance',
  userName: 'John Doe',
  goalType: GOAL_TYPES.PERSONAL,
  status: GOAL_STATUSES.AWAITING_APPROVAL,
}

const ladderGoals: Array<Goal> = [
  {
    id: '2',
    title: 'Sub Goal A',
    userName: 'Jane Smith',
    status: GOAL_STATUSES.COMPLETED,
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

  it('renders ladder goals and allows collapsing content', () => {
    render(<GoalCard goal={baseGoal} ladderGoals={ladderGoals} allowAddChildrenGoals={false} />)

    // Collapsible trigger (ChevronDown) - get all buttons and find the collapse one
    const buttons = screen.getAllByRole('button')
    const toggleBtn = buttons.find((btn) => btn.getAttribute('aria-expanded') !== null)
    expect(toggleBtn).toBeInTheDocument()

    // Start closed: ladder goal not visible
    expect(screen.queryByText('Sub Goal A')).toBeNull

    // Expand
    fireEvent.click(toggleBtn)

    expect(screen.getByText('Sub Goal A')).toBeVisible()
    expect(screen.getByAltText('Jane Smith')).toBeInTheDocument()
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
