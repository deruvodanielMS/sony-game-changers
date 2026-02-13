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

  it('renders progress bar when status is approved (in progress)', () => {
    render(
      <LadderedAmbition
        title="Laddered ambition"
        userName="Kylie Davies"
        avatarUrl="/profile-img/kylie-davies.png"
        progress={35}
        status={GOAL_STATUSES.APPROVED}
        arrowType="Laddered middle"
        href="/ambitions/2"
      />,
    )

    expect(screen.queryByText('Draft')).toBeNull()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '35')
  })

  it('renders status text when status is awaiting_approval', () => {
    render(
      <LadderedAmbition
        title="Pending ambition"
        userName="Kylie Davies"
        avatarUrl="/profile-img/kylie-davies.png"
        progress={0}
        status={GOAL_STATUSES.AWAITING_APPROVAL}
        arrowType="Laddered middle"
        href="/ambitions/3"
      />,
    )

    expect(screen.getByText('Awaiting Approval')).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
})
