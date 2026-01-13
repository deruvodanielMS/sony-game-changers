'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Collapsible } from 'radix-ui'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/atoms/Button'
import { AvatarSelectOption, AvatarSelectProps } from './AvatarSelect.types'
import { cn } from '@/utils/cn'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'

const contentBaseClasses =
  'absolute z-50 overflow-auto rounded-small ' +
  'max-h-[232px] p-0_25 border border-neutral-300 bg-neutral-0 shadow-select mt-0_25 ' +
  'animate-in fade-in-0 zoom-in-95'

const optionClasses =
  'transition-hover w-full flex gap-1 items-center h-3 border-box px-1 py-0_75 cursor-pointer text-neutral-1000 text-body leading-body hover:bg-neutral-100'

const avatarSelectionGradient =
  'bg-gradient-to-r from-gradient-avatar-from to-gradient-avatar-to p-[2px]'

export function AvatarSelect({
  options,
  selected = [],
  showItems = 5,
  className,
  onAvatarSelect,
  'data-testid': dataTestid,
}: AvatarSelectProps) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useOnClickOutside(contentRef, () => setOpen(false), {
    additionalRefs: [triggerRef],
    events: ['pointerdown'],
  })

  const optionsShown = options.slice(0, showItems)
  const collapsibleOptions = options.slice(showItems)

  const handleAvatarSelect = (uid: string) => {
    const alreadySelected = selected.includes(uid)
    onAvatarSelect(
      alreadySelected ? selected.filter((_uid: string) => uid != _uid) : [...selected, uid],
    )
  }

  return (
    <div className={cn('flex gap-0 items-center', className)} data-testid={dataTestid}>
      {optionsShown.map(({ url, uid, name }: AvatarSelectOption) => {
        const isSelected = selected?.includes(uid)
        return (
          <button
            key={uid}
            title={name}
            onClick={() => handleAvatarSelect(uid)}
            className={cn(
              'w-2 h-2 shrink-0 grow-0 -ml-0_25 z-1 hover:z-2 rounded-full transition-transform hover:scale-105',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2',
              isSelected && avatarSelectionGradient,
            )}
          >
            <Image
              src={url}
              alt={name}
              width={32}
              height={32}
              className={cn('rounded-full', isSelected ? 'w-full h-full' : '')}
            />
          </button>
        )
      })}

      {!!collapsibleOptions.length && (
        <Collapsible.Root open={open} onOpenChange={setOpen} className="z-3">
          <Collapsible.Trigger ref={triggerRef} asChild>
            <Button
              variant="plain"
              iconOnly
              onClick={() => setOpen(!open)}
              className="shrink-0 grow-0 basis-2 !w-2 !h-2 -ml-0_25 border z-2 border-dashed border-neutral-400 !bg-neutral-0 hover:!shadow-none hover:!bg-neutral-100"
            >
              <Plus width={16} className="text-neutral-400" />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content ref={contentRef} asChild className="absolute">
            <ul className={contentBaseClasses}>
              {collapsibleOptions.map(({ url, uid, name }: AvatarSelectOption) => {
                const _isSelected = selected?.includes(uid)
                return (
                  <li key={uid} className={optionClasses} onClick={() => handleAvatarSelect(uid)}>
                    <div className={cn('rounded-full', _isSelected && avatarSelectionGradient)}>
                      <Image src={url} alt={name} width={32} height={32} className="rounded-full" />
                    </div>
                    <span>{name}</span>
                  </li>
                )
              })}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  )
}
