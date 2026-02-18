import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

import { AuthGuard } from './providers'

// --------------------
// Mocks
// --------------------
const signInMock = vi.fn()
const useSessionMock = vi.fn()

vi.mock('next-auth/react', () => ({
  signIn: (...args: any[]) => signInMock(...args),
  useSession: () => useSessionMock(),
  SessionProvider: ({ children, session }: any) => (
    <div data-testid="session-provider" data-session={session ? JSON.stringify(session) : ''}>
      {children}
    </div>
  ),
}))

let mockPathname: string | null = '/protected'
let mockSearchParamsString = ''

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => ({
    toString: () => mockSearchParamsString,
  }),
}))

// Spinner: lo reemplazamos por algo fácil de assert
vi.mock('@/components/ui/atoms/Spinner', () => ({
  Spinner: (props: any) => <div data-testid="spinner" data-size={props.size} />,
}))

const getUserMock = vi.fn()
vi.mock('@/stores/user.store', () => ({
  useUserStore: () => ({ getUser: getUserMock }),
}))

// Constante default
vi.mock('@/common/constants', () => ({
  DEFAULT_EMPLOYEE_EMAIL: 'default@company.com',
}))

describe('Providers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  test('when authEnabled is false it supplies dev session to SessionProvider', async () => {
    vi.doMock('@/auth', () => ({ authEnabled: false }))

    const { SessionProvider } = await import('./providers')

    render(
      <SessionProvider>
        <span>child</span>
      </SessionProvider>,
    )

    const provider = screen.getByTestId('session-provider')
    expect(provider).toBeInTheDocument()
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  test('when authEnabled is true it does not supply a dev session', async () => {
    vi.doMock('@/auth', () => ({ authEnabled: true }))

    const { SessionProvider } = await import('./providers')

    render(
      <SessionProvider>
        <span>child</span>
      </SessionProvider>,
    )

    const provider = screen.getByTestId('session-provider')
    expect(provider).toBeInTheDocument()
    expect(provider.getAttribute('data-session')).toBe('')
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})

// AuthGuard

describe('AuthGuard', () => {
  const originalLocation = window.location

  beforeEach(() => {
    signInMock.mockReset()
    getUserMock.mockReset()
    useSessionMock.mockReset()

    mockPathname = '/protected'
    mockSearchParamsString = ''

    // set window.location.origin de forma controlada
    // @ts-expect-error - override for tests
    delete window.location
    // @ts-expect-error - override for tests
    window.location = { origin: 'https://example.com' }
  })

  afterEach(() => {
    // @ts-expect-error - restore
    window.location = originalLocation
  })

  it('renders spinner while loading', () => {
    useSessionMock.mockReturnValue({ status: 'loading', data: null })

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'large')
    expect(screen.queryByText('child')).not.toBeInTheDocument()
  })

  it('renders children when not loading', () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'a@b.com' } },
    })

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('calls signIn with callbackUrl when unauthenticated and not on login', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })
    mockPathname = '/protected'
    mockSearchParamsString = 'a=1&b=2'

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await waitFor(() => expect(signInMock).toHaveBeenCalledTimes(1))

    expect(signInMock).toHaveBeenCalledWith('credentials', {
      callbackUrl: 'https://example.com/protected?a=1&b=2',
    })
  })

  it('calls signIn without querystring when search params are empty', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })
    mockPathname = '/protected'
    mockSearchParamsString = ''

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await waitFor(() => expect(signInMock).toHaveBeenCalledTimes(1))

    expect(signInMock).toHaveBeenCalledWith('credentials', {
      callbackUrl: 'https://example.com/protected',
    })
  })

  it('does NOT call signIn when pathname is null/empty', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })
    mockPathname = null

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    // damos un micro-tick al effect
    await new Promise((r) => setTimeout(r, 0))

    expect(signInMock).not.toHaveBeenCalled()
  })

  it('does NOT call signIn when already on /login', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })
    mockPathname = '/login'

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await new Promise((r) => setTimeout(r, 0))
    expect(signInMock).not.toHaveBeenCalled()
  })

  it('does NOT call signIn when pathname ends with /login (case-insensitive)', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })
    mockPathname = '/auth/LOGIN'

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await new Promise((r) => setTimeout(r, 0))
    expect(signInMock).not.toHaveBeenCalled()
  })

  it('uses custom provider when provided', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })
    mockPathname = '/protected'

    render(
      <AuthGuard provider="okta">
        <div>child</div>
      </AuthGuard>,
    )

    await waitFor(() => expect(signInMock).toHaveBeenCalledTimes(1))

    expect(signInMock).toHaveBeenCalledWith('okta', {
      callbackUrl: 'https://example.com/protected',
    })
  })

  it('calls getUser with session email when authenticated', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: { email: 'user@company.com' } },
    })

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await waitFor(() => expect(getUserMock).toHaveBeenCalledTimes(1))
    expect(getUserMock).toHaveBeenCalledWith('user@company.com')
    expect(signInMock).not.toHaveBeenCalled()
  })

  it('falls back to DEFAULT_EMPLOYEE_EMAIL when authenticated but session email is missing', async () => {
    useSessionMock.mockReturnValue({
      status: 'authenticated',
      data: { user: {} },
    })

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await waitFor(() => expect(getUserMock).toHaveBeenCalledTimes(1))
    expect(getUserMock).toHaveBeenCalledWith('default@company.com')
  })

  it('does NOT call getUser when not authenticated', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated', data: null })

    render(
      <AuthGuard>
        <div>child</div>
      </AuthGuard>,
    )

    await new Promise((r) => setTimeout(r, 0))
    expect(getUserMock).not.toHaveBeenCalled()
  })
})
