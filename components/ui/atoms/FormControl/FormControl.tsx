'use-client'

import { Label } from 'radix-ui'
import { Info, X, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { type FeddbackHelperProps, type FormControlProps, HELPER_TYPE } from './FormControl.types'

function FeedbackHelper({ type, message, strength }: FeddbackHelperProps) {
  const getVariantByType = (type: (typeof HELPER_TYPE)[keyof typeof HELPER_TYPE]) => {
    switch (type) {
      case HELPER_TYPE.ERROR:
        return {
          icon: <X width={12} strokeWidth={4} />,
          iconClasses: 'text-white bg-feedback-danger-600',
          wrapperClasses: 'bg-feedback-danger-10',
          strengthClass: 'bg-feedback-danger-600',
        }
      case HELPER_TYPE.SUCCESS:
        return {
          icon: <Check width={12} strokeWidth={4} />,
          iconClasses: 'text-white bg-feedback-success-600',
          wrapperClasses: 'bg-feedback-success-10',
          strengthClass: 'bg-feedback-success-600',
        }
      case HELPER_TYPE.WARNING:
        return {
          icon: <AlertCircle width={20} strokeWidth={3} />,
          iconClasses: 'text-white bg-feedback-warning-600',
          wrapperClasses: 'bg-feedback-warning-10',
          strengthClass: 'bg-feedback-warning-600',
        }
      case HELPER_TYPE.INFO:
        return {
          icon: <Info width={20} strokeWidth={3} />,
          iconClasses: 'text-white bg-feedback-info-600',
          wrapperClasses: 'bg-feedback-info-10',
          strengthClass: 'bg-feedback-info-600',
        }
    }
  }

  const { icon, wrapperClasses, iconClasses, strengthClass } = getVariantByType(type)
  return (
    <>
      <div
        className={cn('flex items-center gap-0_25 p-0_25 rounded-tiny', wrapperClasses)}
        aria-live="polite"
      >
        <span
          className={cn(
            'flex items-center justify-center rounded-full w-icon-rounded-diameter h-icon-rounded-diameter basis-auto shrink-0',
            iconClasses,
          )}
        >
          {icon}
        </span>
        <span className="text-body-small leading-body-smal text-neutral-1000">{message}</span>
      </div>
      {strength != null && (
        <div className="flex between m-t-0_125 gap-0_125">
          {[1, 2, 3, 4, 5].map((indicator: number) => (
            <div
              key={indicator}
              role="presentation"
              className={cn(
                'inline-block h-0_125 basis-[20%] rounded-full',
                indicator <= strength ? strengthClass : 'bg-black/10',
              )}
            ></div>
          ))}
        </div>
      )}
    </>
  )
}

export function FormControl({
  label,
  children,
  fullWidth,
  helperBefore,
  helperAfter,
  mandatory,
  beforeLabel,
  afterLabel,
}: FormControlProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-stretch gap-0_25',
        !fullWidth && 'max-w-form-control-width',
      )}
    >
      <Label.Root className="flex flex-col items-stretch gap-0_25">
        <div className="text-body leading-body text-neutral-1000 font-bold flex gap-0_25 items-center">
          {beforeLabel}
          {label}
          {mandatory && <span className="text-feedback-danger-600">*</span>}
          {afterLabel}
        </div>
        {helperBefore &&
          !!helperBefore.length &&
          helperBefore.map((feedback: FeddbackHelperProps, index) => (
            <FeedbackHelper key={feedback.type + index} {...feedback} />
          ))}
        {children}
      </Label.Root>
      {helperAfter &&
        !!helperAfter.length &&
        helperAfter.map((feedback: FeddbackHelperProps, index) => (
          <FeedbackHelper key={feedback.type + index} {...feedback} />
        ))}
    </div>
  )
}
