/**
 * Button variant types
 */
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LINK: 'link',
  PLAIN: 'plain',
} as const

/**
 * Button size types
 */
export const BUTTON_SIZES = {
  LARGE: 'large',
  SMALL: 'small',
} as const

export type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES]
