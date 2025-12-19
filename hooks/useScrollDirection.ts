import { useEffect, useState } from 'react'

/**
 * Hook to detect scroll direction and position
 * @param threshold - Minimum scroll amount before direction change is registered (default: 10)
 * @returns Object containing scrolling state, direction, and current position
 */
export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY

      setScrollY(currentScrollY)
      setIsScrolling(currentScrollY > 0)

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { scrollDirection, scrollY, isScrolling }
}
