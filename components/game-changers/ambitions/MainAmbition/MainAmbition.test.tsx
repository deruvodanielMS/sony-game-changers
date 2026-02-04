import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MainAmbition } from './MainAmbition'
import { GOAL_TYPES } from '@/domain/goal'

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
  it('renders title, avatar, and progress', () => {
    render(
      <MainAmbition
        title="Amazing ambition"
        userName="James Miller"
        avatarUrl="/profile-img/james-miller.png"
        goalType={GOAL_TYPES.BUSINESS}
        progress={40}
        href="/en/ambitions/1"
        showLadderedIndicator={true}
      />,
    )

    expect(screen.getByRole('link', { name: 'Amazing ambition' })).toBeInTheDocument()
    expect(screen.getByAltText('James Miller')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40')
  })
})
