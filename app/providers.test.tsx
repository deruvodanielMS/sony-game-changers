import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock SessionProvider to expose received `session` prop via a data attribute
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children, session }: any) => (
    <div data-testid="session-provider" data-session={session ? JSON.stringify(session) : ''}>
      {children}
    </div>
  ),
}))

describe('Providers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  test('when authEnabled is false it supplies dev session to SessionProvider', async () => {
    vi.doMock('@/auth', () => ({ authEnabled: false }))

    const { Providers } = await import('./providers')

    render(
      <Providers>
        <span>child</span>
      </Providers>,
    )

    const provider = screen.getByTestId('session-provider')
    expect(provider).toBeInTheDocument()
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  test('when authEnabled is true it does not supply a dev session', async () => {
    vi.doMock('@/auth', () => ({ authEnabled: true }))

    const { Providers } = await import('./providers')

    render(
      <Providers>
        <span>child</span>
      </Providers>,
    )

    const provider = screen.getByTestId('session-provider')
    expect(provider).toBeInTheDocument()
    expect(provider.getAttribute('data-session')).toBe('')
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})
