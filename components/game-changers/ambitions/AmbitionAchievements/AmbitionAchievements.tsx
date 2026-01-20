'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { AchievementItem } from '@/components/ui/molecules/AchievementItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionAchievementsProps, Achievement } from './AmbitionAchievements.types'

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
          ? { ...achievement, completed: !achievement.completed, progress: null }
          : achievement,
      )
      onAchievementChange?.(updated)
      return updated
    })
  }

  const handleProgressChange = (
    id: string | number,
    progress: 'not-started' | 'on-track' | 'off-track',
  ) => {
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
        contentClassName="gap-1"
      >
        {achievements.map((achievement) => (
          <AchievementItem
            key={achievement.id}
            text={achievement.text}
            completed={achievement.completed}
            progress={achievement.progress}
            onToggle={() => handleAchievementToggle(achievement.id)}
            onProgressChange={(progress) => handleProgressChange(achievement.id, progress)}
            size={isMobile ? 'sm' : 'md'}
          />
        ))}
      </CollapsibleSection>
    </div>
  )
}
