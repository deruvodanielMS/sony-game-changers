'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'
import {
  TYPOGRAPHY_COLORS,
  type TypographyColor,
  type TypographyElement,
} from './typography.constants'

/**
 * Helper function to create typography variant classes following DRY principles
 * @param variant - The variant name (h1-h6, body, body-small, body-tiny)
 */
const createTypographyVariant = (variant: string) =>
  `text-[length:var(--font-size-${variant})] leading-[var(--line-height-${variant})]`

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: createTypographyVariant('h1'),
      h2: createTypographyVariant('h2'),
      h3: createTypographyVariant('h3'),
      h4: createTypographyVariant('h4'),
      h5: createTypographyVariant('h5'),
      h6: createTypographyVariant('h6'),
      body: createTypographyVariant('body'),
      bodySmall: createTypographyVariant('body-small'),
      bodyTiny: createTypographyVariant('body-tiny'),
    },
    fontWeight: {
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

/**
 * Typography component for consistent text styling across the application.
 * Uses design system tokens for sizes, line heights, and colors.
 *
 * @example
 * ```tsx
 * <Typography variant="h1" color="primary">Page Title</Typography>
 * <Typography variant="body" as="span">Inline text</Typography>
 * <Typography variant="body" fontWeight="bold">Bold body text</Typography>
 * <Typography variant="bodySmall" color="muted">Helper text</Typography>
 * ```
 */
export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /** The HTML element to render. Defaults to semantic element based on variant (h1-h6 for headings, p for body) */
  as?: TypographyElement
  /** The color from the design system. Defaults to 'default' (neutral-1000) */
  color?: TypographyColor
}

const TypographyInternal = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { variant = 'body', fontWeight, color = 'default', as, className, style, children, ...props },
    ref,
  ) => {
    // Default to semantic HTML: heading variants use their tag (h1-h6),
    // others default to <p>, unless overridden by 'as' prop
    const Component = (as || (variant?.startsWith('h') ? variant : 'p')) as React.ElementType

    // Determine default font weight based on variant
    const defaultFontWeight = fontWeight || (variant?.startsWith('h') ? 'semibold' : 'normal')

    // Memoize style object to prevent unnecessary re-renders
    const computedStyle = React.useMemo(
      () => ({ color: TYPOGRAPHY_COLORS[color], ...style }),
      [color, style],
    )

    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, fontWeight: defaultFontWeight }), className)}
        style={computedStyle}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

TypographyInternal.displayName = 'Typography'

export { TypographyInternal as Typography }
