'use client'

import { useTranslations } from 'next-intl'
import { DynamicInputList } from './DynamicInputList'
import type { InputItem } from '@/hooks/useAmbitionForm'

export interface AchievementsFieldProps {
  items: InputItem[]
  hasError?: boolean
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, value: string) => void
}

/**
 * Achievements input field for ambition forms
 * Wrapper around DynamicInputList with translated strings
 */
export function AchievementsField({
  items,
  hasError,
  onAdd,
  onRemove,
  onUpdate,
}: AchievementsFieldProps) {
  const t = useTranslations('CreateGoal')

  return (
    <DynamicInputList
      label={t('achievements.label')}
      description={t('achievements.description')}
      subDescription={t('achievements.subDescription')}
      placeholder={t('achievements.placeholder')}
      addButtonText={t('achievements.addAchievement')}
      removeAriaLabel={t('achievements.removeAchievement')}
      errorMessage={t('achievements.error') || 'At least one achievement is required'}
      items={items}
      hasError={hasError}
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  )
}

AchievementsField.displayName = 'AchievementsField'
