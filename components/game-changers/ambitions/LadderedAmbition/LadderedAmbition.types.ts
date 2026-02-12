import type { ArrowType } from '@/components/ui/atoms/Arrow'
import type { GoalStatus } from '@/domain/goal'

export interface LadderedAmbitionProps {
  title: string
  userName: string
  avatarUrl?: string | null
  progress: number
  status: GoalStatus | string
  statusLabel?: string
  statusVariant?: 'draft' | 'awaiting-approval' | 'in-progress' | 'done' | 'archived' | 'default'
  arrowType?: ArrowType
  href: string
  className?: string
}
