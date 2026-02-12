'use client'

import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { ToastViewProps } from './Toast.types'

const variantConfig = {
  success: {
    icon: CheckCircle,
    iconClass: 'text-feedback-success-500',
    bgClass: 'bg-feedback-success-100',
  },
  error: {
    icon: XCircle,
    iconClass: 'text-feedback-error-500',
    bgClass: 'bg-feedback-error-100',
  },
  info: {
    icon: Info,
    iconClass: 'text-feedback-info-500',
    bgClass: 'bg-feedback-info-100',
  },
}

export function Toast({
  content,
  title,
  description,
  message,
  variant = 'success',
  showClose = true,
  onClose,
}: ToastViewProps) {
  const t = useTranslations('Toast')
  const config = variantConfig[variant]
  const Icon = config.icon

  // Determine what content to show
  const hasStructuredContent = title || description
  const displayContent = message || content

  return (
    <div
      className={cn(
        'fixed top-4 right-4',
        'flex items-center gap-1',
        'rounded-lg',
        'p-1',
        'w-toast-width',
        'font-normal text-body leading-body text-neutral-1000',
        config.bgClass,
      )}
      style={{
        zIndex: 700,
      }}
      role="status"
      aria-live="polite"
    >
      <Icon className={cn('size-1_5 shrink-0', config.iconClass)} />
      <div className="flex-1 min-w-0">
        {hasStructuredContent ? (
          <>
            {title && (
              <span className="block font-bold text-body leading-body text-text-primary">
                {title}
              </span>
            )}
            {description && (
              <span className="block font-normal text-body leading-body text-text-primary">
                {description}
              </span>
            )}
          </>
        ) : (
          <span>{displayContent}</span>
        )}
      </div>
      {showClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-0_25 rounded hover:bg-neutral-100/50 transition-colors"
          aria-label={t('closeNotification')}
        >
          <X className="size-1_25 text-neutral-1000" />
        </button>
      )}
    </div>
  )
}
