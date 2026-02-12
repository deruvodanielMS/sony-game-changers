'use client'

import { useMemo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Info, Plus, Trash2, Users, XCircle } from 'lucide-react'
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
import { filterBarMocks } from '@/app/[locale]/game-changers/ambitions/mocks'
import {
  newAmbitionShareWithOptions,
  type NewAmbitionShareMember,
} from '@/repositories/mocks/data/goals'
import { cn } from '@/utils/cn'
import type { NewAmbitionFormProps } from './NewAmbitionForm.types'

type PrivacyValue = 'public' | 'private'

type ShareWithPillProps = {
  member: NewAmbitionShareMember
  onRemove: (value: string) => void
}

function ShareWithPill({ member, onRemove }: ShareWithPillProps) {
  return (
    <button
      type="button"
      onClick={() => onRemove(member.value)}
      aria-label={member.name}
      className={cn(
        'inline-flex items-center gap-0_5 rounded-full',
        'border border-neutral-800 px-0_75 py-0_25',
        'text-body-small text-neutral-1000 transition-colors',
        'hover:bg-neutral-100',
      )}
    >
      <span>{member.name}</span>
      <span aria-hidden className="text-neutral-600">
        ×
      </span>
    </button>
  )
}

export function NewAmbitionForm({
  className,
  step = 1,
  onValidationChange,
  onSubmit,
  onFormDataChange,
  validateRef,
  'data-test-id': dataTestId,
}: NewAmbitionFormProps) {
  const t = useTranslations('CreateGoal')
  const isMobile = !useMediaQuery(BREAKPOINTS.md)

  // Step 1 state - Empty state by default
  const [goalType, setGoalType] = useState<GoalType>(GOAL_TYPES.BUSINESS)
  const [owner, setOwner] = useState('')
  const [privacy, setPrivacy] = useState<PrivacyValue>('public')
  const [sharedMembers, setSharedMembers] = useState<NewAmbitionShareMember[]>([])
  const [shareWithSearch, setShareWithSearch] = useState('')
  const [showShareWithDropdown, setShowShareWithDropdown] = useState(false)

  // Validation state
  const [ownerError, setOwnerError] = useState(false)
  const [ladderedFromError, setLadderedFromError] = useState(false)
  const [ambitionNameError, setAmbitionNameError] = useState(false)
  const [actionsError, setActionsError] = useState(false)
  const [achievementsError, setAchievementsError] = useState(false)

  // Step 2 state - Empty state by default
  const [ladderedFrom, setLadderedFrom] = useState('')
  const [ambitionName, setAmbitionName] = useState('')
  const [actions, setActions] = useState<string[]>(['', '', ''])
  const [achievements, setAchievements] = useState<string[]>(['', '', ''])

  // Validate Step 1 and notify parent
  useEffect(() => {
    if (step === 1) {
      const isValid = owner !== ''
      onValidationChange?.(isValid)
    } else if (step === 2) {
      const hasLadderedFrom = goalType === GOAL_TYPES.BUSINESS ? ladderedFrom !== '' : true
      const hasAmbitionName = ambitionName.trim() !== ''
      const hasActions = actions.some((action) => action.trim() !== '')
      const hasAchievements = achievements.some((achievement) => achievement.trim() !== '')
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

  // Clear share with search when privacy changes to public
  useEffect(() => {
    if (privacy === 'public') {
      setShareWithSearch('')
      setShowShareWithDropdown(false)
    }
  }, [privacy])

  // Update parent with current form data whenever it changes
  useEffect(() => {
    if (step === 2 && onSubmit) {
      const formData = {
        goalType,
        owner,
        privacy,
        sharedMembers,
        ladderedFrom: goalType === GOAL_TYPES.BUSINESS ? ladderedFrom : undefined,
        ambitionName,
        actions: actions.filter((action) => action.trim() !== ''),
        achievements: achievements.filter((achievement) => achievement.trim() !== ''),
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
        const hasActions = actions.some((action) => action.trim() !== '')
        const hasAchievements = achievements.some((achievement) => achievement.trim() !== '')

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
    setActions((prev) => [...prev, ''])
  }

  const removeAction = (index: number) => {
    setActions((prev) => prev.filter((_, i) => i !== index))
  }

  const updateAction = (index: number, value: string) => {
    setActions((prev) => prev.map((action, i) => (i === index ? value : action)))
    if (value.trim()) {
      setActionsError(false)
    }
  }

  // Handlers for dynamic achievements
  const addAchievement = () => {
    setAchievements((prev) => [...prev, ''])
  }

  const removeAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index))
  }

  const updateAchievement = (index: number, value: string) => {
    setAchievements((prev) => prev.map((achievement, i) => (i === index ? value : achievement)))
    if (value.trim()) {
      setAchievementsError(false)
    }
  }

  // Handle form submission
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = () => {
    const formData = {
      goalType,
      owner,
      privacy,
      sharedMembers,
      ladderedFrom: goalType === GOAL_TYPES.BUSINESS ? ladderedFrom : undefined,
      ambitionName,
      actions: actions.filter((action) => action.trim() !== ''),
      achievements: achievements.filter((achievement) => achievement.trim() !== ''),
    }
    onSubmit?.(formData)
  }

  // Handle share with search
  const handleShareWithChange = (value: string) => {
    setShareWithSearch(value)
    setShowShareWithDropdown(value.length > 0)
  }

  const handleAddShareMember = (member: NewAmbitionShareMember) => {
    if (!sharedMembers.find((m) => m.value === member.value)) {
      setSharedMembers((prev) => [...prev, member])
    }
    setShareWithSearch('')
    setShowShareWithDropdown(false)
  }

  // Filter available share options
  const availableShareOptions = useMemo(() => {
    const selectedValues = sharedMembers.map((m) => m.value)
    return newAmbitionShareWithOptions
      .filter((option) => !selectedValues.includes(option.value))
      .filter((option) => option.name.toLowerCase().includes(shareWithSearch.toLowerCase()))
  }, [sharedMembers, shareWithSearch])

  const typeItems = useMemo(
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

  const privacyItems = useMemo(
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

  // Transform owner options to BigSelectOption format
  const ownerSelectOptions = useMemo<BigSelectOption[]>(() => {
    return filterBarMocks.avatarSelector.options.map((option) => ({
      value: option.uid,
      label: option.name,
      description: option.role,
      avatar: option.url,
    }))
  }, [])

  // Laddered from options (mock data for now)
  const ladderedFromOptions = useMemo<BigSelectOption[]>(
    () => [
      {
        value: 'division-ambition-1',
        label: 'Accelerate platform innovation',
        description: 'AAA Division Ambition',
      },
      {
        value: 'division-ambition-2',
        label: 'Improve customer satisfaction',
        description: 'AAA Division Ambition',
      },
      {
        value: 'team-ambition-1',
        label: 'Increase team productivity',
        description: 'AAA Team Ambition',
      },
    ],
    [],
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
          <FormControl label={t('type.label')} mandatory>
            {isMobile ? (
              <RadioGroup
                items={typeItems}
                value={goalType}
                onChange={(value) => setGoalType(value as GoalType)}
                size="large"
                ariaLabel={t('type.label')}
              />
            ) : (
              <div className="self-start">
                <Switcher
                  items={typeItems}
                  value={goalType}
                  onChange={(value) => setGoalType(value as GoalType)}
                  size="large"
                  ariaLabel={t('type.label')}
                />
              </div>
            )}
          </FormControl>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <BigSelectField
            options={ownerSelectOptions}
            label={t('owner.label')}
            value={owner}
            onValueChange={handleOwnerChange}
            placeholder={t('owner.placeholder')}
            required
            hideDescriptionInDropdown
            error={ownerError ? t('owner.error') : undefined}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <FormControl label={t('privacy.label')} mandatory>
            {isMobile ? (
              <RadioGroup
                items={privacyItems}
                value={privacy}
                onChange={(value) => setPrivacy(value as PrivacyValue)}
                size="small"
                ariaLabel={t('privacy.label')}
              />
            ) : (
              <div className="self-start">
                <Switcher
                  items={privacyItems}
                  value={privacy}
                  onChange={(value) => setPrivacy(value as PrivacyValue)}
                  size="small"
                  ariaLabel={t('privacy.label')}
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
            label={t('ladderedFrom.label')}
            value={ladderedFrom}
            onValueChange={handleLadderedFromChange}
            placeholder={t('ladderedFrom.placeholder')}
            hidePlaceholderIcon
            required
            error={
              ladderedFromError ? t('ladderedFrom.error') || 'This field is required' : undefined
            }
          />
        </AnimatedSection>
      )}

      <AnimatedSection delay={goalType === GOAL_TYPES.BUSINESS ? 0.3 : 0.2}>
        <FormControl label={t('ambitionName.label')} mandatory fullWidth>
          <TextField
            value={ambitionName}
            onChange={(e) => setAmbitionName(e.target.value)}
            placeholder={t('ambitionName.placeholder')}
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
                {t('ambitionName.error') || 'This field is required'}
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
                {t('planActions.label')}
                <span className="text-feedback-error-500 ml-0_25">*</span>
              </Typography>
              <Typography variant="body" color="textSecondary">
                {t('planActions.description')}
              </Typography>
              <Typography variant="body" color="textSecondary">
                {t('planActions.subDescription')}
              </Typography>
            </Card>

            <div className="flex flex-col gap-0_75 flex-1">
              {actions.map((action, index) => (
                <div key={index} className="flex flex-col gap-0_5">
                  <div className="flex items-center gap-0_75">
                    <TextField
                      value={action}
                      onChange={(e) => updateAction(index, e.target.value)}
                      placeholder={t('planActions.placeholder')}
                      className="flex-1"
                      aria-invalid={index === 0 && actionsError}
                    />
                    {index > 0 && (
                      <Button
                        variant="link"
                        size="small"
                        onClick={() => removeAction(index)}
                        aria-label="Remove action"
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
                        {t('planActions.error') || 'At least one action is required'}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="link"
                size="small"
                onClick={addAction}
                leftIcon={<Plus width={18} />}
                className="self-start text-accent-primary"
              >
                {t('planActions.addAction')}
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
                {t('achievements.label')}
                <span className="text-feedback-error-500 ml-0_25">*</span>
              </Typography>
              <Typography variant="body" color="textSecondary">
                {t('achievements.description')}
              </Typography>
              <Typography variant="body" color="textSecondary">
                {t('achievements.subDescription')}
              </Typography>
            </Card>

            <div className="flex flex-col gap-0_75 flex-1">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex flex-col gap-0_5">
                  <div className="flex items-center gap-0_75">
                    <TextField
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder={t('achievements.placeholder')}
                      className="flex-1"
                      aria-invalid={index === 0 && achievementsError}
                    />
                    {index > 0 && (
                      <Button
                        variant="link"
                        size="small"
                        onClick={() => removeAchievement(index)}
                        aria-label="Remove achievement"
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
                        {t('achievements.error') || 'At least one achievement is required'}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="link"
                size="small"
                onClick={addAchievement}
                leftIcon={<Plus width={18} />}
                className="self-start text-accent-primary"
              >
                {t('achievements.addAchievement')}
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

NewAmbitionForm.displayName = 'NewAmbitionForm'
