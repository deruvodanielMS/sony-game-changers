/**
 * Breakpoint constants for media queries
 * These values match Tailwind CSS default breakpoints
 * @see https://tailwindcss.com/docs/breakpoints
 */
export const BREAKPOINTS = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

/**
 * Breakpoint values for programmatic use
 */
export const BREAKPOINT_VALUES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const
