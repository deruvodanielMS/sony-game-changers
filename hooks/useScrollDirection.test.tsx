import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes with null direction, 0 scrollY, and not scrolling', () => {
    const { result } = renderHook(() => useScrollDirection())

    expect(result.current.scrollDirection).toBe(null)
    expect(result.current.scrollY).toBe(0)
    expect(result.current.isScrolling).toBe(false)
  })

  it('detects scroll down direction', async () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('down')
    })
    expect(result.current.scrollY).toBe(100)
    expect(result.current.isScrolling).toBe(true)
  })

  it('detects scroll up direction', async () => {
    const { result } = renderHook(() => useScrollDirection())

    // First scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('down')
    })

    // Then scroll up
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('up')
    })
    expect(result.current.scrollY).toBe(100)
    expect(result.current.isScrolling).toBe(true)
  })

  it('respects threshold and does not change direction for small scrolls', async () => {
    const { result } = renderHook(() => useScrollDirection(50))

    // Initial scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('down')
    })

    const previousDirection = result.current.scrollDirection

    // Small scroll (less than threshold)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 130 })
      window.dispatchEvent(new Event('scroll'))
    })

    // Direction should remain 'down' because change is less than threshold (50)
    expect(result.current.scrollDirection).toBe(previousDirection)
  })

  it('changes direction when scroll exceeds threshold', async () => {
    const { result } = renderHook(() => useScrollDirection(50))

    // Scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('down')
    })

    // Scroll up more than threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 40 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('up')
    })
    expect(result.current.scrollY).toBe(40)
  })

  it('updates scrollY on every scroll event', async () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollY).toBe(50)
    })

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollY).toBe(150)
    })
  })

  it('sets isScrolling to false when scrollY is 0', async () => {
    const { result } = renderHook(() => useScrollDirection())

    // Scroll down first
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.isScrolling).toBe(true)
    })

    // Scroll back to top
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.isScrolling).toBe(false)
    })
    expect(result.current.scrollY).toBe(0)
  })

  it('cleans up scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollDirection())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('uses default threshold of 10 when not provided', async () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })

    await waitFor(() => {
      expect(result.current.scrollDirection).toBe('down')
    })

    const previousDirection = result.current.scrollDirection

    // Small change (5px)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 55 })
      window.dispatchEvent(new Event('scroll'))
    })

    // Should not change direction (below default threshold of 10)
    expect(result.current.scrollDirection).toBe(previousDirection)

    // Larger change (15px)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 70 })
      window.dispatchEvent(new Event('scroll'))
    })

    // Should still be down (scrolling in same direction)
    expect(result.current.scrollDirection).toBe('down')
  })
})
