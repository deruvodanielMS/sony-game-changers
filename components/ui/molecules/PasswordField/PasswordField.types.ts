import React from 'react'
import type { TextFieldProps } from '@/components/ui/atoms/TextField/TextField.types'

export interface PasswordFieldProps extends TextFieldProps {
  /** Initial input type when mounted */
  initialType?: 'password' | 'text'

  /** Props applied to the toggle button */
  toggleButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>

  /** Passthrough test id (also forwarded to TextField) */
  'data-test-id'?: string
}

export default PasswordFieldProps
