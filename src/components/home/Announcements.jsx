import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Megaphone } from 'lucide-react'
import { announcements as seed } from '../../data/content'
import { api } from '../../lib/api'
import { classNames } from '../../lib/format'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const ROTATE_MS = 9000

/**
 * Crimson announcement band. Content comes from `/api/announcements` and falls
 * back to the bundled copy, so the band never renders empty.
 */
export function Announcements() {
  const [items, setItems] = useState(seed)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    let cancelled = false
    api.announcements(seed).then(({ data }) => {
      if (!cancelled && Array.isArray(data) && data.length) setItems(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (paused || reduced || items.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS)
    return () => clearTimeout(timer)
  }, [paused, reduced, index, items.length])

  const current = items[Math.min(index, items.length - 1)]
  if (!current) return null

  return (
    <section
      aria-label="Announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden bg-crimson-700 text-sand-50"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 rotate-12 border border-sand-100/10 clip-octagon lg:block"
      />

      <div className="container relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-sand-50/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-sand-100 ring-1 ring-inset ring-sand-100/20">
            <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
            {current.tag}
          </span>

          <div className="min-h-[15rem] sm:min-h-[13rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-display-sm text-sand-50">{current.title}</h2>
                <p className="mx-auto mt-5 max-w-2xl leading-[1.9] text-sand-200/90">{current.body}</p>
                <Link
                  to={current.cta.to}
                  className="group mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sand-100 transition-colors hover:text-white"
                >
                  {current.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2.5">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show announcement ${i + 1}: ${item.title}`}
                  aria-current={i === index}
                  className={classNames(
                    'h-2 rounded-full transition-all duration-500 ease-out-expo',
                    i === index ? 'w-8 bg-sand-50' : 'w-2 bg-sand-50/40 hover:bg-sand-50/70',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Announcements
