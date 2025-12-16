export interface SearchFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'leftIcon' | 'rightIcon' | 'onChange' | 'defaultChecked'
> {
  onChange: (value: string) => void
  debounce?: number
  buttonSearch?: boolean
  defaultValue?: string
  'data-testid'?: string
}
