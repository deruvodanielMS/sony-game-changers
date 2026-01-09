// LadderingModal.test.tsx
import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import { LadderingModal } from './LadderingModal'

// --------------------
// Mocks
// --------------------

// React: polyfill useEffectEvent for test envs that don't have it
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')
  return {
    ...actual,
    useEffectEvent: (fn: any) => fn,
  }
})

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

// UI components (lightweight)
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

vi.mock('@/components/ui/foundations/Typography', () => ({
  Typography: ({ children }: any) => <span>{children}</span>,
}))

vi.mock('@/components/ui/molecules/GoalStatus/GoalStatus', () => ({
  GoalStatus: ({ status }: any) => <span data-testid="goal-status">{String(status)}</span>,
}))

vi.mock('@/utils/cn', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}))

vi.mock('@/utils/generateInitialsAvatar', () => ({
  generateInitialsAvatarSrc: (name: string, opts: any) =>
    `initials://${name}?size=${opts?.size ?? ''}`,
}))

// useMediaQuery (we control behavior per-test)
const useMediaQueryMock = vi.fn<boolean, any[]>()
vi.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: (...args: any[]) => useMediaQueryMock(...args),
}))

// BREAKPOINTS (only md is used)
vi.mock('@/common/breakpoints', () => ({
  BREAKPOINTS: { md: '(min-width: 768px)' },
}))

// UI store hook
const openModalSpy = vi.fn()
const closeModalSpy = vi.fn()

vi.mock('@/stores/ui.store', () => ({
  useUIStore: () => ({
    openModal: openModalSpy,
    closeModal: closeModalSpy,
  }),
}))

// --------------------
// Test data
// --------------------
const selectedGoal = {
  title: 'Improve onboarding flow',
  userName: 'Ada Lovelace',
  avatarUrl: '',
  status: 'active',
} as any

describe('<LadderingModal />', () => {
  beforeEach(() => {
    openModalSpy.mockClear()
    closeModalSpy.mockClear()
    useMediaQueryMock.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('opens desktop modal via UI store when open=true and media query matches md (desktop)', () => {
    // useMediaQuery(BREAKPOINTS.md) === true => isMobile = !true => false
    useMediaQueryMock.mockReturnValue(true)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} data-testid="sut" />)

    expect(openModalSpy).toHaveBeenCalledTimes(1)
    const [desktopModalNode, options] = openModalSpy.mock.calls[0]
    expect(desktopModalNode).toBeTruthy()
    expect(options).toMatchObject({
      size: 'lg',
      overlayClose: true,
    })
    expect(typeof options.onClose).toBe('function')

    // Desktop path returns null (content is rendered via openModal)
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument()
  })

  it('closes desktop modal via UI store when open=false on desktop', () => {
    useMediaQueryMock.mockReturnValue(true)

    const { rerender } = render(
      <LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />,
    )
    expect(openModalSpy).toHaveBeenCalledTimes(1)

    rerender(<LadderingModal open={false} onClose={vi.fn()} selectedGoal={selectedGoal} />)

    expect(closeModalSpy).toHaveBeenCalledTimes(1)
  })

  it('renders Drawer on mobile (media query does NOT match md) and shows ambition cards + goal preview', () => {
    // useMediaQuery(BREAKPOINTS.md) === false => isMobile = !false => true
    useMediaQueryMock.mockReturnValue(false)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} data-testid="sut" />)

    // Drawer should render in-tree for mobile
    const drawer = screen.getByTestId('drawer')
    expect(drawer).toBeInTheDocument()
    expect(drawer).toHaveAttribute('data-open', 'true')

    // Drawer receives data-test-id (note: prop name is data-test-id, not data-testid)
    expect(drawer).toHaveAttribute('data-test-id', 'sut')

    // No desktop modal usage on mobile
    expect(openModalSpy).not.toHaveBeenCalled()

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
    expect(screen.getByTestId('goal-status')).toHaveTextContent('active')
  })

  it('closes desktop modal when switching from desktop to mobile while open=true', () => {
    // Start desktop
    useMediaQueryMock.mockReturnValue(true)
    const { rerender } = render(
      <LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />,
    )
    expect(openModalSpy).toHaveBeenCalledTimes(1)
    expect(closeModalSpy).toHaveBeenCalledTimes(0)

    // Switch to mobile
    useMediaQueryMock.mockReturnValue(false)
    rerender(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />)

    // When isMobile becomes true, effect should call toggleModal(false) => closeModal()
    expect(closeModalSpy).toHaveBeenCalledTimes(1)

    // And Drawer should now be rendered
    expect(screen.getByTestId('drawer')).toBeInTheDocument()
  })

  it('does not open desktop modal if isMobile is true (even when open=true)', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />)

    expect(openModalSpy).not.toHaveBeenCalled()
    expect(screen.getByTestId('drawer')).toBeInTheDocument()
  })

  it('when open=true but isMobile is "unknown"/null, it does not open modal (guards with isMobile != null)', () => {
    // Some media query hooks can return null before hydration.
    // Component uses: const isMobile = !useMediaQuery(...)
    // If useMediaQuery returns null, isMobile becomes true (because !null === true)
    // => mobile path. This test documents that behavior.
    // If your hook *actually* returns undefined, !undefined === true as well.
    useMediaQueryMock.mockReturnValue(null as never)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />)

    expect(openModalSpy).not.toHaveBeenCalled()
    expect(screen.getByTestId('drawer')).toBeInTheDocument()
  })

  it('passes translated title to Drawer title and aria-label', () => {
    useMediaQueryMock.mockReturnValue(false)

    render(<LadderingModal open onClose={vi.fn()} selectedGoal={selectedGoal} />)

    const drawer = screen.getByTestId('drawer')
    // Our Drawer mock puts title into data-title
    expect(drawer).toHaveAttribute('data-title', 'title')
    // aria-label should also be set
    expect(drawer).toHaveAttribute('aria-label', 'title')
  })
})
