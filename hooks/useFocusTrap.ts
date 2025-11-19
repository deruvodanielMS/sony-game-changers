'use client'

import { useEffect } from 'react'

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null> | null,
  enabled = false,
) {
  useEffect(() => {
    if (!enabled) return
    const container = containerRef?.current
    if (!container) return

    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      const focusable = container!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )

      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [containerRef, enabled])
}
