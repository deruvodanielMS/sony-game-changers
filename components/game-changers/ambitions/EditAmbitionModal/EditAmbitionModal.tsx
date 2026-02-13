'use client'

import { useEffect, useMemo, useEffectEvent, useState, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useUIStore } from '@/stores/ui.store'
import { useGoalsStore } from '@/stores/goals.store'
import { type GoalType, type UpdateGoalDTO } from '@/domain/goal'
import { ModalHeader, ModalBody } from '@/components/ui/molecules/Modal'
import { Drawer } from '@/components/ui/atoms/Drawer'
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
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const { openModal, closeAll, enqueueToast } = useUIStore()
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

    closeAll()
    onClose?.()
  }, [closeAll, onClose])

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

  const { desktopModal, content } = useMemo(() => {
    if (!goal) {
      return { desktopModal: null, content: null }
    }

    const content = (
      <EditAmbitionForm
        goal={goal}
        step={currentStep}
        validateRef={validateRef}
        onValidationChange={handleValidationChange}
        onSubmit={handleFormDataChange}
      />
    )

    const desktopModal = (
      <>
        <ModalHeader showClose onClose={handleClose}>
          {t('title')}
        </ModalHeader>
        <ModalBody className="flex flex-col">{content}</ModalBody>
        <div className="-mx-1_5 -mb-1_5 mt-auto flex w-[calc(100%+3rem)] items-center justify-between gap-1 rounded-b-large border-t border-neutral-200 px-1_5 py-1 bg-neutral-50">
          {actions}
        </div>
      </>
    )

    return { desktopModal, content }
  }, [goal, actions, handleClose, t, currentStep, handleValidationChange, handleFormDataChange])

  const toggleModal = useEffectEvent((show: boolean) => {
    if (show) {
      openModal(desktopModal, {
        onClose: handleClose,
        size: 'full',
        overlayClose: true,
        'aria-label': t('title'),
      })
    } else {
      closeAll()
    }
  })

  useEffect(() => {
    if (open && isMobile != null && !isMobile && goal) {
      toggleModal(true)
    } else if (!open || isMobile) {
      toggleModal(false)
    }
  }, [open, isMobile, currentStep])

  if (!goal) {
    return null
  }

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onClose={handleClose}
        position="bottom"
        size="md"
        overlayClose
        showClose
        hideCloseOnMobile
        title={t('title')}
        aria-label={t('title')}
        actions={actions}
        className="!h-screen"
        data-test-id={dataTestId}
      >
        <div className="flex flex-col gap-1_5">{content}</div>
      </Drawer>
    )
  }

  return null
}

EditAmbitionModal.displayName = 'EditAmbitionModal'
