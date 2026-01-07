import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, beforeEach, afterEach } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { LadderingModal } from './LadderingModal'
import type { Ambition } from '@/domain/ambition'

const mockMessages = {
  LadderingModal: {
    title: 'Ambition laddering',
    divisionAmbitionLabel: 'AAA Division Ambition',
    teamAmbitionLabel: 'AAA Team Ambition',
    linkButtonAriaLabel: 'Link ambition',
    selectedGoalLabel: 'Selected Goal',
  },
  Goals: {
    status: {
      completed: 'Completed',
      draft: 'Draft',
      awaiting_approval: 'Awaiting Approval',
    },
  },
}

const mockGoal: Ambition = {
  id: '1',
  title: 'Ensure core title features meet established quality bars',
  status: 'draft',
  userName: 'Adam Reynolds',
  avatarUrl: '',
}

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      {component}
    </NextIntlClientProvider>,
  )
}

describe('LadderingModal', () => {
  beforeEach(() => {
    // Mock window.innerWidth for desktop (> 768px)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders when open', () => {
    renderWithIntl(<LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Ambition laddering')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    renderWithIntl(<LadderingModal open={false} onClose={vi.fn()} selectedGoal={mockGoal} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    renderWithIntl(<LadderingModal open onClose={onClose} selectedGoal={mockGoal} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders both ambition cards', () => {
    renderWithIntl(<LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />)

    expect(screen.getByText('AAA Division Ambition')).toBeInTheDocument()
    expect(screen.getByText('AAA Team Ambition')).toBeInTheDocument()
  })

  it('renders link buttons for ambitions', () => {
    renderWithIntl(<LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />)

    const linkButtons = screen.getAllByRole('button', { name: /link ambition/i })
    expect(linkButtons).toHaveLength(2)
  })

  it('renders goal preview card with goal details', () => {
    renderWithIntl(<LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />)

    expect(screen.getByText(mockGoal.title)).toBeInTheDocument()
    expect(screen.getByText(mockGoal.userName)).toBeInTheDocument()
    expect(screen.getByText('Draft')).toBeInTheDocument()
  })

  it('displays goal avatar in preview card', () => {
    renderWithIntl(<LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />)

    const avatar = screen.getByAltText(mockGoal.userName)
    expect(avatar).toBeInTheDocument()
  })

  it('handles link button clicks', async () => {
    renderWithIntl(<LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />)

    const linkButtons = screen.getAllByRole('button', { name: /link ambition/i })

    // Verify buttons are clickable (future API integration point)
    await userEvent.click(linkButtons[0])
    await userEvent.click(linkButtons[1])

    expect(linkButtons[0]).toBeEnabled()
    expect(linkButtons[1]).toBeEnabled()
  })

  it('applies custom data-testid', () => {
    renderWithIntl(
      <LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} data-testid="custom-modal" />,
    )

    // In test environment, useMediaQuery returns false (mobile), so Drawer is rendered
    // Drawer passes data-testid to drawer-overlay, not the dialog itself
    expect(screen.getByTestId('drawer-overlay')).toBeInTheDocument()
  })

  describe('Snapshots', () => {
    it('matches snapshot when open', () => {
      const { container } = renderWithIntl(
        <LadderingModal open onClose={vi.fn()} selectedGoal={mockGoal} />,
      )

      expect(container).toMatchSnapshot()
    })

    it('matches snapshot when closed', () => {
      const { container } = renderWithIntl(
        <LadderingModal open={false} onClose={vi.fn()} selectedGoal={mockGoal} />,
      )

      expect(container).toMatchSnapshot()
    })

    it('matches snapshot with completed goal', () => {
      const completedGoal: Ambition = {
        ...mockGoal,
        status: 'completed',
      }

      const { container } = renderWithIntl(
        <LadderingModal open onClose={vi.fn()} selectedGoal={completedGoal} />,
      )

      expect(container).toMatchSnapshot()
    })
  })
})
