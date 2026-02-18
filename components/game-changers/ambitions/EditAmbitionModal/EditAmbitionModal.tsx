'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useUIStore } from '@/stores/ui.store'
import { useGoalsStore } from '@/stores/goals.store'
import { type UpdateGoalDTO } from '@/domain/goal'
import { ResponsiveModal } from '@/components/ui/molecules/ResponsiveModal'
import { Button } from '@/components/ui/atoms/Button'
import { EditAmbitionForm } from '../EditAmbitionForm'
import type { EditAmbitionFormData } from '../EditAmbitionForm'
import type { EditAmbitionModalProps } from './EditAmbitionModal.types'

export function EditAmbitionModal({
  open,
  onClose,
  goal,
  'data-test-id': dataTestId,
}: EditAmbitionModalProps) {
  const t = useTranslations('EditGoal')
  const { enqueueToast } = useUIStore()
  const { updateGoal } = useGoalsStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validateRef = useRef<(() => boolean) | null>(null)
  const formDataRef = useRef<EditAmbitionFormData | null>(null)

  const handleValidationChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid)
  }, [])

  const handleFormDataChange = useCallback((formData: EditAmbitionFormData) => {
    formDataRef.current = formData
  }, [])

  const handleClose = useCallback(() => {
    // Reset states
    setCurrentStep(1)
    setIsFormValid(false)
    setIsSubmitting(false)
    formDataRef.current = null

    onClose?.()
  }, [onClose])

  const handleNext = useCallback(async () => {
    // Trigger validation
    if (validateRef.current) {
      const isValid = validateRef.current()
      if (!isValid) {
        return
      }
    }

    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      // Save changes
      if (isSubmitting || !formDataRef.current || !goal) return

      setIsSubmitting(true)

      try {
        const formData = formDataRef.current

        // Transform form data to UpdateGoalDTO
        const updateData: UpdateGoalDTO = {
          title: formData.ambitionName,
          description: formData.description,
          goalType: formData.goalType,
          parentId: formData.ladderedFrom || undefined,
          goalAchievements: formData.achievements.map((achievement) => ({
            title: achievement,
            status: 'pending',
          })),
          goalActions: formData.actions.map((action) => ({
            title: action,
            status: 'pending',
          })),
        }

        const success = await updateGoal(goal.id, updateData)

        if (success) {
          // Show success toast
          enqueueToast({
            id: `goal-updated-${goal.id}`,
            title: t('toast.successMessage'),
            variant: 'success',
            duration: 3000,
          })

          // Close modal
          handleClose()
        } else {
          enqueueToast({
            id: `goal-update-error-${goal.id}`,
            title: t('toast.errorMessage'),
            variant: 'error',
            duration: 3000,
          })
        }
      } catch (error) {
        // Error handling
        enqueueToast({
          id: `goal-update-error-${Date.now()}`,
          title: t('toast.errorMessage'),
          variant: 'error',
          duration: 3000,
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [currentStep, isSubmitting, goal, updateGoal, enqueueToast, t, handleClose])

  const handleBack = useCallback(() => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }, [currentStep])

  // Reset step when modal opens with new goal
  useEffect(() => {
    if (open && goal) {
      setCurrentStep(1)
      setIsFormValid(false)
      formDataRef.current = null
    }
  }, [open, goal?.id])

  const actions = useMemo(
    () => (
      <div className="flex w-full items-center justify-between gap-1">
        <Button variant="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <div className="flex items-center gap-0_75">
          {currentStep === 2 && (
            <Button
              variant="secondary"
              size="small"
              iconOnly
              onClick={handleBack}
              aria-label={t('actions.back')}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            variant="primary"
            rightIcon={currentStep === 1 ? <ArrowRight width={18} /> : undefined}
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {currentStep === 1 ? t('actions.next') : t('actions.save')}
          </Button>
        </div>
      </div>
    ),
    [t, currentStep, isSubmitting, handleBack, handleNext, handleClose],
  )

  const customFooter = useMemo(
    () => (
      <div className="-mx-1_5 -mb-1_5 mt-auto flex w-[calc(100%+3rem)] items-center justify-between gap-1 rounded-b-large border-t border-neutral-200 px-1_5 py-1 bg-neutral-50">
        {actions}
      </div>
    ),
    [actions],
  )

  const content = useMemo(() => {
    if (!goal) return null

    return (
      <EditAmbitionForm
        goal={goal}
        step={currentStep}
        validateRef={validateRef}
        onValidationChange={handleValidationChange}
        onSubmit={handleFormDataChange}
      />
    )
  }, [goal, currentStep, handleValidationChange, handleFormDataChange])

  if (!goal) {
    return null
  }

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title={t('title')}
      desktopSize="full"
      mobileSize="md"
      overlayClose
      actions={actions}
      customFooter={customFooter}
      mobileBodyClassName="flex flex-col gap-1_5"
      className="!h-screen"
      aria-label={t('title')}
      data-test-id={dataTestId}
    >
      {content}
    </ResponsiveModal>
  )
}

EditAmbitionModal.displayName = 'EditAmbitionModal'
