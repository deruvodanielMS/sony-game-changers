export const HELPER_TYPE = {
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const

export type FeddbackHelperProps = {
  type: (typeof HELPER_TYPE)[keyof typeof HELPER_TYPE]
  message: string
  strength?: 0 | 1 | 2 | 3 | 4 | 5
}

export type FormControlProps = {
  label: string
  helperBefore?: Array<FeddbackHelperProps>
  helperAfter?: Array<FeddbackHelperProps>
  fullWidth?: boolean
  mandatory?: boolean
  afterLabel?: React.ReactNode
  beforeLabel?: React.ReactNode
  children?: React.ReactNode
}
