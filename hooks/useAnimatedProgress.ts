import { useState, useEffect } from 'react'

/**
 * Hook for animating progress values from 0 to target on mount
 * Used by ProgressBar and ProgressRing components
 *
 * @param targetProgress - The target progress value (0-100)
 * @param animate - Whether to animate the progress (default: true)
 * @returns The current animated progress value
 *
 * @example
 * ```tsx
 * const animatedProgress = useAnimatedProgress(75, true)
 * // On mount: starts at 0, animates to 75
 * ```
 */
export function useAnimatedProgress(targetProgress: number, animate: boolean = true): number {
  const [animatedProgress, setAnimatedProgress] = useState(animate ? 0 : targetProgress)

  useEffect(() => {
    // Small delay to ensure the initial state is rendered first
    // When animate=false, we use 0ms timeout to avoid synchronous setState in effect
    const delay = animate ? 50 : 0
    const timer = setTimeout(() => {
      setAnimatedProgress(targetProgress)
    }, delay)
    return () => clearTimeout(timer)
  }, [targetProgress, animate])

  return animatedProgress
}
