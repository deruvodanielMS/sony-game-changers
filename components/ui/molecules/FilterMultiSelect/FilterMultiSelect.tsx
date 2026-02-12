'use client'

import { Check, ListFilter } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/atoms/Button'
import type { FilterMultiSelectOption, FilterMultiSelectProps } from './FilterMultiSelect.types'
import { cn } from '@/utils/cn'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'

const contentBaseClasses =
  'absolute z-[var(--z-dropdown)] overflow-auto rounded-small ' +
  'max-h-[232px] p-0_25 border border-neutral-300 bg-neutral-0 shadow-select mt-0_25 ' +
  'animate-in fade-in-0 zoom-in-95'

const optionClasses =
  'transition-hover w-full flex gap-1 items-center h-3 border-box px-1 py-0_75 cursor-pointer text-neutral-1000 text-body leading-body hover:bg-neutral-100'

export function FilterMultiSelect({
  label,
  options,
  onSelect,
  selected = [],
  className,
  single = false,
  'data-testid': dataTestId,
}: FilterMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useOnClickOutside(contentRef, () => setOpen(false), {
    additionalRefs: [triggerRef],
    events: ['pointerdown'],
  })

  const handleSelectOption = (value: string) => {
    if (single) {
      onSelect([value])
      setOpen(false)
      return
    }
    const alreadySelected = selected.includes(value)

    const _selected = alreadySelected ? selected.filter((v) => v !== value) : [...selected, value]
    onSelect(_selected)
    setOpen(false)
  }

  const selectedInfo = (() => {
    if (selected.length === 1) {
      return options.find(({ value }) => value === selected[0])?.label || ''
    }
    if (selected.length > 1) {
      return `(${selected.length})`
    }
    return 'All'
  })()

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      data-testid={dataTestId}
      className={className}
    >
      <div className="flex ">
        <Collapsible.Trigger ref={triggerRef} asChild>
          <Button
            size="small"
            aria-label={label}
            variant="link"
            leftIcon={<ListFilter width={20} />}
            onClick={() => setOpen(!open)}
            title={selectedInfo}
          >
            {label}: <span className="max-w-6 truncate">{selectedInfo}</span>
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content ref={contentRef} asChild>
        <ul className={cn(contentBaseClasses)}>
          {options.map(({ label, value }: FilterMultiSelectOption) => (
            <li key={value} className={optionClasses} onClick={() => handleSelectOption(value)}>
              {label} {selected.includes(value) && <Check width={16} className="inline-block" />}
            </li>
          ))}
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
