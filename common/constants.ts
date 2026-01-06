export const LANGUAGES = {
  ES: 'fr',
  EN: 'en',
} as const

export const SUPPORTED_LANGUAGES: Array<string> = Object.entries(LANGUAGES).map(
  ([, value]) => value,
)

export const DEFAULT_LANGUAGE = LANGUAGES.EN

export const DEBOUNCE_DELAY = 300

export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 100,
  TOOLTIP: 200,
  DRAWER: 500,
  MODAL: 700,
  OVERLAY: 800,
  SPINNER: 900,
  TOAST: 1000,
} as const

export const TOAST_DEFAULT_DURATION = 3000 // in milliseconds
