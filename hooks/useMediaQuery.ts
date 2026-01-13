'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * useMediaQuery - Hook to detect media query changes with optimized performance
 * Uses the matchMedia API which is more efficient than resize listeners
 * @param query - Media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // Initialize with current match state (only in browser)
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    // Guard against environments without matchMedia (like some test environments)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia(query)

    // Use matchMedia change event instead of resize for better performance
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers support addEventListener on MediaQueryList
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

/**
 * useWindowSize - Hook to detect window size changes with debounced resize listener
 * @param debounceMs - Debounce delay in milliseconds (default: 150ms)
 * @returns object with width and height
 */
export function useWindowSize(debounceMs = 150) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  // Set initial size synchronously to match first render and prevent hydration mismatch
  // Safe to disable rule: useLayoutEffect runs synchronously after DOM updates but before paint,
  // ensuring accurate initial measurements without SSR/client discrepancies
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout

    const debouncedHandleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, debounceMs)
    }

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [debounceMs])

  return windowSize
}
