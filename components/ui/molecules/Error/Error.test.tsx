import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Error } from './Error'

// --- Mocks ---
const tMock = vi.fn((key: string) => `translated:${key}`)

vi.mock('next-intl', () => {
  return {
    useTranslations: (namespace: string) => {
      // expose namespace usage for assertions
      ;(useTranslationsMock as any)(namespace)
      return tMock
    },
  }
})

const useTranslationsMock = vi.fn()

vi.mock('@/components/ui/foundations/Typography', () => {
  return {
    Typography: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
      <div data-variant={variant}>{children}</div>
    ),
  }
})

describe('<Error />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses next-intl translations when title/description props are not provided', () => {
    render(<Error />)

    expect(useTranslationsMock).toHaveBeenCalledWith('Error')

    // default strings come from t('title') and t('description')
    expect(screen.getByText('translated:title')).toBeInTheDocument()
    expect(screen.getByText('translated:description')).toBeInTheDocument()

    // verify we called the translator with expected keys
    expect(tMock).toHaveBeenCalledWith('title')
    expect(tMock).toHaveBeenCalledWith('description')
  })

  it('renders provided title and description instead of translations', () => {
    render(<Error title="My Title" description="My Description" />)

    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('My Description')).toBeInTheDocument()

    // ensure translation keys weren't used as fallback in this case
    expect(tMock).not.toHaveBeenCalledWith('title')
    expect(tMock).not.toHaveBeenCalledWith('description')
  })

  it('falls back only for the missing prop (title)', () => {
    render(<Error description="Only Description" />)

    expect(screen.getByText('translated:title')).toBeInTheDocument()
    expect(screen.getByText('Only Description')).toBeInTheDocument()

    expect(tMock).toHaveBeenCalledWith('title')
    expect(tMock).not.toHaveBeenCalledWith('description')
  })

  it('falls back only for the missing prop (description)', () => {
    render(<Error title="Only Title" />)

    expect(screen.getByText('Only Title')).toBeInTheDocument()
    expect(screen.getByText('translated:description')).toBeInTheDocument()

    expect(tMock).not.toHaveBeenCalledWith('title')
    expect(tMock).toHaveBeenCalledWith('description')
  })

  it('renders children', () => {
    render(
      <Error>
        <button>Try again</button>
      </Error>,
    )

    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })
})
