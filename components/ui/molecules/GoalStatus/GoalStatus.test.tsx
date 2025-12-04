import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GoalStatus } from './GoalStatus'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated:${key}`,
}))

describe('GoalStatus', () => {
  it('renders correctamente con status "completed"', () => {
    render(<GoalStatus status="completed" className="extra-class" />)

    const el = screen.getByText('translated:status.completed')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('leading-body', 'text-goal-completed', 'extra-class')
  })

  it('usa la clase correcta para "draft"', () => {
    render(<GoalStatus status="draft" className="" />)

    const el = screen.getByText('translated:status.draft')
    expect(el).toHaveClass('text-goal-draft')
  })

  it('usa la clase correcta para "awaiting_approval"', () => {
    render(<GoalStatus status="awaiting_approval" className="" />)

    const el = screen.getByText('translated:status.awaiting_approval')
    expect(el).toHaveClass('text-goal-awaiting-approval')
  })

  it('hace match con snapshot', () => {
    const { container } = render(<GoalStatus status="completed" className="snapshot" />)
    expect(container).toMatchSnapshot()
  })
})
