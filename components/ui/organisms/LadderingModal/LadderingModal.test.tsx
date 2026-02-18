// LadderingModal.test.tsx
import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import { LadderingModal } from './LadderingModal'

// --------------------
// Mocks
// --------------------

// next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// next/image -> plain img
vi.mock('next/image', () => ({
  default: (props: any) => {
    const src = typeof props.src === 'string' ? props.src : (props.src?.src ?? '')
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} src={src} />
  },
}))

// lucide-react icon
vi.mock('lucide-react', () => ({
  Link: (props: any) => <svg data-testid="link-icon" {...props} />,
}))

// ResponsiveModal mock - filter out React-invalid props before spreading
vi.mock('@/components/ui/molecules/ResponsiveModal', () => ({
  ResponsiveModal: ({
    children,
    open,
    title,
    'data-test-id': dataTestId,
    'aria-label': ariaLabel,
    desktopSize,
    mobileSize,
    overlayClose,
    customFooter,
    mobileBodyClassName,
    focusTrap,
    onClose,
    actions,
    className,
    ...rest
  }: any) => (
    <div
      data-testid="responsive-modal"
      data-open={String(open)}
      data-title={title}
      data-test-id={dataTestId}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </div>
  ),
}))

vi.mock('@/components/ui/foundations/Typography', () => ({
  Typography: ({ children }: any) => <span>{children}</span>,
}))

vi.mock('@/components/ui/atoms/Badge', () => ({
  Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}))

vi.mock('@/utils/cn', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}))

vi.mock('@/utils/generateInitialsAvatar', () => ({
  generateInitialsAvatarSrc: (name: string, opts: any) =>
    `initials://${name}?size=${opts?.size ?? ''}`,
}))

// useMediaQuery (we control behavior per-test)
const useMediaQueryMock = vi.fn()
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (...args: any[]) => useMediaQueryMock(...args),
}))

// BREAKPOINTS (only md is used)
vi.mock('@/common/breakpoints', () => ({
  BREAKPOINTS: { md: '(min-width: 768px)' },
}))

// --------------------
// Test data
// --------------------
const selectedGoal = {
  id: '1',
  uid: 'user-1',
  title: 'Improve onboarding flow',
  userName: 'Ada Lovelace',
  avatarUrl: '',
  status: 'awaiting_approval',
  progress: 50,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
} as any

const parentAmbitions = [
  {
    id: 'division',
    title: 'Division Ambition',
    userName: 'James Miller',
    avatarUrl: '',
  },
  {
    id: 'team',
    title: 'Team Ambition',
    userName: 'Sarah Johnson',
    avatarUrl: '',
  },
]

describe('<LadderingModal />', () => {
  beforeEach(() => {
    useMediaQueryMock.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders ResponsiveModal with correct props when open=true on desktop', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} data-testid="sut" />)

    const modal = screen.getByTestId('responsive-modal')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveAttribute('data-open', 'true')
    expect(modal).toHaveAttribute('data-title', 'title')
    expect(modal).toHaveAttribute('data-test-id', 'sut')
  })

  it('renders ResponsiveModal on mobile with correct props', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} data-testid="sut" />)

    const modal = screen.getByTestId('responsive-modal')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveAttribute('data-open', 'true')
    expect(modal).toHaveAttribute('data-title', 'title')
    expect(modal).toHaveAttribute('data-test-id', 'sut')
  })

  it('renders parent ambitions and goal preview content', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(
      <LadderingModal
        open
        onClose={vi.fn()}
        selectedGoal={selectedGoal}
        parentAmbitions={parentAmbitions}
        data-testid="sut"
      />,
    )

    // Ambition cards
    expect(screen.getByTestId('ambition-card-division')).toBeInTheDocument()
    expect(screen.getByTestId('ambition-card-team')).toBeInTheDocument()

    // Link buttons aria-label from translations -> key string in mock
    const linkButtons = screen.getAllByRole('button', { name: 'linkButtonAriaLabel' })
    expect(linkButtons).toHaveLength(2)

    // Goal preview card
    expect(screen.getByTestId('goal-preview-card')).toBeInTheDocument()
    expect(screen.getByText('Improve onboarding flow')).toBeInTheDocument()
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument()
    expect(screen.getByTestId('ambition-status')).toBeInTheDocument()
  })

  it('passes open=false to ResponsiveModal when closed', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(<LadderingModal open={false} onClose={vi.fn()} selectedGoal={selectedGoal} />)

    const modal = screen.getByTestId('responsive-modal')
    expect(modal).toHaveAttribute('data-open', 'false')
  })

  it('renders with translated title', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />)

    const modal = screen.getByTestId('responsive-modal')
    // Our mock uses the key string as the value
    expect(modal).toHaveAttribute('data-title', 'title')
    // Note: LadderingModal doesn't explicitly pass aria-label, it relies on ResponsiveModal's default behavior
    // which uses the title as aria-label when not provided
  })
})
