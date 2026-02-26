'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { XCircle } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { AnimatedSection } from '@/components/ui/foundations/AnimatedSection'
import { FormControl } from '@/components/ui/molecules/FormControl'
import { Switcher } from '@/components/ui/molecules/Switcher'
import { RadioGroup } from '@/components/ui/atoms/RadioGroup'
import { BigSelectField } from '@/components/ui/molecules/BigSelectField'
import { Typography } from '@/components/ui/foundations/Typography'
import { TextField } from '@/components/ui/atoms/TextField'
import { GOAL_TYPES, type GoalType } from '@/domain/goal'
import { useGoalsStore } from '@/stores/goals.store'
import { useAmbitionForm, useAmbitionFormOptions } from '@/hooks/useAmbitionForm'
import { ActionsField, AchievementsField } from '@/components/game-changers/ambitions/shared'
import { cn } from '@/utils/cn'
import { newAmbitionShareWithOptions } from '@/repositories/mocks/data/goals'
import type { NewAmbitionFormProps } from './NewAmbitionForm.types'

export function NewAmbitionForm({
  className,
  step = 1,
  parentAmbitionId,
  onValidationChange,
  onSubmit,
  validateRef,
  'data-test-id': dataTestId,
}: NewAmbitionFormProps) {
  const t = useTranslations('CreateGoal')
  const { data: session } = useSession()
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const { goalFilters } = useGoalsStore()

  // Use shared hooks
  const { state, handlers, getFormData, isStepValid } = useAmbitionForm({
    parentAmbitionId,
  })
  const { typeItems, privacyItems, ownerSelectOptions, ladderedFromOptions } =
    useAmbitionFormOptions()

  // Pre-select owner based on logged in user (by name match)
  useEffect(() => {
    if (!state.owner && session?.user?.name && goalFilters?.avatarSelector?.options) {
      const currentUser = goalFilters.avatarSelector.options.find(
        (option) => option.name === session.user?.name,
      )
      if (currentUser) {
        handlers.setOwner(currentUser.uid)
      }
    }
  }, [session, goalFilters, state.owner, handlers])

  // Notify parent of validation state changes
  useEffect(() => {
    onValidationChange?.(isStepValid(step))
  }, [step, isStepValid, onValidationChange])

  // Update parent with form data on step 2
  useEffect(() => {
    if (step === 2 && onSubmit) {
      onSubmit(getFormData())
    }
  }, [step, getFormData, onSubmit])

  // Expose validation function via ref
  useEffect(() => {
    if (!validateRef) return
    validateRef.current = () => handlers.validate(step)
  }, [validateRef, handlers, step])

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
                value={state.goalType}
                onChange={(value) => handlers.setGoalType(value as GoalType)}
                size="large"
                ariaLabel={t('type.label')}
              />
            ) : (
              <div className="self-start">
                <Switcher
                  items={typeItems}
                  value={state.goalType}
                  onChange={(value) => handlers.setGoalType(value as GoalType)}
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
            value={state.owner}
            onValueChange={handlers.setOwner}
            placeholder={t('owner.placeholder')}
            required
            hideDescriptionInDropdown
            error={state.errors.owner ? t('owner.error') : undefined}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <FormControl label={t('privacy.label')} mandatory>
            {isMobile ? (
              <RadioGroup
                items={privacyItems}
                value={state.privacy}
                onChange={(value) => handlers.setPrivacy(value as 'public' | 'private')}
                size="small"
                ariaLabel={t('privacy.label')}
              />
            ) : (
              <div className="self-start">
                <Switcher
                  items={privacyItems}
                  value={state.privacy}
                  onChange={(value) => handlers.setPrivacy(value as 'public' | 'private')}
                  size="small"
                  ariaLabel={t('privacy.label')}
                />
              </div>
            )}
          </FormControl>
        </AnimatedSection>

        {state.privacy === 'private' && (
          <AnimatedSection delay={0.5}>
            <div className="flex flex-col gap-1">
              <Typography variant="bodySmall" color="textSecondary">
                {t('privacy.helperPrivate')}
              </Typography>
              <FormControl label={t('shareWith.label')}>
                <BigSelectField
                  options={newAmbitionShareWithOptions.map((m) => ({
                    value: m.value,
                    label: m.name,
                  }))}
                  placeholder={t('shareWith.placeholder')}
                  onValueChange={(value) => {
                    const member = newAmbitionShareWithOptions.find((m) => m.value === value)
                    if (member && !state.sharedMembers.some((m) => m.value === value)) {
                      handlers.setSharedMembers([...state.sharedMembers, member])
                    }
                  }}
                  hidePlaceholderIcon
                />
              </FormControl>
              {state.sharedMembers.length > 0 && (
                <div className="flex flex-wrap gap-0_5">
                  {state.sharedMembers.map((member) => (
                    <span
                      key={member.value}
                      className="inline-flex items-center gap-0_5 rounded-full bg-(--color-neutral-100) px-2 py-0_5 text-body-small text-neutral-900"
                    >
                      {member.name}
                      <button
                        type="button"
                        onClick={() =>
                          handlers.setSharedMembers(
                            state.sharedMembers.filter((m) => m.value !== member.value),
                          )
                        }
                        className="text-(--color-neutral-500) hover:text-neutral-900 transition-colors"
                        aria-label={`Remove ${member.name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        )}
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

      {state.goalType === GOAL_TYPES.BUSINESS && (
        <AnimatedSection delay={0.2}>
          <BigSelectField
            options={ladderedFromOptions}
            label={t('ladderedFrom.label')}
            value={state.ladderedFrom}
            onValueChange={handlers.setLadderedFrom}
            placeholder={t('ladderedFrom.placeholder')}
            hidePlaceholderIcon
            required
            error={
              state.errors.ladderedFrom
                ? t('ladderedFrom.error') || 'This field is required'
                : undefined
            }
          />
        </AnimatedSection>
      )}

      <AnimatedSection delay={state.goalType === GOAL_TYPES.BUSINESS ? 0.3 : 0.2}>
        <FormControl label={t('ambitionName.label')} mandatory fullWidth>
          <TextField
            value={state.ambitionName}
            onChange={(e) => handlers.setAmbitionName(e.target.value)}
            placeholder={t('ambitionName.placeholder')}
            fullWidth
            aria-invalid={state.errors.ambitionName}
          />
          {state.errors.ambitionName && (
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

      <AnimatedSection delay={state.goalType === GOAL_TYPES.BUSINESS ? 0.4 : 0.3}>
        <ActionsField
          items={state.actions}
          hasError={state.errors.actions}
          onAdd={handlers.addAction}
          onRemove={handlers.removeAction}
          onUpdate={handlers.updateAction}
        />
      </AnimatedSection>

      <AnimatedSection delay={state.goalType === GOAL_TYPES.BUSINESS ? 0.5 : 0.4}>
        <AchievementsField
          items={state.achievements}
          hasError={state.errors.achievements}
          onAdd={handlers.addAchievement}
          onRemove={handlers.removeAchievement}
          onUpdate={handlers.updateAchievement}
        />
      </AnimatedSection>
    </div>
  )
}

NewAmbitionForm.displayName = 'NewAmbitionForm'
