import { ReactNode } from 'react'

export type RadioGroupSize = 'small' | 'large'

export interface RadioGroupItemProps {
  id: string
  label: string
  icon?: ReactNode
  ariaLabel?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  items: RadioGroupItemProps[]
  value: string
  onChange: (value: string) => void
  size?: RadioGroupSize
  className?: string
  ariaLabel?: string
  'data-test-id'?: string
}
