import { useEffect } from 'react'
import { useUIStore } from '@/stores/ui.store'
import { Toast } from '@/components/ui/atoms/Toast'
import { TOAST_DEFAULT_DURATION } from '@/common/constants'

export function ToastManager() {
  const toastQueue = useUIStore((s) => s.toastQueue)
  const dequeueToast = useUIStore((s) => s.dequeueToast)

  const currentToast = toastQueue[0]

  useEffect(() => {
    if (!currentToast) return

    const timeout = setTimeout(() => {
      dequeueToast()
    }, currentToast.duration ?? TOAST_DEFAULT_DURATION)

    return () => clearTimeout(timeout)
  }, [currentToast, dequeueToast])

  if (!currentToast) return null

  const { id, ...toastProps } = currentToast

  return <Toast key={id} {...toastProps} onClose={dequeueToast} />
}
