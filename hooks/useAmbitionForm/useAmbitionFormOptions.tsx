'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { GOAL_TYPES } from '@/domain/goal'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import type { BigSelectOption } from '@/components/ui/molecules/BigSelectField'
import { useGoalsStore } from '@/stores/goals.store'

/**
 * Switcher/RadioGroup item type
 */
export interface SwitcherItem {
  id: string
  label: string
  icon?: React.ReactNode
  ariaLabel: string
}

/**
 * Return type for useAmbitionFormOptions
 */
export interface UseAmbitionFormOptionsReturn {
  /** Goal type switcher items */
  typeItems: SwitcherItem[]
  /** Privacy switcher items */
  privacyItems: SwitcherItem[]
  /** Owner select options */
  ownerSelectOptions: BigSelectOption[]
  /** Laddered from (parent goal) options */
  ladderedFromOptions: BigSelectOption[]
}

/**
 * Shared hook for memoized form options
 * Extracts duplicated useMemo logic from both ambition forms
 */
export function useAmbitionFormOptions(): UseAmbitionFormOptionsReturn {
  const t = useTranslations('CreateGoal')
  const { goalFilters, list: goalsList } = useGoalsStore()

  // Goal type items for switcher/radio
  const typeItems = useMemo<SwitcherItem[]>(
    () => [
      {
        id: GOAL_TYPES.BUSINESS,
        label: t('type.business'),
        icon: <TypeIcon type={GOAL_TYPES.BUSINESS} variant="metadata" />,
        ariaLabel: t('type.business'),
      },
      {
        id: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        label: t('type.growth'),
        icon: <TypeIcon type={GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT} variant="metadata" />,
        ariaLabel: t('type.growth'),
      },
      {
        id: GOAL_TYPES.MANAGER_EFFECTIVENESS,
        label: t('type.manager'),
        icon: <TypeIcon type={GOAL_TYPES.MANAGER_EFFECTIVENESS} variant="metadata" />,
        ariaLabel: t('type.manager'),
      },
    ],
    [t],
  )

  // Privacy items for switcher/radio
  const privacyItems = useMemo<SwitcherItem[]>(
    () => [
      {
        id: 'public',
        label: t('privacy.public'),
        ariaLabel: t('privacy.public'),
      },
      {
        id: 'private',
        label: t('privacy.private'),
        ariaLabel: t('privacy.private'),
      },
    ],
    [t],
  )

  // Owner select options from goal filters
  const ownerSelectOptions = useMemo<BigSelectOption[]>(() => {
    const avatarOptions = goalFilters?.avatarSelector?.options ?? []
    return avatarOptions.map((option) => ({
      value: option.uid,
      label: option.name,
      description: option.role,
      avatar: option.url,
    }))
  }, [goalFilters])

  // Laddered from options - goals list
  const ladderedFromOptions = useMemo<BigSelectOption[]>(() => {
    if (!goalsList) return []

    // Filter out archived goals and map to BigSelectOption format
    return goalsList
      .filter((goal) => goal.status !== 'archived')
      .map((goal) => ({
        value: goal.id,
        label: goal.title,
        description: goal.goalType ? `${goal.goalType.replace(/_/g, ' ')}` : undefined,
      }))
  }, [goalsList])

  return {
    typeItems,
    privacyItems,
    ownerSelectOptions,
    ladderedFromOptions,
  }
}
