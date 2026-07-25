import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { events as seed } from '../../data/events'
import { api } from '../../lib/api'
import EventCard from '../events/EventCard'
import Reveal from '../ui/Reveal'

/**
 * Horizontally scrollable timeline of recent events. Native scroll-snap does
 * the work, so touch, trackpad and the arrow buttons all behave identically.
 */
export function EventsRail() {
  const [items, setItems] = useState(seed.slice(0, 6))
  const [canScroll, setCanScroll] = useState({ left: false, right: true })
  const railRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    api.events(seed).then(({ data }) => {
      if (!cancelled && Array.isArray(data) && data.length) setItems(data.slice(0, 6))
    })
    return () => {
      cancelled = true
    }
  }, [])

  const updateArrows = () => {
    const node = railRef.current
    if (!node) return
    const max = node.scrollWidth - node.clientWidth
    setCanScroll({ left: node.scrollLeft > 8, right: node.scrollLeft < max - 8 })
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [items])

  const scrollBy = (direction) => {
    const node = railRef.current
    if (!node) return
    const amount = Math.min(node.clientWidth * 0.8, 720)
    node.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section className="section bg-sand-50">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-7 bg-crimson-700/50" />
              What's happening
            </span>
            <h2 className="text-display-md">A timeline of recent events</h2>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-3">
            <Link to="/news" className="group link-arrow mr-2">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              View all
            </Link>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScroll.left}
              aria-label="Scroll events left"
              className="grid h-11 w-11 place-items-center rounded-full border border-sand-400 text-ink-700 transition-all hover:border-crimson-700 hover:text-crimson-700 disabled:opacity-30 disabled:hover:border-sand-400 disabled:hover:text-ink-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canScroll.right}
              aria-label="Scroll events right"
              className="grid h-11 w-11 place-items-center rounded-full border border-sand-400 text-ink-700 transition-all hover:border-crimson-700 hover:text-crimson-700 disabled:opacity-30 disabled:hover:border-sand-400 disabled:hover:text-ink-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-12">
        <ul
          ref={railRef}
          onScroll={updateArrows}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        >
          {items.map((event) => (
            <li key={event.id} className="snap-start">
              <EventCard event={event} compact />
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0" />
        </ul>
      </div>
    </section>
  )
}

export default EventsRail
