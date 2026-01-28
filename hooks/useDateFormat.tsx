'use client'

import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { formatDate, formatDateTime } from '@/utils/formatDate'
import { LanguageCode } from '@/common/constants'

export function useDateFormat() {
  const locale = useLocale()

  return useMemo(
    () => ({
      formatDate: formatDate(locale as LanguageCode),
      formatDateTime: formatDateTime(locale as LanguageCode),
    }),
    [locale],
  )
}
