import dayjs from 'dayjs'
import { DEFAULT_LANGUAGE, LanguageCode, LANGUAGES } from '@/common/constants'

type DateString = string | null | undefined

const FORMATS: Record<LanguageCode, { date: string; dateTime: string }> = {
  [LANGUAGES.EN]: {
    date: 'MM/DD/YYYY',
    dateTime: 'MM/DD/YYYY, h:mm a', // "10/08/2025, 10:15 am"
  },
  [LANGUAGES.FR]: {
    date: 'DD/MM/YYYY',
    dateTime: 'DD/MM/YYYY, HH:mm', // "08/10/2025, 10:15"
  },
}

function getFormatFor(key: 'date' | 'dateTime', locale: LanguageCode = DEFAULT_LANGUAGE) {
  return FORMATS[locale]?.[key] ?? FORMATS[DEFAULT_LANGUAGE][key]
}

/**
 * Pure curried formatter: formatDate(locale?)(iso?)
 */

export const formatDate = (locale?: LanguageCode) => (dateString?: DateString) => {
  if (!dateString) return ''
  const d = dayjs(dateString)
  if (!d.isValid()) return ''
  return d.format(getFormatFor('date', locale))
}

/**
 * Pure curried formatter: formatDateTime(locale?)(iso?)
 */
export const formatDateTime = (locale?: LanguageCode) => (dateString?: DateString) => {
  if (!dateString) return ''
  const d = dayjs(dateString)
  if (!d.isValid()) return ''
  return d.format(getFormatFor('dateTime', locale))
}
