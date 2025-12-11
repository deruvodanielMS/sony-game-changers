'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

import type { SelectFieldProps, SelectOption } from './SelectField.types'

function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ')
}

function renderOptions(options: SelectOption[]) {
  const itemBase =
    'relative flex w-full cursor-default select-none items-center rounded-small h-3 items-center border-box py-0_75 px-1 data-[state="checked"]:pr-4 ' +
    'text-neutral-1000 text-body leading-body ' +
    'outline-none focus:bg-gray-100 data-[highlighted]:bg-gray-100 ' +
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-gray-900'

  return options.map((option) => (
    <Select.Item
      key={option.value}
      value={option.value}
      disabled={option.disabled}
      className={cn(itemBase)}
    >
      <Select.ItemText>{option.label}</Select.ItemText>
      <Select.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
        <Check width={16} />
      </Select.ItemIndicator>
    </Select.Item>
  ))
}

export const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      options,
      placeholder,
      value,
      defaultValue,
      onValueChange,
      disabled,
      icon,
      className,
      contentClassName,
      id,
      'data-testid': dataTestId,
      children,
      ...rootProps
    },
    ref,
  ) => {
    const triggerBaseClasses =
      'inline-flex w-full items-center justify-between h-3 border-box px-1 py-0_75 ' +
      'rounded-small border border-neutral-1000 bg-neutral-0 ' +
      'text-neutral-1000 outline-none ' +
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ' +
      'focus-visible:border-blue-500 ' +
      'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ' +
      'transition-colors'

    const valueClasses =
      'block flex-1 text-left truncate text-gray-900 data-[placeholder]:text-gray-400'

    const contentBaseClasses =
      'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-small ' +
      'max-h-[232px] p-0_25 border border-neutral-300 rounded-small bg-neutral-0 shadow-select mt-0_25 ' +
      'animate-in fade-in-0 zoom-in-95'

    return (
      <Select.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        {...rootProps}
      >
        <Select.Trigger
          ref={ref}
          id={id}
          className={cn(triggerBaseClasses, className, 'group')}
          aria-disabled={disabled}
          data-testid={dataTestId}
        >
          <Select.Value placeholder={placeholder} className={valueClasses} />
          <Select.Icon className="transition-transform group-data-[state=open]:rotate-180">
            {icon ?? <ChevronDown width={24} />}
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={cn(contentBaseClasses, contentClassName)} position="popper">
            <Select.ScrollUpButton className="flex items-center justify-center border-b border-neutral-300 py-0_25 text-gray-500">
              <ChevronUp width={24} />
            </Select.ScrollUpButton>

            <Select.Viewport className="overflow-auto">
              {options && options.length > 0 ? renderOptions(options) : children}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center border-t border-neutral-300 bg-neutral-0 py-0_25 text-gray-500">
              <ChevronDown width={24} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  },
)

SelectField.displayName = 'SelectField'
