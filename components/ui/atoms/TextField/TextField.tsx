'use client'

import React, { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { TextFieldProps } from './TextField.types'

const rootStyles = cva(
  'inline-flex items-center bg-transparent rounded-small transition-colors border rounded-small h-2_75 border-box border-neutral-300 hover:border-neutral-1000',
  {
    variants: {
      disabled: {
        true: 'border-black-20 bg-black-10 text-neutral-600 cursor-not-allowed hover:border-black-20',
        false: '',
      },
      hasError: {
        true: 'border-feedback-error-500 hover:border-feedback-error-500',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
      hasError: false,
      fullWidth: true,
    },
  },
)

const inputStyles =
  'flex-1 w-full bg-transparent outline-none placeholder:text-neutral-600 text-neutral-1000 py-0_75 px-1 h-2_75'

function TextFieldImpl(props: TextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) {
  const {
    leftIcon,
    rightIcon,
    className,
    type = 'text',
    disabled,
    readOnly,
    placeholder,
    fullWidth = true,
    ['aria-invalid']: ariaInvalid,
    inputClassName,
    ...rest
  } = props

  const hasError = ariaInvalid === true || ariaInvalid === 'true'

  return (
    <div
      className={cn(
        rootStyles({ disabled: !!disabled || !!readOnly, hasError, fullWidth }),
        'focus-within:ring-1 focus-within:ring-neutral-1000',
        className,
      )}
      aria-hidden={false}
    >
      {leftIcon ? (
        <span
          className="w-3 h-3 basis-3 grow-0 shrink-0 flex items-center justify-center text-neutral-400 mr-0_25 select-none"
          aria-hidden
        >
          {leftIcon}
        </span>
      ) : null}

      <input
        ref={ref}
        type={type}
        className={cn(inputStyles, leftIcon ? 'pl-0' : '', rightIcon ? 'pr-0' : '', inputClassName)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />

      {rightIcon ? (
        <span
          className="w-3 h-3 basis-3 grow-0 shrink-0 flex items-center justify-center text-neutral-400 ml-0_25 select-none shrink-0"
          aria-hidden
        >
          {rightIcon}
        </span>
      ) : null}
    </div>
  )
}

export const TextField = forwardRef(TextFieldImpl)
TextField.displayName = 'TextField'
