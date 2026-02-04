import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { LadderedAmbition } from './LadderedAmbition'
import { GOAL_STATUSES } from '@/domain/goal'

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('LadderedAmbition', () => {
  it('renders draft status badge when status is draft', () => {
    render(
      <LadderedAmbition
        title="Laddered ambition"
        userName="Kylie Davies"
        avatarUrl="/profile-img/kylie-davies.png"
        progress={0}
        status={GOAL_STATUSES.DRAFT}
        statusLabel="Draft"
        statusVariant="draft"
        arrowType="Laddered middle"
        href="/ambitions/1"
      />,
    )

    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.getByAltText('Kylie Davies')).toBeInTheDocument()
  })

  it('renders progress bar when status is not draft', () => {
    render(
      <LadderedAmbition
        title="Laddered ambition"
        userName="Kylie Davies"
        avatarUrl="/profile-img/kylie-davies.png"
        progress={35}
        status={GOAL_STATUSES.AWAITING_APPROVAL}
        statusLabel="Awaiting approval"
        statusVariant="awaiting-approval"
        arrowType="Laddered middle"
        href="/ambitions/2"
      />,
    )

    expect(screen.queryByText('Draft')).toBeNull()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '35')
  })
})
