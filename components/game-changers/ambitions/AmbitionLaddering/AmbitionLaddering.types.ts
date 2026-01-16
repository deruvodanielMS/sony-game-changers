export type ViewMode = 'grid' | 'list'

export interface LadderedAmbition {
  id: string
  title: string
  assignee: {
    uid?: string
    name: string
    avatar: string
  }
  progress: number
  status?: string
}

export interface AvatarOption {
  uid: string
  name: string
  url: string
}

export interface AmbitionLadderingProps {
  ambitions: LadderedAmbition[]
  avatarOptions?: AvatarOption[]
  onAddAmbition?: () => void
  className?: string
}
