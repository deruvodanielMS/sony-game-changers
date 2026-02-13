import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MainAmbition } from './MainAmbition'
import { GOAL_TYPES, GOAL_STATUSES } from '@/domain/goal'

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('MainAmbition', () => {
  it('renders title, avatar, and progress bar when status is in_progress', () => {
    render(
      <MainAmbition
        title="Amazing ambition"
        userName="James Miller"
        avatarUrl="/profile-img/james-miller.png"
        goalType={GOAL_TYPES.BUSINESS}
        status={GOAL_STATUSES.APPROVED}
        progress={40}
        href="/en/ambitions/1"
        showLadderedIndicator={true}
      />,
    )

    expect(screen.getByRole('link', { name: 'Amazing ambition' })).toBeInTheDocument()
    expect(screen.getByAltText('James Miller')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40')
  })

  it('renders status text when status is draft', () => {
    render(
      <MainAmbition
        title="Draft ambition"
        userName="James Miller"
        avatarUrl="/profile-img/james-miller.png"
        goalType={GOAL_TYPES.BUSINESS}
        status={GOAL_STATUSES.DRAFT}
        progress={0}
        href="/en/ambitions/2"
        showLadderedIndicator={false}
      />,
    )

    expect(screen.getByRole('link', { name: 'Draft ambition' })).toBeInTheDocument()
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
})
