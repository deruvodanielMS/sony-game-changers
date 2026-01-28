import { GoalUI } from '@/domain/goal'

export type ViewMode = 'grid' | 'list'

export type LadderedAmbition = Omit<GoalUI, 'parent' | 'ladderedGoals'>

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
