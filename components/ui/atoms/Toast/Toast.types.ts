export type Toast = {
  id: string
  content: React.ReactNode
  duration?: number // ms
  variant?: 'success' | 'error' | 'info'
}

export type ToastViewProps = Omit<Toast, 'id' | 'duration'>
