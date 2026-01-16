'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronUp } from 'lucide-react'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { CollapsibleSectionProps } from './CollapsibleSection.types'

/**
 * CollapsibleSection - Reusable accordion component using Radix UI
 *
 * Features:
 * - Built on Radix UI Accordion for accessibility
 * - Keyboard navigation support
 * - Smooth animations
 * - Controlled or uncontrolled state
 * - ARIA attributes automatically handled
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
  // Convert boolean to Accordion value format
  const value = open !== undefined ? (open ? 'item' : '') : undefined
  const defaultValue = defaultOpen ? 'item' : ''

  const handleValueChange = (newValue: string) => {
    if (onToggle) {
      onToggle(newValue === 'item')
    }
  }

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      className={cn('flex flex-col gap-1 items-start w-full', className)}
    >
      <Accordion.Item value="item" className="w-full">
        <Accordion.Header className="w-full">
          <Accordion.Trigger className="flex gap-0.75 items-center w-full group">
            <div className="flex items-center justify-center size-2 transition-transform group-data-[state=closed]:rotate-180 group-data-[state=closed]:scale-y-[-100%]">
              <ChevronUp className="size-1.5 text-neutral-1000" aria-hidden="true" />
            </div>
            <Typography variant="h6" fontWeight="semibold" color="default">
              {title}
            </Typography>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="flex flex-col gap-0.5 w-full overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
