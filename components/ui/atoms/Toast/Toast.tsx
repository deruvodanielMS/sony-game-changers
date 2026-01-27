import { cn } from '@/utils/cn'
import { ToastViewProps } from './Toast.types'

const variantStyles = {
  success: 'bg-feedback-success-50 border-feedback-success-200 text-feedback-success-900',
  error: 'bg-feedback-danger-50 border-feedback-danger-200 text-feedback-danger-900',
  info: 'bg-feedback-info-50 border-feedback-info-200 text-feedback-info-900',
}

export function Toast({ content, variant }: ToastViewProps) {
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4',
        'rounded-lg shadow-lg',
        'px-4 py-3 border',
        variant ? variantStyles[variant] : 'bg-white text-gray-900 border-neutral-200',
      )}
      style={{ zIndex: 700 }}
      role="status"
    >
      {content}
    </div>
  )
}
