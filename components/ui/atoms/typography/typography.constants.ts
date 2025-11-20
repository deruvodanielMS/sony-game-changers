/**
 * Typography color constants mapped to design system CSS variables
 */
export const TYPOGRAPHY_COLORS = {
  default: 'var(--color-neutral-1000)',
  muted: 'var(--color-neutral-400)',
  primary: 'var(--color-accent-primary)',
  secondary: 'var(--color-accent-primary-dark)',
  success: 'var(--color-feedback-success-600)',
  warning: 'var(--color-feedback-warning-600)',
  danger: 'var(--color-feedback-danger-600)',
  info: 'var(--color-feedback-info-600)',
} as const

export type TypographyColor = keyof typeof TYPOGRAPHY_COLORS

/**
 * Allowed HTML element types for Typography component
 */
export const TYPOGRAPHY_ELEMENTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
  'div',
  'label',
] as const

export type TypographyElement = (typeof TYPOGRAPHY_ELEMENTS)[number]
