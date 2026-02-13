import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { EditAmbitionForm } from './EditAmbitionForm'
import type { GoalUI } from '@/domain/goal'
import { GOAL_TYPES } from '@/domain/goal'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

const useMediaQueryMock = vi.fn()
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (...args: unknown[]) => useMediaQueryMock(...args),
}))

vi.mock('@/common/breakpoints', () => ({
  BREAKPOINTS: { md: '(min-width: 768px)' },
}))

const mockGoalFilters = {
  avatarSelector: {
    options: [
      { uid: 'user-1', name: 'John Doe', role: 'Manager', url: '/avatar1.png' },
      { uid: 'user-2', name: 'Jane Smith', role: 'Developer', url: '/avatar2.png' },
    ],
  },
}

const mockGoals: GoalUI[] = [
  {
    id: 'goal-1',
    uid: 'user-1',
    title: 'Parent Goal 1',
    description: 'Description 1',
    status: 'in_progress',
    goalType: GOAL_TYPES.BUSINESS,
    userName: 'John Doe',
    avatarUrl: '/avatar1.png',
    progress: 50,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ladderedGoals: [],
    goalAchievements: [],
    goalActions: [],
  },
  {
    id: 'goal-2',
    uid: 'user-2',
    title: 'Parent Goal 2',
    description: 'Description 2',
    status: 'approved',
    goalType: GOAL_TYPES.BUSINESS,
    userName: 'Jane Smith',
    avatarUrl: '/avatar2.png',
    progress: 75,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ladderedGoals: [],
    goalAchievements: [],
    goalActions: [],
  },
]

vi.mock('@/stores/goals.store', () => ({
  useGoalsStore: (selector?: (state: unknown) => unknown) => {
    const state = {
      goalFilters: mockGoalFilters,
      goals: mockGoals,
      list: mockGoals,
    }
    return selector ? selector(state) : state
  },
}))

const createMockGoal = (overrides?: Partial<GoalUI>): GoalUI => ({
  id: 'test-goal-1',
  uid: 'user-1',
  title: 'Test Goal Title',
  description: 'Test goal description',
  status: 'draft',
  goalType: GOAL_TYPES.BUSINESS,
  userName: 'John Doe',
  avatarUrl: '/avatar1.png',
  progress: 25,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  ladderedGoals: [],
  parent: { id: 'goal-1', title: 'Parent Goal 1' },
  goalAchievements: [
    { id: 'ach-1', title: 'Achievement 1', status: 'pending', progress: null },
    { id: 'ach-2', title: 'Achievement 2', status: 'pending', progress: null },
  ],
  goalActions: [
    { id: 'act-1', title: 'Action 1', status: 'pending' },
    { id: 'act-2', title: 'Action 2', status: 'pending' },
  ],
  ...overrides,
})

describe('EditAmbitionForm', () => {
  beforeEach(() => {
    useMediaQueryMock.mockReturnValue(true) // Desktop by default
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('Form Initialization', () => {
    it('initializes with goal data on step 1', () => {
      const goal = createMockGoal()

      render(<EditAmbitionForm goal={goal} step={1} />)

      // Goal type should be pre-selected (Business)
      const businessTab = screen.getByRole('tab', { name: /type\.business/i })
      expect(businessTab).toHaveAttribute('aria-selected', 'true')
    })

    it('initializes with goal title and description on step 2', () => {
      const goal = createMockGoal({ title: 'My Test Goal' })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const titleInput = screen.getByPlaceholderText('ambitionName.placeholder')
      expect(titleInput).toHaveValue('My Test Goal')
    })

    it('initializes with existing actions from goal', () => {
      const goal = createMockGoal({
        goalActions: [
          { id: 'act-1', title: 'First Action', status: 'pending' },
          { id: 'act-2', title: 'Second Action', status: 'pending' },
        ],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const actionInputs = screen.getAllByPlaceholderText('planActions.placeholder')
      expect(actionInputs[0]).toHaveValue('First Action')
      expect(actionInputs[1]).toHaveValue('Second Action')
    })

    it('initializes with existing achievements from goal', () => {
      const goal = createMockGoal({
        goalAchievements: [
          { id: 'ach-1', title: 'First Achievement', status: 'pending', progress: null },
          { id: 'ach-2', title: 'Second Achievement', status: 'pending', progress: null },
        ],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const achievementInputs = screen.getAllByPlaceholderText('achievements.placeholder')
      expect(achievementInputs[0]).toHaveValue('First Achievement')
      expect(achievementInputs[1]).toHaveValue('Second Achievement')
    })

    it('initializes with empty actions when goal has no actions', () => {
      const goal = createMockGoal({ goalActions: [] })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const actionInputs = screen.getAllByPlaceholderText('planActions.placeholder')
      expect(actionInputs).toHaveLength(3) // Default 3 empty fields
      actionInputs.forEach((input) => {
        expect(input).toHaveValue('')
      })
    })

    it('initializes with parent goal when goal has parent', () => {
      const goal = createMockGoal({
        parent: { id: 'goal-1', title: 'Parent Goal 1' },
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      // The ladderedFrom select should be visible for business goals
      expect(screen.getByText('ladderedFrom.label')).toBeInTheDocument()
    })
  })

  describe('Validation Logic', () => {
    it('calls onValidationChange with true when owner is selected on step 1', () => {
      const goal = createMockGoal({ uid: 'user-1' })
      const onValidationChange = vi.fn()

      render(<EditAmbitionForm goal={goal} step={1} onValidationChange={onValidationChange} />)

      expect(onValidationChange).toHaveBeenCalledWith(true)
    })

    it('calls onValidationChange with false when owner is empty on step 1', () => {
      const goal = createMockGoal({ uid: '' })
      const onValidationChange = vi.fn()

      render(<EditAmbitionForm goal={goal} step={1} onValidationChange={onValidationChange} />)

      expect(onValidationChange).toHaveBeenCalledWith(false)
    })

    it('validates step 2 requires ambition name', async () => {
      const goal = createMockGoal({ title: '' })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={2} validateRef={validateRef} />)

      const isValid = validateRef.current?.()
      expect(isValid).toBe(false)
    })

    it('validates step 2 requires at least one action', async () => {
      const goal = createMockGoal({
        title: 'Valid Title',
        goalActions: [],
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement', status: 'pending', progress: null },
        ],
      })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={2} validateRef={validateRef} />)

      const isValid = validateRef.current?.()
      expect(isValid).toBe(false)
    })

    it('validates step 2 requires at least one achievement', async () => {
      const goal = createMockGoal({
        title: 'Valid Title',
        goalActions: [{ id: 'act-1', title: 'Action', status: 'pending' }],
        goalAchievements: [],
      })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={2} validateRef={validateRef} />)

      const isValid = validateRef.current?.()
      expect(isValid).toBe(false)
    })

    it('validates step 2 requires ladderedFrom for business goals', async () => {
      const goal = createMockGoal({
        title: 'Valid Title',
        goalType: GOAL_TYPES.BUSINESS,
        parent: undefined,
        goalActions: [{ id: 'act-1', title: 'Action', status: 'pending' }],
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement', status: 'pending', progress: null },
        ],
      })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={2} validateRef={validateRef} />)

      const isValid = validateRef.current?.()
      expect(isValid).toBe(false)
    })

    it('does not require ladderedFrom for non-business goals', async () => {
      const goal = createMockGoal({
        title: 'Valid Title',
        goalType: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        parent: undefined,
        goalActions: [{ id: 'act-1', title: 'Action', status: 'pending' }],
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement', status: 'pending', progress: null },
        ],
      })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>
      const onValidationChange = vi.fn()

      render(
        <EditAmbitionForm
          goal={goal}
          step={2}
          validateRef={validateRef}
          onValidationChange={onValidationChange}
        />,
      )

      const isValid = validateRef.current?.()
      expect(isValid).toBe(true)
    })
  })

  describe('User Interactions', () => {
    it('allows changing goal type', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({ goalType: GOAL_TYPES.BUSINESS })

      render(<EditAmbitionForm goal={goal} step={1} />)

      const growthTab = screen.getByRole('tab', { name: /type\.growth/i })
      await user.click(growthTab)

      expect(growthTab).toHaveAttribute('aria-selected', 'true')
    })

    it('allows changing privacy setting', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal()

      render(<EditAmbitionForm goal={goal} step={1} />)

      const privateTab = screen.getByRole('tab', { name: /privacy\.private/i })
      await user.click(privateTab)

      expect(privateTab).toHaveAttribute('aria-selected', 'true')
    })

    it('allows editing ambition name', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({ title: 'Original Title' })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const titleInput = screen.getByPlaceholderText('ambitionName.placeholder')
      await user.clear(titleInput)
      await user.type(titleInput, 'Updated Title')

      expect(titleInput).toHaveValue('Updated Title')
    })

    it('allows adding new action', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({
        goalActions: [{ id: 'act-1', title: 'Existing Action', status: 'pending' }],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const addButton = screen.getByRole('button', { name: /planActions\.addAction/i })
      await user.click(addButton)

      const actionInputs = screen.getAllByPlaceholderText('planActions.placeholder')
      expect(actionInputs).toHaveLength(2)
    })

    it('allows removing action (except first one)', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({
        goalActions: [
          { id: 'act-1', title: 'Action 1', status: 'pending' },
          { id: 'act-2', title: 'Action 2', status: 'pending' },
        ],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const removeButtons = screen.getAllByRole('button', { name: /planActions\.removeAction/i })
      await user.click(removeButtons[0])

      const actionInputs = screen.getAllByPlaceholderText('planActions.placeholder')
      expect(actionInputs).toHaveLength(1)
    })

    it('allows editing action value', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({
        goalActions: [{ id: 'act-1', title: 'Original Action', status: 'pending' }],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const actionInput = screen.getByPlaceholderText('planActions.placeholder')
      await user.clear(actionInput)
      await user.type(actionInput, 'Updated Action')

      expect(actionInput).toHaveValue('Updated Action')
    })

    it('allows adding new achievement', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({
        goalAchievements: [
          { id: 'ach-1', title: 'Existing Achievement', status: 'pending', progress: null },
        ],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const addButton = screen.getByRole('button', { name: /achievements\.addAchievement/i })
      await user.click(addButton)

      const achievementInputs = screen.getAllByPlaceholderText('achievements.placeholder')
      expect(achievementInputs).toHaveLength(2)
    })

    it('allows removing achievement (except first one)', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement 1', status: 'pending', progress: null },
          { id: 'ach-2', title: 'Achievement 2', status: 'pending', progress: null },
        ],
      })

      render(<EditAmbitionForm goal={goal} step={2} />)

      const removeButtons = screen.getAllByRole('button', {
        name: /achievements\.removeAchievement/i,
      })
      await user.click(removeButtons[0])

      const achievementInputs = screen.getAllByPlaceholderText('achievements.placeholder')
      expect(achievementInputs).toHaveLength(1)
    })
  })

  describe('Form Data Submission', () => {
    it('calls onSubmit with form data on step 2', async () => {
      const goal = createMockGoal({
        title: 'Test Title',
        goalType: GOAL_TYPES.BUSINESS,
        parent: { id: 'goal-1', title: 'Parent' },
        goalActions: [{ id: 'act-1', title: 'Action 1', status: 'pending' }],
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement 1', status: 'pending', progress: null },
        ],
      })
      const onSubmit = vi.fn()

      render(<EditAmbitionForm goal={goal} step={2} onSubmit={onSubmit} />)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            goalType: GOAL_TYPES.BUSINESS,
            ambitionName: 'Test Title',
            actions: ['Action 1'],
            achievements: ['Achievement 1'],
          }),
        )
      })
    })

    it('filters out empty actions and achievements from form data', async () => {
      const goal = createMockGoal({
        title: 'Test Title',
        goalType: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        goalActions: [
          { id: 'act-1', title: 'Valid Action', status: 'pending' },
          { id: 'act-2', title: '', status: 'pending' },
        ],
        goalAchievements: [
          { id: 'ach-1', title: 'Valid Achievement', status: 'pending', progress: null },
          { id: 'ach-2', title: '', status: 'pending', progress: null },
        ],
      })
      const onSubmit = vi.fn()

      render(<EditAmbitionForm goal={goal} step={2} onSubmit={onSubmit} />)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            actions: ['Valid Action'],
            achievements: ['Valid Achievement'],
          }),
        )
      })
    })
  })

  describe('Goal Reset on Change', () => {
    it('resets form when goal prop changes', async () => {
      const initialGoal = createMockGoal({ title: 'Initial Title' })
      const updatedGoal = createMockGoal({ title: 'Updated Title' })

      const { rerender } = render(<EditAmbitionForm goal={initialGoal} step={2} />)

      expect(screen.getByPlaceholderText('ambitionName.placeholder')).toHaveValue('Initial Title')

      rerender(<EditAmbitionForm goal={updatedGoal} step={2} />)

      expect(screen.getByPlaceholderText('ambitionName.placeholder')).toHaveValue('Updated Title')
    })
  })

  describe('Mobile Rendering', () => {
    it('renders RadioGroup instead of Switcher on mobile for step 1', () => {
      useMediaQueryMock.mockReturnValue(false) // Mobile
      const goal = createMockGoal()

      render(<EditAmbitionForm goal={goal} step={1} />)

      // On mobile, it uses RadioGroup which has role="radiogroup"
      expect(screen.getByRole('radiogroup', { name: /type\.label/i })).toBeInTheDocument()
    })

    it('renders Switcher on desktop for step 1', () => {
      useMediaQueryMock.mockReturnValue(true) // Desktop
      const goal = createMockGoal()

      render(<EditAmbitionForm goal={goal} step={1} />)

      // On desktop, it uses Switcher which has role="tablist"
      expect(screen.getByRole('tablist', { name: /type\.label/i })).toBeInTheDocument()
    })
  })

  describe('Error States', () => {
    it('shows owner error when validation fails on step 1', async () => {
      const goal = createMockGoal({ uid: '' })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={1} validateRef={validateRef} />)

      validateRef.current?.()

      await waitFor(() => {
        expect(screen.getByText('owner.error')).toBeInTheDocument()
      })
    })

    it('shows ambition name error when validation fails on step 2', async () => {
      const goal = createMockGoal({
        title: '',
        goalActions: [{ id: 'act-1', title: 'Action', status: 'pending' }],
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement', status: 'pending', progress: null },
        ],
      })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={2} validateRef={validateRef} />)

      validateRef.current?.()

      await waitFor(() => {
        expect(screen.getByText('ambitionName.error')).toBeInTheDocument()
      })
    })

    it('clears action error when user types valid action', async () => {
      const user = userEvent.setup()
      const goal = createMockGoal({
        title: 'Title',
        goalActions: [],
        goalAchievements: [
          { id: 'ach-1', title: 'Achievement', status: 'pending', progress: null },
        ],
        parent: { id: 'goal-1', title: 'Parent' },
      })
      const validateRef = { current: null } as React.MutableRefObject<(() => boolean) | null>

      render(<EditAmbitionForm goal={goal} step={2} validateRef={validateRef} />)

      // Trigger validation to show error
      validateRef.current?.()

      await waitFor(() => {
        expect(screen.getByText('planActions.error')).toBeInTheDocument()
      })

      // Type in an action to clear the error
      const actionInput = screen.getAllByPlaceholderText('planActions.placeholder')[0]
      await user.type(actionInput, 'New Action')

      await waitFor(() => {
        expect(screen.queryByText('planActions.error')).not.toBeInTheDocument()
      })
    })
  })

  describe('Data Test ID', () => {
    it('forwards data-test-id to container', () => {
      const goal = createMockGoal()

      const { container } = render(
        <EditAmbitionForm goal={goal} step={1} data-test-id="edit-ambition-form" />,
      )

      expect(container.querySelector('[data-test-id="edit-ambition-form"]')).toBeInTheDocument()
    })
  })
})
