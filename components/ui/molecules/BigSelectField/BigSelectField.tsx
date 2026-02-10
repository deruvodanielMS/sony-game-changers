'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check, UserCircle, XCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Typography } from '@/components/ui/foundations/Typography'
import { Avatar } from '@/components/ui/atoms/Avatar'
import type { BigSelectFieldProps } from './BigSelectField.types'

export const BigSelectField = React.forwardRef<HTMLButtonElement, BigSelectFieldProps>(
  (
    {
      options,
      label,
      placeholder = 'Select option',
      value,
      defaultValue,
      onValueChange,
      disabled,
      error,
      required,
      className,
      triggerClassName,
      placeholderIcon,
      hidePlaceholderIcon = false,
      'data-test-id': dataTestId,
      ...rootProps
    },
    ref,
  ) => {
    const selectedOption = options.find((option) => option.value === value)
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-0_5', className)} data-test-id={dataTestId}>
        {label && (
          <label className="text-body font-semibold text-neutral-1000">
            {label}
            {required && <span className="text-feedback-error-500 ml-0_25">*</span>}
          </label>
        )}

        <Select.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          {...rootProps}
        >
          <Select.Trigger
            ref={ref}
            className={cn(
              'group inline-flex w-full items-center justify-between gap-1_5',
              'rounded-large border p-1_5',
              'text-neutral-1000 outline-none transition-colors',
              'focus-visible:ring-2 focus-visible:ring-accent-primary/20',
              'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              hasError
                ? 'border-feedback-error-500 bg-neutral-0'
                : selectedOption
                  ? 'border-neutral-200'
                  : 'border-neutral-200 bg-neutral-100',
              triggerClassName,
            )}
            style={
              selectedOption && !hasError && !disabled
                ? { background: 'var(--gradient-100)' }
                : undefined
            }
            aria-invalid={hasError}
            aria-describedby={hasError ? `${dataTestId}-error` : undefined}
          >
            {selectedOption ? (
              <div className="flex items-center gap-1_5">
                {selectedOption.avatar ? (
                  <Avatar src={selectedOption.avatar} alt={selectedOption.label} size="lg" />
                ) : selectedOption.icon ? (
                  <div className="flex items-center justify-center w-2_5 h-2_5 rounded-full shrink-0">
                    {selectedOption.icon}
                  </div>
                ) : null}
                <div className="flex flex-col items-start">
                  <Typography variant="body" fontWeight="semibold">
                    {selectedOption.label}
                  </Typography>
                  {selectedOption.description && (
                    <Typography variant="bodySmall" className="text-neutral-600">
                      {selectedOption.description}
                    </Typography>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1_5">
                {!hidePlaceholderIcon &&
                  (placeholderIcon ? (
                    <div className="flex items-center justify-center w-2_5 h-2_5 rounded-full bg-neutral-0 shrink-0">
                      {placeholderIcon}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-2_5 h-2_5 rounded-full bg-neutral-0 shrink-0">
                      <UserCircle width={40} height={40} className="text-neutral-500" />
                    </div>
                  ))}
                <Typography variant="body" className="text-neutral-500">
                  {placeholder}
                </Typography>
              </div>
            )}
            <Select.Icon className="text-neutral-700 shrink-0 transition-transform group-data-[state=open]:rotate-180">
              <ChevronDown width={20} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              position="popper"
              side="bottom"
              sideOffset={4}
              className={cn(
                'z-[900] min-w-[var(--radix-select-trigger-width)] overflow-hidden',
                'rounded-small max-h-[232px] p-0_25 border border-neutral-300',
                'bg-neutral-0 shadow-select animate-in fade-in-0 zoom-in-95',
              )}
            >
              <Select.Viewport className="overflow-auto">
                {options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      'relative flex w-full cursor-default select-none items-center',
                      'rounded-small h-3 border-box py-0_75 px-1',
                      'text-neutral-1000 text-body leading-body',
                      'outline-none focus:bg-neutral-100 data-[highlighted]:bg-neutral-100',
                      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    )}
                  >
                    <Select.ItemText>
                      <div className="flex items-center gap-1_5 flex-1">
                        {option.avatar ? (
                          <Avatar src={option.avatar} alt={option.label} size="md" />
                        ) : option.icon ? (
                          <div className="flex items-center justify-center w-2 h-2 rounded-full shrink-0">
                            {option.icon}
                          </div>
                        ) : null}
                        <div className="flex flex-col items-start">
                          <Typography variant="body" fontWeight="semibold">
                            {option.label}
                          </Typography>
                          {option.description && (
                            <Typography variant="bodySmall" className="text-neutral-600">
                              {option.description}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </Select.ItemText>
                    <Select.ItemIndicator className="inline-flex items-center justify-center ml-1">
                      <Check width={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {hasError && (
          <div className="flex items-center gap-0_5">
            <XCircle width={20} height={20} className="text-feedback-error-500 shrink-0" />
            <span
              className="text-body-small leading-body-small font-normal"
              style={{ color: 'var(--feedback-error-500)' }}
              id={`${dataTestId}-error`}
              role="alert"
            >
              {error}
            </span>
          </div>
        )}
      </div>
    )
  },
)

BigSelectField.displayName = 'BigSelectField'
