import { useEffect, useState } from 'react'

/** Subscribes to a CSS media query. Used to disable heavy motion on small screens. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
