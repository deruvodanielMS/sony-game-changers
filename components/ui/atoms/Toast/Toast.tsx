import { cn } from '@/utils/cn'
import { ToastViewProps } from './Toast.types'

const variantStyles = {
  success: 'bg-feedback-success-100 text-text-primary',
  error: 'bg-feedback-error-100 text-text-primary',
  info: 'bg-feedback-info-100 text-text-primary',
}

export function Toast({ content, variant }: ToastViewProps) {
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4',
        'rounded-lg shadow-lg',
        'px-4 py-3',
        // Typography styles matching Figma design
        'font-normal text-body leading-body',
        variant ? variantStyles[variant] : 'bg-white text-text-primary',
      )}
      style={{
        zIndex: 700,
        fontVariantNumeric: 'lining-nums tabular-nums',
        fontFeatureSettings:
          "'cv01' on, 'cv02' on, 'cv03' on, 'cv04' on, 'cv06' on, 'cv09' on, 'cv10' on, 'cv11' on, 'liga' off, 'clig' off",
      }}
      role="status"
    >
      {content}
    </div>
  )
}
