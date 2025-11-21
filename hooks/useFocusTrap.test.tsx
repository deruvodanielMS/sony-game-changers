import React, { useRef } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { useFocusTrap } from './useFocusTrap'

function TestHarness({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useFocusTrap(ref, enabled)
  return (
    <div data-testid="harness">
      <div ref={ref} data-testid="container">
        {children}
      </div>
    </div>
  )
}

describe('useFocusTrap', () => {
  it('cycles from last to first on Tab when enabled', () => {
    render(
      <TestHarness enabled={true}>
        <button>One</button>
        <button>Two</button>
      </TestHarness>,
    )

    const [btn1, btn2] = screen.getAllByRole('button')

    // focus last
    btn2.focus()
    expect(document.activeElement).toBe(btn2)

    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    const spy = vi.spyOn(ev, 'preventDefault')

    // dispatch on document so hook listener can catch it
    document.dispatchEvent(ev)

    expect(spy).toHaveBeenCalled()
    expect(document.activeElement).toBe(btn1)
  })

  it('cycles from first to last on Shift+Tab when enabled', () => {
    render(
      <TestHarness enabled={true}>
        <button>One</button>
        <button>Two</button>
      </TestHarness>,
    )

    const [btn1, btn2] = screen.getAllByRole('button')

    // focus first
    btn1.focus()
    expect(document.activeElement).toBe(btn1)

    const ev = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
      shiftKey: true,
    })
    const spy = vi.spyOn(ev, 'preventDefault')
    document.dispatchEvent(ev)

    expect(spy).toHaveBeenCalled()
    expect(document.activeElement).toBe(btn2)
  })

  it('does nothing when disabled', () => {
    render(
      <TestHarness enabled={false}>
        <button>One</button>
        <button>Two</button>
      </TestHarness>,
    )

    const [, btn2] = screen.getAllByRole('button')
    btn2.focus()
    expect(document.activeElement).toBe(btn2)

    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    const spy = vi.spyOn(ev, 'preventDefault')
    document.dispatchEvent(ev)

    // preventDefault should not be called and focus should remain
    expect(spy).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(btn2)
  })

  it('prevents default when there are no focusable elements inside', () => {
    render(
      <TestHarness enabled={true}>
        <div>not focusable</div>
      </TestHarness>,
    )

    // ensure something else is focused
    const before = document.createElement('button')
    document.body.appendChild(before)
    before.focus()
    expect(document.activeElement).toBe(before)

    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    const spy = vi.spyOn(ev, 'preventDefault')
    document.dispatchEvent(ev)

    expect(spy).toHaveBeenCalled()
    // focus stays where it was
    expect(document.activeElement).toBe(before)
    document.body.removeChild(before)
  })
})

export {}
