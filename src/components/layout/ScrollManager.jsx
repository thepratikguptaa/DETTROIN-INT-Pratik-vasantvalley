import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * SPA scroll behaviour that browsers give you for free on multi-page sites:
 * jump to the top on a new route, and scroll to the anchor when there's a hash.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target route has actually rendered.
      const id = hash.slice(1)
      const raf = requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo({ top: 0 })
      })
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default ScrollManager
