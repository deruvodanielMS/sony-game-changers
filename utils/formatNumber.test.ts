import { describe, it, expect } from 'vitest'
import { formatNumber, formatCurrency } from './formatNumber'

describe('formatNumber', () => {
  it('formats numbers with default locale (en-US)', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56')
  })

  it('formats with custom locale (es-AR)', () => {
    expect(formatNumber(1234.56, { locale: 'es-AR' })).toBe('1.234,56')
  })

  it('respects fixed decimal count', () => {
    expect(formatNumber(12.3, { decimals: 3 })).toBe('12.300')
  })

  it('returns empty string for invalid input', () => {
    expect(formatNumber('abc')).toBe('')
  })
})

describe('formatCurrency', () => {
  it('formats using USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats in euros using fr-FR locale', () => {
    expect(formatCurrency(1234.56, { locale: 'fr-FR', currency: 'EUR' })).toBe('1 234,56 €')
  })

  it('formats ARS correctly (es-AR)', () => {
    expect(formatCurrency(1234.56, { locale: 'es-AR', currency: 'ARS' })).toBe('$ 1.234,56')
  })

  it('respects custom decimals', () => {
    expect(formatCurrency(1234, { decimals: 0 })).toBe('$1,234')
  })

  it('returns empty string for invalid input', () => {
    expect(formatCurrency('abc')).toBe('')
  })
})
