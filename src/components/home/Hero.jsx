import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '../../data/content'
import { img, srcSetFor } from '../../data/media'
import { classNames } from '../../lib/format'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const INTERVAL = 7000

/**
 * Full-bleed hero carousel.
 * - autoplay pauses on hover, on focus within, and when the tab is hidden
 * - arrow keys move between slides, and there's an explicit play/pause control
 * - respects prefers-reduced-motion by disabling autoplay and the Ken Burns pan
 */
export function Hero() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const regionRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  const count = heroSlides.length
  const go = useCallback((next) => setIndex(((next % count) + count) % count), [count])

  const active = playing && !hovered && !reduced

  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => go(index + 1), INTERVAL)
    return () => clearTimeout(timer)
  }, [active, index, go])

  useEffect(() => {
    const onVisibility = () => setPlaying(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(index - 1)
    }
  }

  const slide = heroSlides[index]

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="School highlights"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-crimson-950 lg:min-h-[88vh]"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={img(slide.image, 1920, 70)}
            srcSet={srcSetFor(slide.image, [960, 1280, 1600, 1920])}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchpriority={index === 0 ? 'high' : 'auto'}
            className={classNames('h-full w-full object-cover', !reduced && 'animate-ken-burns')}
          />
        </motion.div>
      </AnimatePresence>

      {/* Legibility scrims: dark from the bottom, crimson from the left. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-900/92 via-ink-900/45 to-ink-900/25"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-crimson-950/70 to-transparent" />

      <div className="container relative w-full pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="max-w-3xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow-light">
                <span aria-hidden="true" className="h-px w-8 bg-sand-300/60" />
                {slide.eyebrow}
              </span>
              <h1 className="text-display-xl text-sand-50">{slide.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-[1.8] text-sand-200/90 md:text-lg">{slide.subtitle}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to={slide.cta.to} className="btn-primary group">
                  {slide.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/admissions" className="btn-ghost-light">
                  Admissions 2026–27
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-14 flex items-center justify-between gap-6 border-t border-sand-100/15 pt-6">
          <div className="flex items-center gap-3">
            {heroSlides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${item.title}`}
                aria-current={i === index}
                className="group relative h-8 py-3.5"
              >
                <span
                  className={classNames(
                    'block h-[3px] rounded-full transition-all duration-500 ease-out-expo',
                    i === index ? 'w-14 bg-sand-50' : 'w-6 bg-sand-100/35 group-hover:bg-sand-100/70',
                  )}
                />
              </button>
            ))}
            <span className="ml-2 font-display text-sm text-sand-200/70 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className="grid h-10 w-10 place-items-center rounded-full border border-sand-100/25 text-sand-100 transition-colors hover:border-sand-100/60 hover:bg-sand-100/10"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-sand-100/25 text-sand-100 transition-colors hover:border-sand-100/60 hover:bg-sand-100/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-sand-100/25 text-sand-100 transition-colors hover:border-sand-100/60 hover:bg-sand-100/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
