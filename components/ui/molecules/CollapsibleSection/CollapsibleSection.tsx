'use client'

import { useState } from 'react'
import { Collapsible } from 'radix-ui'
import { ChevronDown } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { CollapsibleSectionProps } from './CollapsibleSection.types'

/**
 * CollapsibleSection - Reusable collapsible component with smooth CSS animations
 *
 * Features:
 * - Smooth collapse/expand animations
 * - Controlled or uncontrolled state
 * - Accessible chevron icon that rotates
 * - h6 Typography for title
 * - Custom trigger support via renderTrigger
 *
 * @example
 * ```tsx
 * // Simple usage with title
 * <CollapsibleSection title="Actions" defaultOpen>
 *   <div>Your content here</div>
 * </CollapsibleSection>
 *
 * // Custom trigger
 * <CollapsibleSection
 *   renderTrigger={(open) => <CustomTrigger open={open} />}
 *   defaultOpen
 * >
 *   <div>Your content here</div>
 * </CollapsibleSection>
 * ```
 */
export function CollapsibleSection({
  title,
  renderTrigger,
  children,
  defaultOpen = true,
  open: controlledOpen,
  onToggle,
  className,
  contentClassName,
}: CollapsibleSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleToggle = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onToggle?.(newOpen)
  }

  const defaultTrigger = (
    <div className="flex gap-0_5 items-center cursor-pointer w-full mb-1">
      <ChevronDown
        width={24}
        height={24}
        className={cn(
          'text-neutral-1000 transition-transform duration-300 shrink-0',
          open && 'rotate-180',
        )}
      />
      <Typography variant="h6" color="default">
        {title}
      </Typography>
    </div>
  )

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <Collapsible.Root open={open} onOpenChange={handleToggle}>
        <Collapsible.Trigger asChild>
          {renderTrigger ? renderTrigger(open) : defaultTrigger}
        </Collapsible.Trigger>

        <Collapsible.Content
          className={cn(
            'flex flex-col w-full overflow-hidden',
            'transition-all duration-300 ease-in-out',
            'data-[state=closed]:animate-collapse-up',
            'data-[state=open]:animate-collapse-down',
            contentClassName,
          )}
        >
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}
