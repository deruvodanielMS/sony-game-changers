'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { CollapsibleSection } from '@/components/ui/molecules/CollapsibleSection'
import { Typography } from '@/components/ui/foundations/Typography'
import { Checkbox } from '@/components/ui/atoms/Checkbox'
import { cn } from '@/utils/cn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import type { AmbitionAchievementsProps, Achievement } from './AmbitionAchievements.types'

const progressVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

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
      <CollapsibleSection title={t('title')} open={isOpen} onToggle={setIsOpen}>
        {achievements.map((achievement) => (
          <m.div
            key={achievement.id}
            initial="hidden"
            animate="visible"
            variants={progressVariants}
            transition={{ duration: 0.2 }}
            className={cn(
              'flex items-center p-1.5 rounded-1 border border-solid transition-colors',
              achievement.completed
                ? 'bg-extra-green-100 border-extra-green-200'
                : 'bg-neutral-0 border-neutral-200',
              isMobile && 'flex-col items-start gap-1',
            )}
          >
            {/* Content wrapper */}
            <div className={cn('flex items-center gap-0.5 flex-1 min-w-0', isMobile && 'w-full')}>
              {/* Checkbox */}
              <label className="flex items-center gap-0.5 cursor-pointer flex-1 min-w-0">
                <Checkbox
                  checked={achievement.completed}
                  onCheckedChange={() => handleAchievementToggle(achievement.id)}
                  aria-label={achievement.text}
                />
                <Typography variant="body" color="default" className="min-w-0">
                  {achievement.text}
                </Typography>
              </label>
            </div>

            {/* Progress Selector - Only show for non-completed achievements */}
            {!achievement.completed && (
              <div
                className={cn(
                  'flex gap-0.25 bg-neutral-100 p-0.25 rounded-full shrink-0',
                  isMobile ? 'w-full justify-between' : 'ml-1.5',
                )}
              >
                {(['not-started', 'on-track', 'off-track'] as const).map((progressOption) => {
                  const isSelected = achievement.progress === progressOption
                  const labels = {
                    'not-started': t('progress.notStarted'),
                    'on-track': t('progress.onTrack'),
                    'off-track': t('progress.offTrack'),
                  }
                  const colors = {
                    'not-started': {
                      bg: 'bg-neutral-200',
                      text: 'text-neutral-700',
                    },
                    'on-track': {
                      bg: 'bg-extra-blue-100',
                      text: 'text-extra-blue-600',
                    },
                    'off-track': {
                      bg: 'bg-feedback-danger-100',
                      text: 'text-feedback-danger-600',
                    },
                  }

                  return (
                    <button
                      key={progressOption}
                      onClick={() => handleProgressChange(achievement.id, progressOption)}
                      className={cn(
                        'px-1 py-0.5 rounded-full transition-all flex-1',
                        isSelected
                          ? cn(colors[progressOption].bg, colors[progressOption].text)
                          : 'text-neutral-600 hover:bg-neutral-200',
                      )}
                    >
                      <Typography
                        variant="bodySmall"
                        fontWeight="semibold"
                        className={cn('whitespace-nowrap', isMobile && 'text-xs')}
                      >
                        {labels[progressOption]}
                      </Typography>
                    </button>
                  )
                })}
              </div>
            )}
          </m.div>
        ))}
      </CollapsibleSection>
    </div>
  )
}
