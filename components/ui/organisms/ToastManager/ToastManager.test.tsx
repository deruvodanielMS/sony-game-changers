import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ToastManager } from './ToastManager'

// Mock the UI store
const mockDequeueToast = vi.fn()
let mockToastQueue: Array<{ id: string; content?: string; duration?: number; variant?: string }> =
  []

vi.mock('@/stores/ui.store', () => ({
  useUIStore: (
    selector: (state: {
      toastQueue: typeof mockToastQueue
      dequeueToast: typeof mockDequeueToast
    }) => unknown,
  ) => selector({ toastQueue: mockToastQueue, dequeueToast: mockDequeueToast }),
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('ToastManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    mockToastQueue = []
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders nothing when toast queue is empty', () => {
    mockToastQueue = []
    const { container } = render(<ToastManager />)
    expect(container.firstChild).toBeNull()
  })

  it('renders toast when queue has items', () => {
    mockToastQueue = [{ id: '1', content: 'Test message' }]
    render(<ToastManager />)
    expect(screen.getByText('Test message')).toBeDefined()
  })

  it('auto-dismisses toast after default duration', () => {
    mockToastQueue = [{ id: '1', content: 'Test message' }]
    render(<ToastManager />)

    act(() => {
      vi.advanceTimersByTime(5000) // TOAST_DEFAULT_DURATION
    })

    expect(mockDequeueToast).toHaveBeenCalled()
  })

  it('uses custom duration when provided', () => {
    mockToastQueue = [{ id: '1', content: 'Test message', duration: 2000 }]
    render(<ToastManager />)

    act(() => {
      vi.advanceTimersByTime(1999)
    })
    expect(mockDequeueToast).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(mockDequeueToast).toHaveBeenCalled()
  })
})
