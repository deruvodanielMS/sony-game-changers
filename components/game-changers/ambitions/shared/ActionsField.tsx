'use client'

import { useTranslations } from 'next-intl'
import { DynamicInputList } from './DynamicInputList'
import type { InputItem } from '@/hooks/useAmbitionForm'

export interface ActionsFieldProps {
  items: InputItem[]
  hasError?: boolean
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, value: string) => void
}

/**
 * Actions input field for ambition forms
 * Wrapper around DynamicInputList with translated strings
 */
export function ActionsField({ items, hasError, onAdd, onRemove, onUpdate }: ActionsFieldProps) {
  const t = useTranslations('CreateGoal')

  return (
    <DynamicInputList
      label={t('planActions.label')}
      description={t('planActions.description')}
      subDescription={t('planActions.subDescription')}
      placeholder={t('planActions.placeholder')}
      addButtonText={t('planActions.addAction')}
      removeAriaLabel={t('planActions.removeAction')}
      errorMessage={t('planActions.error') || 'At least one action is required'}
      items={items}
      hasError={hasError}
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  )
}

ActionsField.displayName = 'ActionsField'
