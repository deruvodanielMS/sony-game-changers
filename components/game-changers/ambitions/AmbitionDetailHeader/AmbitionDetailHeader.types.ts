import type { AmbitionType } from '@/domain/ambition'

export interface AmbitionDetailHeaderProps {
  title: string
  userName: string
  avatarUrl?: string
  ambitionType?: AmbitionType | string
  progress: number
  createdDate?: string
  updatedDate?: string
  className?: string
}
