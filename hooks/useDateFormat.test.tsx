import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Control the mocked locale via this variable
let currentLocale = 'en'

vi.mock('next-intl', () => ({
  useLocale: () => currentLocale,
}))

import { useDateFormat } from './useDateFormat'

describe('useDateFormat', () => {
  beforeEach(() => {
    currentLocale = 'en'
  })

  it('formats date according to locale and updates when locale changes', () => {
    const { result, rerender } = renderHook(() => useDateFormat())

    // en -> MM/DD/YYYY
    expect(result.current.formatDate('2025-10-08')).toBe('10/08/2025')

    // change locale to fr and rerender
    currentLocale = 'fr'
    rerender()

    // fr -> DD/MM/YYYY
    expect(result.current.formatDate('2025-10-08')).toBe('08/10/2025')
  })

  it('formatDateTime returns a string that starts with the localized date and a comma', () => {
    const iso = '2025-10-08T10:15:00'

    const { result, rerender } = renderHook(() => useDateFormat())

    // en
    expect(result.current.formatDateTime(iso).startsWith('10/08/2025,')).toBe(true)

    // fr
    currentLocale = 'fr'
    rerender()

    expect(result.current.formatDateTime(iso).startsWith('08/10/2025,')).toBe(true)
  })
})
