import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/common/constants'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: SUPPORTED_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
})
