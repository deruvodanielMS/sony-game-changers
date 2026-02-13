import type { ArrowType } from '@/components/ui/atoms/Arrow'
import type { GoalStatus } from '@/domain/goal'
import type { AmbitionStatusVariant } from '@/components/ui/atoms/AmbitionStatus/AmbitionStatus.types'

export interface LadderedAmbitionProps {
  title: string
  userName: string
  avatarUrl?: string | null
  progress: number
  status: GoalStatus | string
  /**
   * @deprecated Use status instead - label is now computed from status using centralized helpers
   */
  statusLabel?: string
  /**
   * @deprecated Use status instead - variant is now computed from status using centralized helpers
   */
  statusVariant?: AmbitionStatusVariant
  arrowType?: ArrowType
  href: string
  className?: string
}
