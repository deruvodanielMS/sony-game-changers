import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('next-auth/react', () => {
  return {
    useSession: vi.fn(),
    signIn: vi.fn(),
  }
})

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

// Replace Spinner with a simple identifiable stub for assertions
vi.mock('@/components/ui/atoms/Spinner', () => ({
  Spinner: (props: any) => <div data-testid="spinner-mock" />,
}))

import { AuthGuard } from './AuthGuard'
import { useSession, signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('renders spinner when status is loading', () => {
    ;(useSession as unknown as any).mockReturnValue({ status: 'loading' })
    ;(usePathname as unknown as any).mockReturnValue('/some-path')

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    )

    expect(screen.queryByText('Protected Content')).toBeNull()
    expect(screen.getByTestId('spinner-mock')).toBeInTheDocument()
    expect(signIn as unknown as any).not.toHaveBeenCalled()
  })

  test('calls signIn with default provider when unauthenticated', async () => {
    ;(useSession as unknown as any).mockReturnValue({ status: 'unauthenticated' })
    ;(usePathname as unknown as any).mockReturnValue('/current-path')

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    )

    await waitFor(() => {
      expect(signIn as unknown as any).toHaveBeenCalledWith('okta', {
        callbackUrl: '/current-path',
      })
    })

    // Spinner should still render while redirecting
    expect(screen.getByTestId('spinner-mock')).toBeInTheDocument()
  })

  test('uses provider prop override when provided', async () => {
    ;(useSession as unknown as any).mockReturnValue({ status: 'unauthenticated' })
    ;(usePathname as unknown as any).mockReturnValue('/override-path')

    render(
      <AuthGuard provider="github">
        <div>Protected Content</div>
      </AuthGuard>,
    )

    await waitFor(() => {
      expect(signIn as unknown as any).toHaveBeenCalledWith('github', {
        callbackUrl: '/override-path',
      })
    })
  })

  test('renders children when authenticated and does not call signIn', () => {
    ;(useSession as unknown as any).mockReturnValue({ status: 'authenticated' })
    ;(usePathname as unknown as any).mockReturnValue('/any')

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>,
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(signIn as unknown as any).not.toHaveBeenCalled()
  })
})
