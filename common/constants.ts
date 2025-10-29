export const LANGUAGES = {
  ES: 'fr',
  EN: 'en',
} as const

export const SUPPORTED_LANGUAGES: Array<string> = Object.entries(LANGUAGES).map(
  ([, value]) => value,
)

export const DEFAULT_LANGUAGE = LANGUAGES.EN
