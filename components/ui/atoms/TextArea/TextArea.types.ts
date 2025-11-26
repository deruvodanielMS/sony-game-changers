export const TEXTAREA_VARIANTS = {
  DEFAULT: 'default',
  ERROR: 'error',
} as const

export const TEXTAREA_SIZES = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const

export const TEXTAREA_RESIZE = {
  NONE: 'none',
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  BOTH: 'both',
} as const

export type TextAreaVariant = (typeof TEXTAREA_VARIANTS)[keyof typeof TEXTAREA_VARIANTS]
export type TextAreaSize = (typeof TEXTAREA_SIZES)[keyof typeof TEXTAREA_SIZES]
export type TextAreaResize = (typeof TEXTAREA_RESIZE)[keyof typeof TEXTAREA_RESIZE]
