import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import { NewAmbitionModal } from './NewAmbitionModal'

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')
  return {
    ...actual,
    useEffectEvent: (fn: any) => fn,
  }
})

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

const openModalSpy = vi.fn()
const closeModalSpy = vi.fn()
const closeAllSpy = vi.fn()
const enqueueToastSpy = vi.fn()

vi.mock('@/stores/ui.store', () => ({
  useUIStore: () => ({
    openModal: openModalSpy,
    closeModal: closeModalSpy,
    closeAll: closeAllSpy,
    enqueueToast: enqueueToastSpy,
  }),
}))

const createGoalSpy = vi.fn()

vi.mock('@/stores/goals.store', () => ({
  useGoalsStore: () => ({
    createGoal: createGoalSpy,
  }),
}))

vi.mock('@/components/ui/molecules/Modal', () => ({
  ModalHeader: ({ children }: any) => <div data-testid="modal-header">{children}</div>,
  ModalBody: ({ children }: any) => <div data-testid="modal-body">{children}</div>,
}))

vi.mock('@/components/ui/atoms/Drawer', () => ({
  Drawer: ({ children, open, title, ...rest }: any) => (
    <div data-testid="drawer" data-open={String(open)} data-title={title} {...rest}>
      {children}
    </div>
  ),
}))

vi.mock('../NewAmbitionForm', () => ({
  NewAmbitionForm: () => <div data-testid="new-ambition-form" />,
}))

describe('<NewAmbitionModal />', () => {
  beforeEach(() => {
    openModalSpy.mockClear()
    closeModalSpy.mockClear()
    closeAllSpy.mockClear()
    enqueueToastSpy.mockClear()
    createGoalSpy.mockClear()
    useMediaQueryMock.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('opens desktop modal via UI store when open=true on desktop', () => {
    useMediaQueryMock.mockReturnValue(true)

    render(<NewAmbitionModal open onClose={vi.fn()} data-test-id="sut" />)

    expect(openModalSpy).toHaveBeenCalledTimes(1)
    const [desktopModalNode, options] = openModalSpy.mock.calls[0]
    expect(desktopModalNode).toBeTruthy()
    expect(options).toMatchObject({
      size: 'full',
      overlayClose: true,
      'aria-label': 'title',
    })
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument()
  })

  it('renders Drawer on mobile and skips desktop modal', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(<NewAmbitionModal open onClose={vi.fn()} data-test-id="sut" />)

    const drawer = screen.getByTestId('drawer')
    expect(drawer).toBeInTheDocument()
    expect(drawer).toHaveAttribute('data-open', 'true')
    expect(drawer).toHaveAttribute('data-title', 'title')
    expect(drawer).toHaveAttribute('data-test-id', 'sut')
    expect(openModalSpy).not.toHaveBeenCalled()
  })

  it('closes desktop modal when open=false on desktop', () => {
    useMediaQueryMock.mockReturnValue(true)

    const { rerender } = render(<NewAmbitionModal open onClose={vi.fn()} />)
    expect(openModalSpy).toHaveBeenCalledTimes(1)

    rerender(<NewAmbitionModal open={false} onClose={vi.fn()} />)

    expect(closeAllSpy).toHaveBeenCalledTimes(1)
  })
})
