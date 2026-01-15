'use client'

import { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { CollapsibleSectionProps } from './CollapsibleSection.types'

/**
 * CollapsibleSection - Reusable accordion component for expandable content sections
 *
 * Features:
 * - Controlled or uncontrolled collapse state
 * - Smooth rotation animation on chevron icon
 * - Customizable title and content
 * - Accessible with ARIA attributes
 * - Consistent styling with design system
 *
 * @example
 * ```tsx
 * <CollapsibleSection title="Actions" defaultOpen>
 *   <div>Your content here</div>
 * </CollapsibleSection>
 * ```
 */
export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  open,
  onToggle,
  className,
}: CollapsibleSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  // Use controlled state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isOpen)
    } else {
      setInternalOpen(!internalOpen)
    }
  }

  return (
    <div className={cn('flex flex-col gap-1 items-start w-full', className)}>
      {/* Header with chevron and title */}
      <button
        onClick={handleToggle}
        className="flex gap-0.75 items-center w-full"
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${title}`}
      >
        <div
          className={cn(
            'flex items-center justify-center size-2 transition-transform',
            !isOpen && 'rotate-180 scale-y-[-100%]',
          )}
        >
          <ChevronUp className="size-1.5 text-neutral-1000" aria-hidden="true" />
        </div>
        <Typography variant="h6" fontWeight="semibold" color="default">
          {title}
        </Typography>
      </button>

      {/* Content */}
      {isOpen && (
        <div id={`collapsible-content-${title}`} className="flex flex-col gap-0.5 w-full">
          {children}
        </div>
      )}
    </div>
  )
}
