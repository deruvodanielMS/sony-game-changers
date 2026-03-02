export type SharedMember = {
  id: string
  name: string
  avatarUrl?: string
}

export type SharedWithModalProps = {
  open: boolean
  onClose: () => void
  members: SharedMember[]
}
