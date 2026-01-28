import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime } from './formatDate'
import { LANGUAGES, DEFAULT_LANGUAGE } from '@/common/constants'

describe('formatDate', () => {
  it('formats date for EN locale', () => {
    const f = formatDate(LANGUAGES.EN)
    expect(f('2025-10-08')).toBe('10/08/2025')
  })

  it('formats date for FR locale', () => {
    const f = formatDate(LANGUAGES.FR)
    expect(f('2025-10-08')).toBe('08/10/2025')
  })

  it('uses DEFAULT_LANGUAGE when none provided', () => {
    const f = formatDate()
    const expected = formatDate(DEFAULT_LANGUAGE)('2025-10-08')
    expect(f('2025-10-08')).toBe(expected)
  })

  it('returns empty string for falsy or invalid input', () => {
    const f = formatDate(LANGUAGES.EN)
    expect(f(undefined)).toBe('')
    expect(f(null)).toBe('')
    expect(f('not-a-date')).toBe('')
  })
})

describe('formatDateTime', () => {
  it('formats date+time for EN locale', () => {
    const f = formatDateTime(LANGUAGES.EN)
    expect(f('2025-10-08T10:15:00')).toBe('10/08/2025, 10:15 am')
  })

  it('formats date+time for FR locale', () => {
    const f = formatDateTime(LANGUAGES.FR)
    expect(f('2025-10-08T10:15:00')).toBe('08/10/2025, 10:15')
  })

  it('returns empty string for falsy or invalid input', () => {
    const f = formatDateTime(LANGUAGES.EN)
    expect(f(undefined)).toBe('')
    expect(f(null)).toBe('')
    expect(f('invalid')).toBe('')
  })
})
