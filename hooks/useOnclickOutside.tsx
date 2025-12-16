'use client'

import * as React from 'react'

type AnyEvent = MouseEvent | TouchEvent | PointerEvent

type Options = {
  /** Events to listen to */
  events?: Array<keyof DocumentEventMap> // e.g. ["pointerdown", "keydown"]
  /** If true, don't fire when the click starts inside the element and ends outside */
  requireStartInside?: boolean
  /** Extra elements that should count as "inside" (e.g., trigger button) */
  additionalRefs?: Array<React.RefObject<HTMLElement | null>>
  /** Ignore the event if target matches selector (optional) */
  ignoreSelector?: string
}

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutside: (event: AnyEvent) => void,
  { events = ['pointerdown'], additionalRefs = [], ignoreSelector }: Options = {},
) {
  const onOutsideRef = React.useRef(onOutside)
  React.useEffect(() => {
    onOutsideRef.current = onOutside
  }, [onOutside])

  React.useEffect(() => {
    if (!ref) return

    const isInside = (target: EventTarget | null) => {
      const el = ref.current
      if (!el || !(target instanceof Node)) return false
      if (el.contains(target)) return true

      for (const r of additionalRefs) {
        const a = r.current
        if (a && a.contains(target)) return true
      }
      return false
    }

    const handler = (event: Event) => {
      const target = event.target

      if (ignoreSelector && target instanceof Element) {
        if (target.closest(ignoreSelector)) return
      }

      if (isInside(target)) return

      onOutsideRef.current(event as AnyEvent)
    }

    // Capture phase helps when Radix/portals stop propagation
    for (const e of events) {
      document.addEventListener(e, handler, { capture: true })
    }

    return () => {
      for (const e of events) {
        document.removeEventListener(e, handler, { capture: true })
      }
    }
  }, [ref, additionalRefs, events, ignoreSelector])
}
