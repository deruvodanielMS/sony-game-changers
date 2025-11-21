/**
 * Button variant types
 */
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  PLAIN: 'plain',
} as const

/**
 * Button size types
 */
export const BUTTON_SIZES = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const

export type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES]
