import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TeamMemberHeaderCard } from './TeamMemberHeaderCard'

describe('TeamMemberHeaderCard', () => {
  it('renders member information and metadata', () => {
    render(
      <TeamMemberHeaderCard
        name="Kylie Davies"
        role="Developer"
        avatarUrl="/profile-img/kylie-davies.png"
        location="Los Angeles, US"
        joinedLabel="Joined in October 2024"
      />,
    )

    expect(screen.getByText('Kylie Davies')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Los Angeles, US')).toBeInTheDocument()
    expect(screen.getByText('Joined in October 2024')).toBeInTheDocument()
  })
})
