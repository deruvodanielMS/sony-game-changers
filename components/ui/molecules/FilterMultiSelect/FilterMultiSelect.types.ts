export type FilterMultiSelectOption = {
  label: string
  value: string
}

export type FilterMultiSelectProps = {
  label: string
  onSelect: (selected: Array<string>) => void
  options: Array<FilterMultiSelectOption>
  selected?: Array<string>
  'data-testid'?: string
}
