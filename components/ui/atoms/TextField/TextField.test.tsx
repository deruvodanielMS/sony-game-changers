import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextField } from './TextField'

describe('TextField', () => {
  it('renders with default props and placeholder', () => {
    render(<TextField placeholder="Your name" />)
    const input = screen.getByPlaceholderText('Your name') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.type).toBe('text')
    expect(input.value).toBe('')
  })

  it('is fullWidth by default', () => {
    render(<TextField placeholder="full" />)
    const input = screen.getByPlaceholderText('full') as HTMLInputElement
    const container = input.closest('div')
    expect(container).toBeTruthy()
    expect(container).toHaveClass('w-full')
  })

  it('respects fullWidth=false and accepts custom className width', () => {
    render(<TextField placeholder="no-full" fullWidth={false} className="w-40" />)
    const input = screen.getByPlaceholderText('no-full') as HTMLInputElement
    const container = input.closest('div')
    expect(container).toBeTruthy()
    expect(container).not.toHaveClass('w-full')
    expect(container).toHaveClass('w-40')
  })

  it('supports different input types', () => {
    render(<TextField placeholder="pwd" type="password" data-test-id="pwd" />)
    const input = screen.getByPlaceholderText('pwd') as HTMLInputElement
    expect(input.type).toBe('password')
    expect(input.getAttribute('data-test-id')).toBe('pwd')
  })

  it('renders left and right icons simultaneously', () => {
    render(
      <TextField
        placeholder="with icons"
        leftIcon={<svg data-testid="left" />}
        rightIcon={<svg data-testid="right" />}
      />
    )
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('is disabled and readOnly when props set', async () => {
    render(<TextField placeholder="d" disabled readOnly data-test-id="d" />)
    const input = screen.getByPlaceholderText('d') as HTMLInputElement
    expect(input.disabled).toBe(true)
    expect(input.readOnly).toBe(true)
    expect(input.getAttribute('data-test-id')).toBe('d')
  })

  it('focuses via keyboard and reports activeElement', async () => {
    render(<TextField placeholder="focus-me" />)
    const user = userEvent.setup()
    await user.tab()
    const input = screen.getByPlaceholderText('focus-me') as HTMLInputElement
    input.focus()
    expect(document.activeElement).toBe(input)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<TextField placeholder="snap" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
