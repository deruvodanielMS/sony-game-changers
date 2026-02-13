// LoginForm.test.tsx
import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LoginForm } from './LoginForm'

// --- Mocks ---
const signInMock = vi.fn()

vi.mock('next-auth/react', () => ({
  signIn: (...args: any[]) => signInMock(...args),
}))

type MockSearchParams = {
  get: (key: string) => string | null
}

let mockSearchParams: MockSearchParams = {
  get: () => null,
}

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}))

// next-intl: devolvemos una función t(key) => key o algo “humano”
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('LoginForm', () => {
  const originalLocation = window.location

  beforeEach(() => {
    signInMock.mockReset()
    mockSearchParams = { get: () => null }

    // JSDOM: window.location es read-only; lo reemplazamos para poder setear href
    // @ts-expect-error - override for tests
    delete window.location
    // @ts-expect-error - override for tests
    window.location = { href: '' }
  })

  afterEach(() => {
    // restauramos location
    // @ts-expect-error - restore
    window.location = originalLocation
  })

  it('renders title, labels and placeholders using translations', () => {
    render(<LoginForm />)

    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('emailLabel')).toBeInTheDocument()
    expect(screen.getByText('passwordLabel')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('emailPlaceholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('passwordPlaceholder')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'signIn' })).toBeInTheDocument()
  })

  it('allows typing email and password', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText('emailPlaceholder')
    const passwordInput = screen.getByPlaceholderText('passwordPlaceholder')

    await user.type(emailInput, 'test@mail.com')
    await user.type(passwordInput, '123456')

    expect(emailInput).toHaveValue('test@mail.com')
    expect(passwordInput).toHaveValue('123456')
  })

  it('calls signIn with default callbackUrl "/" when not present', async () => {
    const user = userEvent.setup()

    signInMock.mockResolvedValueOnce({}) // no error, no url

    render(<LoginForm />)

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'test@mail.com')
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), '123456')
    await user.click(screen.getByRole('button', { name: 'signIn' }))

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledTimes(1)
    })

    expect(signInMock).toHaveBeenCalledWith('credentials', {
      redirect: true,
      email: 'test@mail.com',
      password: '123456',
      callbackUrl: '/',
    })
  })

  it('uses callbackUrl from search params when provided', async () => {
    const user = userEvent.setup()

    mockSearchParams = {
      get: (key) => (key === 'callbackUrl' ? '/dashboard' : null),
    }

    signInMock.mockResolvedValueOnce({})

    render(<LoginForm />)

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'test@mail.com')
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), '123456')
    await user.click(screen.getByRole('button', { name: 'signIn' }))

    await waitFor(() => expect(signInMock).toHaveBeenCalledTimes(1))

    expect(signInMock).toHaveBeenCalledWith('credentials', {
      redirect: true,
      email: 'test@mail.com',
      password: '123456',
      callbackUrl: '/dashboard',
    })
  })

  it('shows loading state while submitting (button disabled + signingIn text)', async () => {
    const user = userEvent.setup()

    // mantenemos la promesa pendiente para verificar el estado intermedio
    let resolveFn!: (v: any) => void
    signInMock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFn = resolve
        }),
    )

    render(<LoginForm />)

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'test@mail.com')
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), '123456')

    const button = screen.getByRole('button', { name: 'signIn' })
    await user.click(button)

    // estado intermedio
    expect(screen.getByRole('button', { name: 'signingIn' })).toBeDisabled()

    // resolvemos y vuelve al estado normal
    resolveFn({})
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'signIn' })).toBeEnabled()
    })
  })

  it('shows invalidCredentials error when signIn returns error', async () => {
    const user = userEvent.setup()
    signInMock.mockResolvedValueOnce({ error: 'Invalid credentials' })

    render(<LoginForm />)

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'test@mail.com')
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'signIn' }))

    expect(await screen.findByText('invalidCredentials')).toBeInTheDocument()
    expect(window.location.href).toBe('')
  })

  it('redirects to res.url when signIn returns url', async () => {
    const user = userEvent.setup()
    signInMock.mockResolvedValueOnce({ url: '/after-login' })

    render(<LoginForm />)

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'test@mail.com')
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), '123456')
    await user.click(screen.getByRole('button', { name: 'signIn' }))

    await waitFor(() => {
      expect(window.location.href).toBe('/after-login')
    })
  })

  it('clears previous error when submitting again', async () => {
    const user = userEvent.setup()

    signInMock.mockResolvedValueOnce({ error: 'Invalid credentials' }).mockResolvedValueOnce({}) // success-ish

    render(<LoginForm />)

    await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'test@mail.com')
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'signIn' }))

    expect(await screen.findByText('invalidCredentials')).toBeInTheDocument()

    // submit de nuevo
    await user.clear(screen.getByPlaceholderText('passwordPlaceholder'))
    await user.type(screen.getByPlaceholderText('passwordPlaceholder'), '123456')
    await user.click(screen.getByRole('button', { name: 'signIn' }))

    await waitFor(() => {
      expect(screen.queryByText('invalidCredentials')).not.toBeInTheDocument()
    })
  })
})
