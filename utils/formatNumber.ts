/**
 * Utilities for localized number and currency formatting using Intl.NumberFormat.
 * Always normalizes spaces (NBSP, narrow NBSP) to regular ASCII spaces for consistency.
 */

const normalizeSpaces = (str: string) => str.replace(/[\u00A0\u202F]/g, ' ') // NBSP & narrow NBSP → space

export type NumberFormatOptions = {
  locale?: string
  decimals?: number
}

export function formatNumber(value: number | string, options: NumberFormatOptions = {}): string {
  const { locale = 'en-US', decimals } = options

  const num = typeof value === 'string' ? Number(value) : value
  if (isNaN(num)) return ''

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 2,
  })

  const formatted = formatter.format(num)
  return normalizeSpaces(formatted)
}

export type CurrencyFormatOptions = {
  locale?: string
  currency?: string
  decimals?: number
}

export function formatCurrency(
  value: number | string,
  options: CurrencyFormatOptions = {},
): string {
  const { locale = 'en-US', currency = 'USD', decimals } = options

  const num = typeof value === 'string' ? Number(value) : value
  if (isNaN(num)) return ''

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals ?? 2,
    maximumFractionDigits: decimals ?? 2,
  })

  const formatted = formatter.format(num)
  return normalizeSpaces(formatted)
}
