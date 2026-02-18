import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import { NewAmbitionModal } from './NewAmbitionModal'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        image: '/avatar.png',
      },
    },
    status: 'authenticated',
  }),
}))

const useMediaQueryMock = vi.fn()
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (...args: any[]) => useMediaQueryMock(...args),
}))

vi.mock('@/common/breakpoints', () => ({
  BREAKPOINTS: { md: '(min-width: 768px)' },
}))

const enqueueToastSpy = vi.fn()

vi.mock('@/stores/ui.store', () => ({
  useUIStore: () => ({
    enqueueToast: enqueueToastSpy,
  }),
}))

const createGoalSpy = vi.fn()

vi.mock('@/stores/goals.store', () => ({
  useGoalsStore: () => ({
    createGoal: createGoalSpy,
    goalFilters: null,
  }),
}))

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

vi.mock('../NewAmbitionForm', () => ({
  NewAmbitionForm: () => <div data-testid="new-ambition-form" />,
}))

describe('<NewAmbitionModal />', () => {
  beforeEach(() => {
    enqueueToastSpy.mockClear()
    createGoalSpy.mockClear()
    useMediaQueryMock.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders ResponsiveModal with correct props when open=true on desktop', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(<NewAmbitionModal open onClose={vi.fn()} data-test-id="sut" />)

    const modal = screen.getByTestId('responsive-modal')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveAttribute('data-open', 'true')
    expect(modal).toHaveAttribute('data-title', 'title')
    expect(modal).toHaveAttribute('data-test-id', 'sut')
  })

  it('renders ResponsiveModal on mobile with correct props', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(<NewAmbitionModal open onClose={vi.fn()} data-test-id="sut" />)

    const modal = screen.getByTestId('responsive-modal')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveAttribute('data-open', 'true')
    expect(modal).toHaveAttribute('data-title', 'title')
    expect(modal).toHaveAttribute('data-test-id', 'sut')
  })

  it('renders NewAmbitionForm inside modal', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(<NewAmbitionModal open onClose={vi.fn()} />)

    expect(screen.getByTestId('new-ambition-form')).toBeInTheDocument()
  })

  it('passes open=false to ResponsiveModal when closed', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(<NewAmbitionModal open={false} onClose={vi.fn()} />)

    const modal = screen.getByTestId('responsive-modal')
    expect(modal).toHaveAttribute('data-open', 'false')
  })
})
