'use client'

import { useState, useCallback } from 'react'
import { GOAL_TYPES, type GoalType, type GoalUI } from '@/domain/goal'
import type { NewAmbitionShareMember } from '@/repositories/mocks/data/goals'
import type {
  PrivacyValue,
  InputItem,
  AmbitionFormErrors,
  AmbitionFormState,
  AmbitionFormHandlers,
  UseAmbitionFormReturn,
  EditAmbitionFormData,
} from './types'

/**
 * Creates initial empty items for actions/achievements
 */
function createEmptyItems(count: number = 3): InputItem[] {
  return Array.from({ length: count }, () => ({
    id: crypto.randomUUID(),
    value: '',
  }))
}

/**
 * Transforms goal actions/achievements to InputItem format
 */
export function goalItemsToInputItems(
  items: Array<{ id?: string; title: string }> | undefined,
): InputItem[] {
  if (!items || items.length === 0) {
    return createEmptyItems()
  }
  return items.map((item) => ({
    id: item.id || crypto.randomUUID(),
    value: item.title,
  }))
}

/**
 * Options for initializing the form
 */
export interface UseAmbitionFormOptions {
  /** Initial goal data for edit mode */
  initialGoal?: GoalUI
  /** Parent ambition ID for laddering (new form) */
  parentAmbitionId?: string
}

/**
 * Shared hook for managing ambition form state and validation
 * Used by both EditAmbitionForm and NewAmbitionForm
 *
 * Note: For edit mode, pass a key prop to the component that uses this hook
 * to force re-initialization when the goal changes: <EditAmbitionForm key={goal.id} ... />
 */
export function useAmbitionForm(options: UseAmbitionFormOptions = {}): UseAmbitionFormReturn {
  const { initialGoal, parentAmbitionId } = options

  // Step 1 state - Initialize from goal or defaults
  const [goalType, setGoalTypeState] = useState<GoalType>(
    () => (initialGoal?.goalType as GoalType) || GOAL_TYPES.BUSINESS,
  )
  const [owner, setOwnerState] = useState(() => initialGoal?.uid || '')
  const [privacy, setPrivacy] = useState<PrivacyValue>('public')
  const [sharedMembers, setSharedMembers] = useState<NewAmbitionShareMember[]>([])

  // Step 2 state - Initialize from goal or defaults
  const [ladderedFrom, setLadderedFromState] = useState(
    () => initialGoal?.parent?.id || parentAmbitionId || '',
  )
  const [ambitionName, setAmbitionName] = useState(() => initialGoal?.title || '')
  const [description, setDescription] = useState(() => initialGoal?.description || '')
  const [actions, setActions] = useState<InputItem[]>(() =>
    goalItemsToInputItems(initialGoal?.goalActions),
  )
  const [achievements, setAchievements] = useState<InputItem[]>(() =>
    goalItemsToInputItems(initialGoal?.goalAchievements),
  )

  // Validation errors state
  const [errors, setErrors] = useState<AmbitionFormErrors>({
    owner: false,
    ladderedFrom: false,
    ambitionName: false,
    actions: false,
    achievements: false,
  })

  // Clear error helper
  const clearError = useCallback((field: keyof AmbitionFormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: false }))
  }, [])

  // Goal type setter that also clears ladderedFrom when needed
  const setGoalType = useCallback(
    (type: GoalType) => {
      setGoalTypeState(type)
      // Clear ladderedFrom when changing to non-business type (unless parentAmbitionId is set)
      if (type !== GOAL_TYPES.BUSINESS && !parentAmbitionId) {
        setLadderedFromState('')
      }
    },
    [parentAmbitionId],
  )

  // Owner handler with error clearing
  const setOwner = useCallback(
    (value: string) => {
      setOwnerState(value)
      if (value) {
        clearError('owner')
      }
    },
    [clearError],
  )

  // Laddered from handler with error clearing
  const setLadderedFrom = useCallback(
    (value: string) => {
      setLadderedFromState(value)
      if (value) {
        clearError('ladderedFrom')
      }
    },
    [clearError],
  )

  // Actions handlers
  const addAction = useCallback(() => {
    setActions((prev) => [...prev, { id: crypto.randomUUID(), value: '' }])
  }, [])

  const removeAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateAction = useCallback(
    (id: string, value: string) => {
      setActions((prev) => prev.map((item) => (item.id === id ? { ...item, value } : item)))
      if (value.trim()) {
        clearError('actions')
      }
    },
    [clearError],
  )

  // Achievements handlers
  const addAchievement = useCallback(() => {
    setAchievements((prev) => [...prev, { id: crypto.randomUUID(), value: '' }])
  }, [])

  const removeAchievement = useCallback((id: string) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateAchievement = useCallback(
    (id: string, value: string) => {
      setAchievements((prev) => prev.map((item) => (item.id === id ? { ...item, value } : item)))
      if (value.trim()) {
        clearError('achievements')
      }
    },
    [clearError],
  )

  // Validation logic
  const isStepValid = useCallback(
    (step: number): boolean => {
      if (step === 1) {
        return owner !== ''
      } else if (step === 2) {
        const hasLadderedFrom = goalType === GOAL_TYPES.BUSINESS ? ladderedFrom !== '' : true
        const hasAmbitionName = ambitionName.trim() !== ''
        const hasActions = actions.some((action) => action.value.trim() !== '')
        const hasAchievements = achievements.some((achievement) => achievement.value.trim() !== '')
        return hasLadderedFrom && hasAmbitionName && hasActions && hasAchievements
      }
      return false
    },
    [owner, goalType, ladderedFrom, ambitionName, actions, achievements],
  )

  // Validate and set errors
  const validate = useCallback(
    (step: number): boolean => {
      if (step === 1) {
        const isValid = owner !== ''
        if (!isValid) {
          setErrors((prev) => ({ ...prev, owner: true }))
        }
        return isValid
      } else if (step === 2) {
        const hasLadderedFrom = goalType === GOAL_TYPES.BUSINESS ? ladderedFrom !== '' : true
        const hasAmbitionName = ambitionName.trim() !== ''
        const hasActions = actions.some((action) => action.value.trim() !== '')
        const hasAchievements = achievements.some((achievement) => achievement.value.trim() !== '')

        setErrors((prev) => ({
          ...prev,
          ladderedFrom: !hasLadderedFrom,
          ambitionName: !hasAmbitionName,
          actions: !hasActions,
          achievements: !hasAchievements,
        }))

        return hasLadderedFrom && hasAmbitionName && hasActions && hasAchievements
      }
      return false
    },
    [owner, goalType, ladderedFrom, ambitionName, actions, achievements],
  )

  // Get form data for submission
  const getFormData = useCallback((): EditAmbitionFormData => {
    return {
      goalType,
      owner,
      privacy,
      sharedMembers,
      ladderedFrom: goalType === GOAL_TYPES.BUSINESS ? ladderedFrom : undefined,
      ambitionName,
      description,
      actions: actions.filter((action) => action.value.trim() !== '').map((a) => a.value),
      achievements: achievements
        .filter((achievement) => achievement.value.trim() !== '')
        .map((a) => a.value),
    }
  }, [
    goalType,
    owner,
    privacy,
    sharedMembers,
    ladderedFrom,
    ambitionName,
    description,
    actions,
    achievements,
  ])

  // Build state object
  const state: AmbitionFormState = {
    goalType,
    owner,
    privacy,
    sharedMembers,
    ladderedFrom,
    ambitionName,
    description,
    actions,
    achievements,
    errors,
  }

  // Build handlers object
  const handlers: AmbitionFormHandlers = {
    setGoalType,
    setOwner,
    setPrivacy,
    setSharedMembers,
    setLadderedFrom,
    setAmbitionName,
    setDescription,
    addAction,
    removeAction,
    updateAction,
    addAchievement,
    removeAchievement,
    updateAchievement,
    validate,
    clearError,
  }

  return {
    state,
    handlers,
    getFormData,
    isStepValid,
  }
}
