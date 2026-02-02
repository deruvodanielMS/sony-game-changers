import { ReactNode } from 'react'

export type SwitcherSize = 'small' | 'large'
export type SwitcherVariant = 'generic' | 'success' | 'info' | 'error' | 'danger'

export interface SwitcherItemProps {
  id: string
  label?: string
  icon?: ReactNode
  ariaLabel?: string
  disabled?: boolean
}

export interface SwitcherProps {
  items: SwitcherItemProps[]
  value: string
  onChange: (value: string) => void
  size?: SwitcherSize
  variant?: SwitcherVariant
  className?: string
  ariaLabel?: string
}
