import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { PasswordField } from './PasswordField'

describe('PasswordField', () => {
  it('renders with type password by default', () => {
    const { container } = render(<PasswordField placeholder="Password" data-test-id="pw" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toBeTruthy()
    expect(input.type).toBe('password')
    expect(container).toMatchSnapshot()
  })

  it('toggles to text when clicking the toggle button and updates aria-label', () => {
    const { container } = render(<PasswordField placeholder="Password" />)
    const input = container.querySelector('input') as HTMLInputElement
    const button = screen.getByRole('button', { name: /show password/i })

    // initial
    expect(input.type).toBe('password')
    fireEvent.click(button)
    expect(input.type).toBe('text')
    expect(button).toHaveAccessibleName('Hide password')
    expect(container).toMatchSnapshot()
  })

  it('toggles via keyboard (Enter and Space)', async () => {
    const user = userEvent.setup()
    render(<PasswordField placeholder="Password" />)
    const input = screen.getByPlaceholderText('Password') as HTMLInputElement
    const button = screen.getByRole('button', { name: /show password/i })

    // Enter
    button.focus()
    await user.keyboard('{Enter}')
    expect(input.type).toBe('text')

    // Space toggles back
    await user.keyboard(' ')
    expect(input.type).toBe('password')
  })

  it('disables toggle when disabled or readOnly', () => {
    const { rerender } = render(<PasswordField placeholder="pw" disabled />)
    let button = screen.getByRole('button')
    expect(button).toBeDisabled()

    rerender(<PasswordField placeholder="pw" readOnly />)
    button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('forwards data-test-id and className', () => {
    const { container } = render(
      <PasswordField placeholder="pw" data-test-id="my-id" className="custom" />,
    )
    const wrapper = container.querySelector('[data-test-id="my-id"]')
    expect(wrapper).toBeTruthy()
    expect(wrapper).toHaveClass('custom')
  })
})
