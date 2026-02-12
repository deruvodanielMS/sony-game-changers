'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/utils/cn'
import type { DropdownMenuProps } from './DropdownMenu.types'

/**
 * DropdownMenu - A dropdown menu component built with Radix UI
 *
 * @example
 * ```tsx
 * <DropdownMenu
 *   trigger={<Button iconOnly><MoreHorizontal /></Button>}
 *   items={[
 *     { label: 'Edit', icon: <Pencil />, onClick: handleEdit },
 *     { label: 'Archive', icon: <Archive />, onClick: handleArchive },
 *   ]}
 * />
 * ```
 */
export function DropdownMenu({
  trigger,
  items,
  align = 'end',
  side = 'bottom',
  className,
  'data-test-id': dataTestId,
}: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild data-testid={dataTestId}>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          side={side}
          sideOffset={8}
          className={cn(
            'z-50 min-w-[160px] overflow-hidden rounded-small',
            'border border-neutral-300 bg-neutral-0 shadow-select',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
        >
          <div className="p-0_25">
            {items.map((item, index) => (
              <DropdownMenuPrimitive.Item
                key={index}
                disabled={item.disabled}
                onSelect={item.onClick}
                className={cn(
                  'flex items-center gap-0_5 h-3 px-1 py-0_75 rounded-small cursor-pointer',
                  'text-body leading-body',
                  'outline-none transition-colors',
                  'focus:bg-neutral-100 hover:bg-neutral-100',
                  'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                  item.variant === 'danger'
                    ? 'text-feedback-error-500 focus:text-feedback-error-600'
                    : 'text-neutral-1000',
                )}
              >
                {item.icon && (
                  <span className="flex items-center justify-center [&_svg]:size-1">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </DropdownMenuPrimitive.Item>
            ))}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

DropdownMenu.displayName = 'DropdownMenu'
