import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Mock SessionProvider
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}))

describe('Providers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  test('renders children within SessionProvider', async () => {
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
})
