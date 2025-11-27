import React from 'react'

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Any valid HTML input type */
  type?: React.HTMLInputTypeAttribute

  /** Optional icon rendered on the left */
  leftIcon?: React.ReactNode

  /** Optional icon rendered on the right */
  rightIcon?: React.ReactNode

  /** When true the component takes full width (default: true) */
  fullWidth?: boolean

  /** Passthrough test id */
  'data-test-id'?: string
}

export default TextFieldProps
