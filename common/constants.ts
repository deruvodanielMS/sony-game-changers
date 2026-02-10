export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
} as const

export const SUPPORTED_LANGUAGES: Array<string> = Object.entries(LANGUAGES).map(
  ([, value]) => value,
)

export const DEFAULT_LANGUAGE = LANGUAGES.EN

export type LanguageCode = (typeof LANGUAGES)[keyof typeof LANGUAGES]

export const DEBOUNCE_DELAY = 300

/**
 * Z-index layering constants
 * ⚠️ IMPORTANT: Keep synchronized with CSS custom properties in app/styles/theme.css
 * - --z-sticky-filters: 450
 * - --z-tabs: 500
 * - --z-drawer-overlay: 750
 * - --z-mobile-header: 800
 */
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

export const MODAL_ANIMATION_DURATION = 300 // in milliseconds

export const DRAWER_ANIMATION_DURATION = 200 // in milliseconds (max 200ms per code review)

/** DEV only */
export const EMPLOYEE_EMAIL_BY_ROLE = {
  MANAGER: 'manager@employee.test',
  IC: 'ic@employee.test',
} as const

export const DEFAULT_EMPLOYEE_EMAIL = EMPLOYEE_EMAIL_BY_ROLE.MANAGER
