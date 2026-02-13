'use client'

import { m, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, XCircle } from 'lucide-react'
import { TextField } from '@/components/ui/atoms/TextField'
import { Button } from '@/components/ui/atoms/Button'
import { Card } from '@/components/ui/atoms/Card'
import { Typography } from '@/components/ui/foundations/Typography'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { cn } from '@/utils/cn'
import type { InputItem } from '@/hooks/useAmbitionForm'

export interface DynamicInputListProps {
  /** Label for the card section */
  label: string
  /** Description text */
  description: string
  /** Sub-description text */
  subDescription: string
  /** Placeholder for input fields */
  placeholder: string
  /** Button text for adding new item */
  addButtonText: string
  /** Aria label for remove button */
  removeAriaLabel: string
  /** Error message to display */
  errorMessage?: string
  /** List of input items */
  items: InputItem[]
  /** Whether to show validation error */
  hasError?: boolean
  /** Handler for adding new item */
  onAdd: () => void
  /** Handler for removing an item */
  onRemove: (id: string) => void
  /** Handler for updating an item */
  onUpdate: (id: string, value: string) => void
}

/**
 * Reusable dynamic input list component for actions and achievements
 * Extracts 100+ lines of duplicated JSX from both ambition forms
 */
export function DynamicInputList({
  label,
  description,
  subDescription,
  placeholder,
  addButtonText,
  removeAriaLabel,
  errorMessage,
  items,
  hasError = false,
  onAdd,
  onRemove,
  onUpdate,
}: DynamicInputListProps) {
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

  return (
    <div className="flex flex-col gap-1">
      <div className={cn('flex gap-1', isMobile ? 'flex-col' : 'flex-row items-start')}>
        <Card className="flex flex-col gap-0_5 md:gap-1_5 bg-neutral-100 border-none p-1 md:p-1_5 md:w-[270px] shrink-0">
          <Typography variant="h6">
            {label}
            <span className="text-feedback-error-500 ml-0_25">*</span>
          </Typography>
          <Typography variant="body" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="body" color="textSecondary">
            {subDescription}
          </Typography>
        </Card>

        <div className="flex flex-col gap-0_75 flex-1">
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <m.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex flex-col gap-0_5 origin-top"
              >
                <div className="flex items-center gap-0_75">
                  <TextField
                    value={item.value}
                    onChange={(e) => onUpdate(item.id, e.target.value)}
                    placeholder={placeholder}
                    className="flex-1"
                    aria-invalid={index === 0 && hasError}
                  />
                  {index > 0 && (
                    <Button
                      variant="link"
                      size="small"
                      onClick={() => onRemove(item.id)}
                      aria-label={removeAriaLabel}
                      className="shrink-0"
                    >
                      <Trash2 width={18} className="text-neutral-600" />
                    </Button>
                  )}
                </div>
                {index === 0 && hasError && errorMessage && (
                  <div className="flex items-center gap-0_5">
                    <XCircle width={20} height={20} className="text-feedback-error-500 shrink-0" />
                    <span
                      className="text-body-small leading-body-small font-normal"
                      style={{ color: 'var(--feedback-error-500)' }}
                    >
                      {errorMessage}
                    </span>
                  </div>
                )}
              </m.div>
            ))}
          </AnimatePresence>

          <Button
            variant="link"
            size="small"
            onClick={onAdd}
            leftIcon={<Plus width={18} />}
            className="self-start text-accent-primary"
          >
            {addButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

DynamicInputList.displayName = 'DynamicInputList'
