'use client'

import { useMemo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { m, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, XCircle } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { FormControl } from '@/components/ui/molecules/FormControl'
import { Switcher } from '@/components/ui/molecules/Switcher'
import { RadioGroup } from '@/components/ui/atoms/RadioGroup'
import { BigSelectField } from '@/components/ui/molecules/BigSelectField'
import { TypeIcon } from '@/components/ui/molecules/TypeIcon'
import { Typography } from '@/components/ui/foundations/Typography'
import { TextField } from '@/components/ui/atoms/TextField'
import { Button } from '@/components/ui/atoms/Button'
import { Card } from '@/components/ui/atoms/Card'
import type { BigSelectOption } from '@/components/ui/molecules/BigSelectField'
import { GOAL_TYPES, type GoalType } from '@/domain/goal'
import { useGoalsStore } from '@/stores/goals.store'
import { cn } from '@/utils/cn'
import type { EditAmbitionFormProps, EditAmbitionFormData } from './EditAmbitionForm.types'
import type { NewAmbitionShareMember } from '@/repositories/mocks/data/goals'

type PrivacyValue = 'public' | 'private'

type InputItem = { id: string; value: string }

export function EditAmbitionForm({
  goal,
  className,
  step = 1,
  onValidationChange,
  onSubmit,
  validateRef,
  'data-test-id': dataTestId,
}: EditAmbitionFormProps) {
  const t = useTranslations('EditGoal')
  const tCreate = useTranslations('CreateGoal')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const { goalFilters } = useGoalsStore()

  // Step 1 state - Initialize from goal
  const [goalType, setGoalType] = useState<GoalType>(
    (goal.goalType as GoalType) || GOAL_TYPES.BUSINESS,
  )
  const [owner, setOwner] = useState(goal.uid || '')
  const [privacy, setPrivacy] = useState<PrivacyValue>('public')
  const [sharedMembers, setSharedMembers] = useState<NewAmbitionShareMember[]>([])

  // Validation state
  const [ownerError, setOwnerError] = useState(false)
  const [ladderedFromError, setLadderedFromError] = useState(false)
  const [ambitionNameError, setAmbitionNameError] = useState(false)
  const [actionsError, setActionsError] = useState(false)
  const [achievementsError, setAchievementsError] = useState(false)

  // Step 2 state - Initialize from goal
  const [ladderedFrom, setLadderedFrom] = useState(goal.parent?.id || '')
  const [ambitionName, setAmbitionName] = useState(goal.title || '')
  const [description, setDescription] = useState(goal.description || '')
  const [actions, setActions] = useState<InputItem[]>(() => {
    if (goal.goalActions && goal.goalActions.length > 0) {
      return goal.goalActions.map((action) => ({
        id: action.id || crypto.randomUUID(),
        value: action.title,
      }))
    }
    return [
      { id: crypto.randomUUID(), value: '' },
      { id: crypto.randomUUID(), value: '' },
      { id: crypto.randomUUID(), value: '' },
    ]
  })
  const [achievements, setAchievements] = useState<InputItem[]>(() => {
    if (goal.goalAchievements && goal.goalAchievements.length > 0) {
      return goal.goalAchievements.map((achievement) => ({
        id: achievement.id || crypto.randomUUID(),
        value: achievement.title,
      }))
    }
    return [
      { id: crypto.randomUUID(), value: '' },
      { id: crypto.randomUUID(), value: '' },
      { id: crypto.randomUUID(), value: '' },
    ]
  })

  // Reset form when goal changes
  useEffect(() => {
    setGoalType((goal.goalType as GoalType) || GOAL_TYPES.BUSINESS)
    setOwner(goal.uid || '')
    setLadderedFrom(goal.parent?.id || '')
    setAmbitionName(goal.title || '')
    setDescription(goal.description || '')

    if (goal.goalActions && goal.goalActions.length > 0) {
      setActions(
        goal.goalActions.map((action) => ({
          id: action.id || crypto.randomUUID(),
          value: action.title,
        })),
      )
    } else {
      setActions([
        { id: crypto.randomUUID(), value: '' },
        { id: crypto.randomUUID(), value: '' },
        { id: crypto.randomUUID(), value: '' },
      ])
    }

    if (goal.goalAchievements && goal.goalAchievements.length > 0) {
      setAchievements(
        goal.goalAchievements.map((achievement) => ({
          id: achievement.id || crypto.randomUUID(),
          value: achievement.title,
        })),
      )
    } else {
      setAchievements([
        { id: crypto.randomUUID(), value: '' },
        { id: crypto.randomUUID(), value: '' },
        { id: crypto.randomUUID(), value: '' },
      ])
    }
  }, [goal])

  // Validate Step 1 and notify parent
  useEffect(() => {
    if (step === 1) {
      const isValid = owner !== ''
      onValidationChange?.(isValid)
    } else if (step === 2) {
      const hasLadderedFrom = goalType === GOAL_TYPES.BUSINESS ? ladderedFrom !== '' : true
      const hasAmbitionName = ambitionName.trim() !== ''
      const hasActions = actions.some((action) => action.value.trim() !== '')
      const hasAchievements = achievements.some((achievement) => achievement.value.trim() !== '')
      const isValid = hasLadderedFrom && hasAmbitionName && hasActions && hasAchievements
      onValidationChange?.(isValid)
    }
  }, [owner, goalType, ladderedFrom, ambitionName, actions, achievements, step, onValidationChange])

  // Clear ladderedFrom when changing to non-business type
  useEffect(() => {
    if (goalType !== GOAL_TYPES.BUSINESS) {
      setLadderedFrom('')
    }
  }, [goalType])

  // Update parent with current form data whenever it changes
  useEffect(() => {
    if (step === 2 && onSubmit) {
      const formData: EditAmbitionFormData = {
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
      onSubmit(formData)
    }
  }, [
    step,
    goalType,
    owner,
    privacy,
    sharedMembers,
    ladderedFrom,
    ambitionName,
    description,
    actions,
    achievements,
    onSubmit,
  ])

  // Expose validation function via ref
  useEffect(() => {
    if (!validateRef) return

    validateRef.current = () => {
      if (step === 1) {
        const isValid = owner !== ''
        if (!isValid) {
          setOwnerError(true)
        }
        return isValid
      } else if (step === 2) {
        const hasLadderedFrom = goalType === GOAL_TYPES.BUSINESS ? ladderedFrom !== '' : true
        const hasAmbitionName = ambitionName.trim() !== ''
        const hasActions = actions.some((action) => action.value.trim() !== '')
        const hasAchievements = achievements.some((achievement) => achievement.value.trim() !== '')

        setLadderedFromError(!hasLadderedFrom)
        setAmbitionNameError(!hasAmbitionName)
        setActionsError(!hasActions)
        setAchievementsError(!hasAchievements)

        return hasLadderedFrom && hasAmbitionName && hasActions && hasAchievements
      }
      return false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, owner, goalType, ladderedFrom, ambitionName, actions, achievements])

  // Handle owner change and clear error
  const handleOwnerChange = (value: string) => {
    setOwner(value)
    if (value) {
      setOwnerError(false)
    }
  }

  // Handle laddered from change and clear error
  const handleLadderedFromChange = (value: string) => {
    setLadderedFrom(value)
    if (value) {
      setLadderedFromError(false)
    }
  }

  // Handlers for dynamic actions
  const addAction = () => {
    setActions((prev) => [...prev, { id: crypto.randomUUID(), value: '' }])
  }

  const removeAction = (id: string) => {
    setActions((prev) => prev.filter((item) => item.id !== id))
  }

  const updateAction = (id: string, value: string) => {
    setActions((prev) => prev.map((item) => (item.id === id ? { ...item, value } : item)))
    if (value.trim()) {
      setActionsError(false)
    }
  }

  // Handlers for dynamic achievements
  const addAchievement = () => {
    setAchievements((prev) => [...prev, { id: crypto.randomUUID(), value: '' }])
  }

  const removeAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id))
  }

  const updateAchievement = (id: string, value: string) => {
    setAchievements((prev) => prev.map((item) => (item.id === id ? { ...item, value } : item)))
    if (value.trim()) {
      setAchievementsError(false)
    }
  }

  const typeItems = useMemo(
    () => [
      {
        id: GOAL_TYPES.BUSINESS,
        label: tCreate('type.business'),
        icon: <TypeIcon type={GOAL_TYPES.BUSINESS} variant="metadata" />,
        ariaLabel: tCreate('type.business'),
      },
      {
        id: GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT,
        label: tCreate('type.growth'),
        icon: <TypeIcon type={GOAL_TYPES.PERSONAL_GROWTH_AND_DEVELOPMENT} variant="metadata" />,
        ariaLabel: tCreate('type.growth'),
      },
      {
        id: GOAL_TYPES.MANAGER_EFFECTIVENESS,
        label: tCreate('type.manager'),
        icon: <TypeIcon type={GOAL_TYPES.MANAGER_EFFECTIVENESS} variant="metadata" />,
        ariaLabel: tCreate('type.manager'),
      },
    ],
    [tCreate],
  )

  const privacyItems = useMemo(
    () => [
      {
        id: 'public',
        label: tCreate('privacy.public'),
        ariaLabel: tCreate('privacy.public'),
      },
      {
        id: 'private',
        label: tCreate('privacy.private'),
        ariaLabel: tCreate('privacy.private'),
      },
    ],
    [tCreate],
  )

  // Transform owner options to BigSelectOption format
  const ownerSelectOptions = useMemo<BigSelectOption[]>(() => {
    const avatarOptions = goalFilters?.avatarSelector?.options ?? []
    return avatarOptions.map((option) => ({
      value: option.uid,
      label: option.name,
      description: option.role,
      avatar: option.url,
    }))
  }, [goalFilters])

  const goals = useGoalsStore((state) => state.goals)

  const ladderedFromOptions = useMemo<BigSelectOption[]>(
    () =>
      goals.map((goal) => ({
        value: goal.uid,
        label: goal.title,
      })),
    [goals],
  )

  // Step 1: Ambition Setup
  if (step === 1) {
    return (
      <div className={cn('flex flex-col gap-2_5', className)} data-test-id={dataTestId}>
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col gap-0_25">
            <Typography variant="h5">{t('setupTitle')}</Typography>
            <Typography variant="body" color="textSecondary">
              {t('setupDescription')}
            </Typography>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <FormControl label={tCreate('type.label')} mandatory>
            {isMobile ? (
              <RadioGroup
                items={typeItems}
                value={goalType}
                onChange={(value) => setGoalType(value as GoalType)}
                size="large"
                ariaLabel={tCreate('type.label')}
              />
            ) : (
              <div className="self-start">
                <Switcher
                  items={typeItems}
                  value={goalType}
                  onChange={(value) => setGoalType(value as GoalType)}
                  size="large"
                  ariaLabel={tCreate('type.label')}
                />
              </div>
            )}
          </FormControl>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <BigSelectField
            options={ownerSelectOptions}
            label={tCreate('owner.label')}
            value={owner}
            onValueChange={handleOwnerChange}
            placeholder={tCreate('owner.placeholder')}
            required
            hideDescriptionInDropdown
            error={ownerError ? tCreate('owner.error') : undefined}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <FormControl label={tCreate('privacy.label')} mandatory>
            {isMobile ? (
              <RadioGroup
                items={privacyItems}
                value={privacy}
                onChange={(value) => setPrivacy(value as PrivacyValue)}
                size="small"
                ariaLabel={tCreate('privacy.label')}
              />
            ) : (
              <div className="self-start">
                <Switcher
                  items={privacyItems}
                  value={privacy}
                  onChange={(value) => setPrivacy(value as PrivacyValue)}
                  size="small"
                  ariaLabel={tCreate('privacy.label')}
                />
              </div>
            )}
          </FormControl>
        </AnimatedSection>
      </div>
    )
  }

  // Step 2: Ambition Content & Framework (AAA)
  return (
    <div className={cn('flex flex-col gap-2_5', className)} data-test-id={dataTestId}>
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col gap-0_25">
          <Typography variant="h5">{t('contentTitle')}</Typography>
          <Typography variant="body" color="textSecondary">
            {t('contentDescription')}
          </Typography>
        </div>
      </AnimatedSection>

      {goalType === GOAL_TYPES.BUSINESS && (
        <AnimatedSection delay={0.2}>
          <BigSelectField
            options={ladderedFromOptions}
            label={tCreate('ladderedFrom.label')}
            value={ladderedFrom}
            onValueChange={handleLadderedFromChange}
            placeholder={tCreate('ladderedFrom.placeholder')}
            hidePlaceholderIcon
            required
            error={
              ladderedFromError
                ? tCreate('ladderedFrom.error') || 'This field is required'
                : undefined
            }
          />
        </AnimatedSection>
      )}

      <AnimatedSection delay={goalType === GOAL_TYPES.BUSINESS ? 0.3 : 0.2}>
        <FormControl label={tCreate('ambitionName.label')} mandatory fullWidth>
          <TextField
            value={ambitionName}
            onChange={(e) => setAmbitionName(e.target.value)}
            placeholder={tCreate('ambitionName.placeholder')}
            fullWidth
            aria-invalid={ambitionNameError}
          />
          {ambitionNameError && (
            <div className="flex items-center gap-0_5 mt-0_5">
              <XCircle width={20} height={20} className="text-feedback-error-500 shrink-0" />
              <span
                className="text-body-small leading-body-small font-normal"
                style={{ color: 'var(--feedback-error-500)' }}
              >
                {tCreate('ambitionName.error') || 'This field is required'}
              </span>
            </div>
          )}
        </FormControl>
      </AnimatedSection>

      <AnimatedSection delay={goalType === GOAL_TYPES.BUSINESS ? 0.4 : 0.3}>
        <div className="flex flex-col gap-1">
          <div className={cn('flex gap-1', isMobile ? 'flex-col' : 'flex-row items-start')}>
            <Card className="flex flex-col gap-0_5 md:gap-1_5 bg-neutral-100 border-none p-1 md:p-1_5 md:w-[270px] shrink-0">
              <Typography variant="h6">
                {tCreate('planActions.label')}
                <span className="text-feedback-error-500 ml-0_25">*</span>
              </Typography>
              <Typography variant="body" color="textSecondary">
                {tCreate('planActions.description')}
              </Typography>
              <Typography variant="body" color="textSecondary">
                {tCreate('planActions.subDescription')}
              </Typography>
            </Card>

            <div className="flex flex-col gap-0_75 flex-1">
              <AnimatePresence initial={false}>
                {actions.map((action, index) => (
                  <m.div
                    key={action.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex flex-col gap-0_5 origin-top"
                  >
                    <div className="flex items-center gap-0_75">
                      <TextField
                        value={action.value}
                        onChange={(e) => updateAction(action.id, e.target.value)}
                        placeholder={tCreate('planActions.placeholder')}
                        className="flex-1"
                        aria-invalid={index === 0 && actionsError}
                      />
                      {index > 0 && (
                        <Button
                          variant="link"
                          size="small"
                          onClick={() => removeAction(action.id)}
                          aria-label={tCreate('planActions.removeAction')}
                          className="shrink-0"
                        >
                          <Trash2 width={18} className="text-neutral-600" />
                        </Button>
                      )}
                    </div>
                    {index === 0 && actionsError && (
                      <div className="flex items-center gap-0_5">
                        <XCircle
                          width={20}
                          height={20}
                          className="text-feedback-error-500 shrink-0"
                        />
                        <span
                          className="text-body-small leading-body-small font-normal"
                          style={{ color: 'var(--feedback-error-500)' }}
                        >
                          {tCreate('planActions.error') || 'At least one action is required'}
                        </span>
                      </div>
                    )}
                  </m.div>
                ))}
              </AnimatePresence>

              <Button
                variant="link"
                size="small"
                onClick={addAction}
                leftIcon={<Plus width={18} />}
                className="self-start text-accent-primary"
              >
                {tCreate('planActions.addAction')}
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={goalType === GOAL_TYPES.BUSINESS ? 0.5 : 0.4}>
        <div className="flex flex-col gap-1">
          <div className={cn('flex gap-1', isMobile ? 'flex-col' : 'flex-row items-start')}>
            <Card className="flex flex-col gap-0_5 md:gap-1_5 bg-neutral-100 border-none p-1 md:p-1_5 md:w-[270px] shrink-0">
              <Typography variant="h6">
                {tCreate('achievements.label')}
                <span className="text-feedback-error-500 ml-0_25">*</span>
              </Typography>
              <Typography variant="body" color="textSecondary">
                {tCreate('achievements.description')}
              </Typography>
              <Typography variant="body" color="textSecondary">
                {tCreate('achievements.subDescription')}
              </Typography>
            </Card>

            <div className="flex flex-col gap-0_75 flex-1">
              <AnimatePresence initial={false}>
                {achievements.map((achievement, index) => (
                  <m.div
                    key={achievement.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex flex-col gap-0_5 origin-top"
                  >
                    <div className="flex items-center gap-0_75">
                      <TextField
                        value={achievement.value}
                        onChange={(e) => updateAchievement(achievement.id, e.target.value)}
                        placeholder={tCreate('achievements.placeholder')}
                        className="flex-1"
                        aria-invalid={index === 0 && achievementsError}
                      />
                      {index > 0 && (
                        <Button
                          variant="link"
                          size="small"
                          onClick={() => removeAchievement(achievement.id)}
                          aria-label={tCreate('achievements.removeAchievement')}
                          className="shrink-0"
                        >
                          <Trash2 width={18} className="text-neutral-600" />
                        </Button>
                      )}
                    </div>
                    {index === 0 && achievementsError && (
                      <div className="flex items-center gap-0_5">
                        <XCircle
                          width={20}
                          height={20}
                          className="text-feedback-error-500 shrink-0"
                        />
                        <span
                          className="text-body-small leading-body-small font-normal"
                          style={{ color: 'var(--feedback-error-500)' }}
                        >
                          {tCreate('achievements.error') || 'At least one achievement is required'}
                        </span>
                      </div>
                    )}
                  </m.div>
                ))}
              </AnimatePresence>

              <Button
                variant="link"
                size="small"
                onClick={addAchievement}
                leftIcon={<Plus width={18} />}
                className="self-start text-accent-primary"
              >
                {tCreate('achievements.addAchievement')}
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

EditAmbitionForm.displayName = 'EditAmbitionForm'
