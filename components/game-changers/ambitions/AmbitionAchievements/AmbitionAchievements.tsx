'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { AchievementItem } from '@/components/ui/molecules/AchievementItem'
import { EmptyState } from '@/components/ui/molecules/EmptyState'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionAchievementsProps, Achievement } from './AmbitionAchievements.types'
import type { ProgressStatus } from '@/components/ui/molecules/AchievementItem/AchievementItem.types'
import { GOAL_STATUSES, GoalStatus } from '@/domain/goal'

const isAchievementCompleted = (status: GoalStatus) => status === GOAL_STATUSES.COMPLETED

export function AmbitionAchievements({
  achievements: initialAchievements,
  defaultOpen = true,
  onAchievementChange,
  className,
}: AmbitionAchievementsProps) {
  const t = useTranslations('AmbitionDetail.achievements')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)

  const handleAchievementToggle = (id: string | number) => {
    setAchievements((prev) => {
      const updated = prev.map((achievement) =>
        achievement.id === id
          ? {
              ...achievement,
              completed: !isAchievementCompleted(achievement.status as GoalStatus),
              progress: null,
            }
          : achievement,
      )
      onAchievementChange?.(updated)
      return updated
    })
  }

  const handleProgressChange = (id: string | number, progress: ProgressStatus) => {
    setAchievements((prev) => {
      const updated = prev.map((achievement) =>
        achievement.id === id ? { ...achievement, progress } : achievement,
      )
      onAchievementChange?.(updated)
      return updated
    })
  }

  return (
    <div className={className}>
      <CollapsibleSection
        title={t('title')}
        open={isOpen}
        onToggle={setIsOpen}
        contentClassName="p-0_5 flex flex-col gap-0_5"
      >
        {achievements.length === 0 ? (
          <EmptyState
            variant="compact"
            title={t('emptyState.title')}
            description={t('emptyState.description')}
          />
        ) : (
          achievements.map((achievement) => (
            <AchievementItem
              key={achievement.id}
              text={achievement.title}
              completed={isAchievementCompleted(achievement.status as GoalStatus)}
              progress={achievement.progress || 'off-track'}
              onProgressChange={(progress) => handleProgressChange(achievement.id, progress)}
              size={isMobile ? 'sm' : 'md'}
            />
          ))
        )}
      </CollapsibleSection>
    </div>
  )
}
