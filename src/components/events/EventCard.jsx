import { CalendarDays, MapPin } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import { classNames, formatDateRange } from '../../lib/format'

/** Event/news card. `compact` is the version used in the home page rail. */
export function EventCard({ event, compact = false }) {
  return (
    <article
      className={classNames(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-crimson-200 hover:shadow-lift',
        compact && 'w-[19rem] shrink-0 sm:w-[21rem]',
      )}
    >
      <div className="relative">
        <SmartImage
          id={event.image}
          alt={event.title}
          ratio={compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}
          imgClassName="group-hover:scale-105"
          sizes={compact ? '21rem' : '(min-width: 1024px) 32vw, 92vw'}
        />
        <span className="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-crimson-800 backdrop-blur">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-crimson-700" aria-hidden="true" />
            <time dateTime={event.date}>{formatDateRange(event.date, event.endDate)}</time>
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-crimson-700" aria-hidden="true" />
              {event.location}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl leading-snug text-ink-900 transition-colors group-hover:text-crimson-800">
          {event.title}
        </h3>
        <p
          className={classNames(
            'mt-3 text-sm leading-[1.8] text-ink-600',
            compact && 'line-clamp-3',
          )}
        >
          {event.excerpt}
        </p>
      </div>
    </article>
  )
}

export default EventCard
