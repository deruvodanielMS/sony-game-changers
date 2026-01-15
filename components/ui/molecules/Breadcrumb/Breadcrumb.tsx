'use client'

import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { BreadcrumbProps } from './Breadcrumb.types'

/**
 * Breadcrumb - Navigation breadcrumb component
 * Displays hierarchical navigation trail with chevron separators
 * Last item is always bold and non-clickable (current page)
 */
export function Breadcrumb({ items, className, 'data-testid': dataTestId }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-0_25', className)}
      data-testid={dataTestId}
    >
      <ol className="flex items-center gap-0_25">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0

          return (
            <li key={index} className="flex items-center gap-0_25">
              {!isFirst && (
                <ChevronRight
                  className="shrink-0 text-accent-primary"
                  size={16}
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <Typography
                  variant="bodySmall"
                  className="text-neutral-1000 font-bold"
                  aria-current="page"
                >
                  {item.label}
                </Typography>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-neutral-1000 hover:text-accent-primary transition-colors"
                >
                  <Typography variant="bodySmall">{item.label}</Typography>
                </Link>
              ) : (
                <Typography variant="bodySmall" className="text-neutral-1000">
                  {item.label}
                </Typography>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
