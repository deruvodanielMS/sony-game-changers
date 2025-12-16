export type AvatarSelectOption = {
  url: string
  uid: string
  name: string
}

export type AvatarSelectProps = {
  options: Array<AvatarSelectOption>
  selected?: Array<string>
  showItems?: number
  onAvatarSelect: (avatarUrl: Array<string>) => void
  'data-testid'?: string
}
