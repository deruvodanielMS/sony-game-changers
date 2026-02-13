'use client'

import { useEffect, useMemo, useEffectEvent, useState, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/common/breakpoints'
import { useUIStore } from '@/stores/ui.store'
import { useGoalsStore } from '@/stores/goals.store'
import { GOAL_STATUSES } from '@/domain/goal'
import { ModalHeader, ModalBody } from '@/components/ui/molecules/Modal'
import { Drawer } from '@/components/ui/atoms/Drawer'
import { Button } from '@/components/ui/atoms/Button'
import { NewAmbitionForm } from '../NewAmbitionForm'
import type { NewAmbitionFormProps } from '../NewAmbitionForm'
import type { NewAmbitionModalProps } from './NewAmbitionModal.types'

export function NewAmbitionModal({
  open,
  onClose,
  parentAmbitionId,
  'data-test-id': dataTestId,
}: NewAmbitionModalProps) {
  const t = useTranslations('CreateGoal')
  const { data: session } = useSession()
  const isMobile = !useMediaQuery(BREAKPOINTS.md)
  const { openModal, closeAll, enqueueToast } = useUIStore()
  const { createGoal, goalFilters } = useGoalsStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const validateRef = useRef<(() => boolean) | null>(null)
  const formDataRef = useRef<Parameters<NonNullable<NewAmbitionFormProps['onSubmit']>>[0] | null>(
    null,
  )

  const handleValidationChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid)
  }, [])

  const handleFormDataChange = useCallback(
    (formData: Parameters<NonNullable<NewAmbitionFormProps['onSubmit']>>[0]) => {
      formDataRef.current = formData
    },
    [],
  )

  const handleClose = useCallback(() => {
    // Reset states
    setCurrentStep(1)
    setIsFormValid(false)
    setIsSubmitting(false)
    formDataRef.current = null

    closeAll()
    onClose?.()
  }, [closeAll, onClose])

  const handleSaveDraft = useCallback(async () => {
    if (isSubmitting) return

    // Minimal validation: only require ambition name
    const formData = formDataRef.current
    if (!formData?.ambitionName?.trim()) {
      // Show error toast if no ambition name
      enqueueToast({
        id: 'draft-validation-error',
        title: t('toast.draftRequiresName'),
        variant: 'error',
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Find user data for avatar and name
      const avatarOptions = goalFilters?.avatarSelector?.options ?? []
      const selectedUser = formData.owner
        ? avatarOptions.find((option) => option.uid === formData.owner)
        : null

      // For drafts, if no owner is selected, try to use the current session user
      const currentUserFromFilters = avatarOptions.find(
        (option) => option.name === session?.user?.name,
      )
      const assignedUserId =
        formData.owner || currentUserFromFilters?.uid || session?.user?.email || 'draft-user'

      // Transform form data to CreateGoalDTO with DRAFT status
      const goalData = {
        title: formData.ambitionName,
        description: '',
        goalType: formData.goalType,
        status: GOAL_STATUSES.DRAFT,
        parentId: formData.ladderedFrom || undefined,
        assignedTo: assignedUserId,
        periodId: 'current-period',
        progress: 0,
        goalAchievements: formData.achievements?.length
          ? formData.achievements.map((achievement) => ({
              title: achievement,
              status: 'pending',
            }))
          : [],
        goalActions: formData.actions?.length
          ? formData.actions.map((action) => ({
              title: action,
              status: 'pending',
            }))
          : [],
      }

      const userData = selectedUser
        ? {
            name: selectedUser.name,
            avatarUrl: selectedUser.url,
          }
        : currentUserFromFilters
          ? {
              name: currentUserFromFilters.name,
              avatarUrl: currentUserFromFilters.url,
            }
          : {
              name: session?.user?.name || 'Current User',
              avatarUrl: session?.user?.image || null,
            }

      const newGoal = await createGoal(goalData, userData)

      if (newGoal) {
        enqueueToast({
          id: `draft-saved-${newGoal.id}`,
          title: t('toast.draftSaved'),
          variant: 'success',
          duration: 3000,
        })

        handleClose()
      }
    } catch (error) {
      enqueueToast({
        id: 'draft-save-error',
        title: t('toast.draftSaveError'),
        variant: 'error',
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, createGoal, goalFilters, session, enqueueToast, t, handleClose])

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
      // Submit for approval
      if (isSubmitting || !formDataRef.current) return

      setIsSubmitting(true)

      try {
        const formData = formDataRef.current

        // Find user data for avatar and name
        const avatarOptions = goalFilters?.avatarSelector?.options ?? []
        const selectedUser = avatarOptions.find((option) => option.uid === formData.owner)

        // Transform form data to CreateGoalDTO
        const goalData = {
          title: formData.ambitionName,
          description: '', // Can be added later if needed
          goalType: formData.goalType,
          status: GOAL_STATUSES.AWAITING_APPROVAL,
          parentId: formData.ladderedFrom || undefined,
          assignedTo: formData.owner,
          periodId: 'current-period', // This should come from context or be selected
          progress: 0,
          goalAchievements: formData.achievements.map((achievement) => ({
            title: achievement,
            status: 'pending',
          })),
          goalActions: formData.actions.map((action) => ({
            title: action,
            status: 'pending',
          })),
        }

        const userData = selectedUser
          ? {
              name: selectedUser.name,
              avatarUrl: selectedUser.url,
            }
          : {
              // Fallback to session user data
              name: session?.user?.name || 'Current User',
              avatarUrl: session?.user?.image || null,
            }

        const newGoal = await createGoal(goalData, userData)

        if (newGoal) {
          // Show success toast
          enqueueToast({
            id: `goal-created-${newGoal.id}`,
            title: t('toast.successMessage'),
            variant: 'success',
            duration: 3000,
          })

          // Close modal
          handleClose()
        }
      } catch (error) {
        // Error handling - toast could be added here for error feedback
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [currentStep, isSubmitting, createGoal, goalFilters, session, enqueueToast, t, handleClose])

  const handleBack = useCallback(() => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }, [currentStep])

  const actions = useMemo(
    () => (
      <div className="flex w-full items-center justify-between gap-1">
        <Button variant="secondary" onClick={handleSaveDraft} disabled={isSubmitting}>
          {t('actions.saveDraft')}
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
            {currentStep === 1 ? t('actions.next') : t('actions.submitForApproval')}
          </Button>
        </div>
      </div>
    ),
    [t, currentStep, isSubmitting, handleBack, handleNext, handleSaveDraft],
  )

  const { desktopModal, content } = useMemo(() => {
    const content = (
      <NewAmbitionForm
        step={currentStep}
        parentAmbitionId={parentAmbitionId}
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
  }, [
    actions,
    handleClose,
    t,
    currentStep,
    parentAmbitionId,
    handleValidationChange,
    handleFormDataChange,
  ])

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
    if (open && isMobile != null && !isMobile) {
      toggleModal(true)
    } else if (!open || isMobile) {
      toggleModal(false)
    }
  }, [open, isMobile, currentStep])

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

NewAmbitionModal.displayName = 'NewAmbitionModal'
