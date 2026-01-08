import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Error404 from './Error404'

// --- Mocks ---
const tMock = vi.fn((key: string) => `translated:${key}`)
const useTranslationsMock = vi.fn()

vi.mock('next-intl', () => {
  return {
    useTranslations: (namespace: string) => {
      useTranslationsMock(namespace)
      return tMock
    },
  }
})

// If Typography is complex, mock it to keep tests focused.
vi.mock('@/components/ui/foundations/Typography', () => {
  return {
    Typography: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
      <div data-variant={variant}>{children}</div>
    ),
  }
})

// next/link should be mocked in unit tests (Next's Link adds behavior not needed here)
vi.mock('next/link', () => {
  return {
    default: ({
      href,
      children,
      ...props
    }: {
      href: string
      children: React.ReactNode
      [key: string]: any
    }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  }
})

// cn helper can be mocked to a simple join (or you can use the real one)
vi.mock('@/utils/cn', () => {
  return {
    cn: (...classes: Array<string | undefined | null | false>) => classes.filter(Boolean).join(' '),
  }
})

describe('<Error404 />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the 404 heading', () => {
    render(<Error404 />)
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('uses NotFound translations for title, description and goHome', () => {
    render(<Error404 />)

    expect(useTranslationsMock).toHaveBeenCalledWith('NotFound')

    expect(screen.getByText('translated:title')).toBeInTheDocument()
    expect(screen.getByText('translated:description')).toBeInTheDocument()
    expect(screen.getByText('translated:goHome')).toBeInTheDocument()

    expect(tMock).toHaveBeenCalledWith('title')
    expect(tMock).toHaveBeenCalledWith('description')
    expect(tMock).toHaveBeenCalledWith('goHome')
  })

  it('renders a link to home "/" with the translated label', () => {
    render(<Error404 />)

    const link = screen.getByRole('link', { name: 'translated:goHome' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('applies classes to the link (via cn)', () => {
    render(<Error404 />)

    const link = screen.getByRole('link', { name: 'translated:goHome' })

    // Since cn is mocked to join strings, we can assert some key class tokens exist.
    expect(link.getAttribute('class') ?? '').toContain('inline-flex')
    expect(link.getAttribute('class') ?? '').toContain('bg-gradient-to-l')
    expect(link.getAttribute('class') ?? '').toContain('rounded-x-large')
  })
})
