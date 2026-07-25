import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

/**
 * Counts a number up once the element scrolls into view.
 * Returns [ref, value] — attach the ref to the element that holds the number.
 */
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduced) {
      setValue(target)
      return
    }

    let frame
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          // easeOutCubic — fast start, gentle landing
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(target * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target, duration, reduced])

  return [ref, value]
}
