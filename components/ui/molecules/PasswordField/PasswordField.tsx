'use client'

import React, { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { TextField } from '@/components/ui/atoms/TextField/TextField'
import { Eye, EyeOff } from 'lucide-react'
import type { PasswordFieldProps } from './PasswordField.types'

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(props, ref) {
    const {
      initialType = 'password',
      toggleButtonProps,
      className,
      'data-test-id': dataTestId,
      disabled,
      readOnly,
      ...rest
    } = props

    const [visible, setVisible] = useState(initialType === 'text')

    useEffect(() => {
      setVisible(initialType === 'text')
    }, [initialType])

    const isToggleDisabled = !!disabled || !!readOnly

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isToggleDisabled) return
      if (toggleButtonProps && typeof toggleButtonProps.onClick === 'function') {
        toggleButtonProps.onClick(e)
      }
      setVisible((v) => !v)
    }

    const ariaLabel = visible ? 'Hide password' : 'Show password'

    return (
      <div className={cn('relative', className)} data-test-id={dataTestId}>
        <TextField
          ref={ref}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          readOnly={readOnly}
          className="pr-3"
          {...rest}
        />

        <button
          type="button"
          aria-label={ariaLabel}
          aria-pressed={visible}
          role="button"
          onClick={handleToggle}
          disabled={isToggleDisabled}
          {...toggleButtonProps}
          className={cn(
            'h-3 w-3 absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-neutral-1000 hover:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-1000',
            isToggleDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            toggleButtonProps && toggleButtonProps.className ? toggleButtonProps.className : '',
          )}
        >
          {visible ? (
            <Eye className="w-1_5 h-1_5" aria-hidden />
          ) : (
            <EyeOff className="w-1_5 h-1_5" aria-hidden />
          )}
        </button>
      </div>
    )
  },
)

PasswordField.displayName = 'PasswordField'
