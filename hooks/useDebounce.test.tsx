import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Ensure no timers leak between tests
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500))

    expect(result.current).toBe('hello')
  })

  it('should update the debounced value after the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    // Initially, debounced value should be the initial value
    expect(result.current).toBe('initial')

    // Change the value
    rerender({ value: 'updated', delay: 500 })

    // Before delay passes, debounced value should still be old one
    expect(result.current).toBe('initial')

    // Advance timers by the delay
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Now debounced value should be updated
    expect(result.current).toBe('updated')
  })

  it('should only take the last value if multiple changes happen within the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 500 },
    })

    expect(result.current).toBe('a')

    // First change
    rerender({ value: 'b', delay: 500 })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    // Still debounced to "a" because delay not finished
    expect(result.current).toBe('a')

    // Second change before delay finishes
    rerender({ value: 'c', delay: 500 })

    // Advance so that total since first change is > 500ms but
    // since second change only 300ms -> still no update
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('a')

    // Now pass the remaining 200ms for the second change
    act(() => {
      vi.advanceTimersByTime(200)
    })

    // Debounced value should now be "c"
    expect(result.current).toBe('c')
  })

  it('should clear timeout on unmount (no state update after unmount)', () => {
    const { unmount, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    // Change the value so a timeout is scheduled
    rerender({ value: 'updated', delay: 500 })

    // Unmount before the delay finishes
    unmount()

    // Advancing timers should not throw or try to update state on unmounted hook
    expect(() => {
      act(() => {
        vi.advanceTimersByTime(500)
      })
    }).not.toThrow()
  })
})
