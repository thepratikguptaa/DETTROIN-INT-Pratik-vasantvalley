import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import EventCard from '../components/events/EventCard'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { events as seed, eventCategories } from '../data/events'
import { api } from '../lib/api'
import { classNames, groupByMonth } from '../lib/format'
import { photos } from '../data/media'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function News() {
  const [items, setItems] = useState(seed)
  const [source, setSource] = useState('fallback')
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  useDocumentTitle(
    'News & Events',
    'Announcements, achievements and the events calendar at Vasant Valley School — filter by category or search the archive.',
  )

  useEffect(() => {
    let cancelled = false
    api.events(seed).then(({ data, source: from }) => {
      if (cancelled) return
      if (Array.isArray(data) && data.length) setItems(data)
      setSource(from)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items
      .filter((event) => category === 'All' || event.category === category)
      .filter(
        (event) =>
          !needle ||
          event.title.toLowerCase().includes(needle) ||
          event.excerpt.toLowerCase().includes(needle) ||
          event.category.toLowerCase().includes(needle),
      )
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [items, category, query])

  const archive = useMemo(() => groupByMonth([...items].sort((a, b) => b.date.localeCompare(a.date))), [items])
  const hasFilters = category !== 'All' || query.trim().length > 0

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="What happened this week"
        lede="Debates, tournaments, productions, prizes and the quieter things that make up a school year."
        image={photos.auditorium}
        crumb="News & Events"
      />

      <section className="section bg-sand-50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div>
              {/* Filters */}
              <div className="sticky top-[calc(var(--header-h)+0.5rem)] z-20 -mx-1 mb-10 rounded-2xl border border-sand-300 bg-sand-50/95 p-4 backdrop-blur">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="relative flex-1">
                    <Search
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
                      aria-hidden="true"
                    />
                    <label htmlFor="event-search" className="sr-only">
                      Search news and events
                    </label>
                    <input
                      id="event-search"
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search events, achievements, notices…"
                      className="field pl-11"
                    />
                  </div>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('All')
                        setQuery('')
                      }}
                      className="inline-flex items-center gap-2 self-start rounded-full border border-sand-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-600 transition-colors hover:border-crimson-700 hover:text-crimson-700"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                      Clear
                    </button>
                  )}
                </div>

                <div
                  role="group"
                  aria-label="Filter by category"
                  className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1"
                >
                  {eventCategories.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      aria-pressed={category === option}
                      className={classNames(
                        'shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300',
                        category === option
                          ? 'bg-crimson-700 text-sand-50 shadow-soft'
                          : 'bg-sand-200 text-ink-600 hover:bg-sand-300',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mb-6 flex items-center gap-2 text-sm text-ink-500" aria-live="polite">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                {loading
                  ? 'Loading the calendar…'
                  : `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}${
                      category === 'All' ? '' : ` in ${category}`
                    }`}
              </p>

              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-sand-400 bg-white/60 p-14 text-center">
                  <h3 className="font-display text-xl text-ink-900">Nothing matches that search</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
                    Try a different category, or clear the filters to see the full calendar.
                  </p>
                </div>
              ) : (
                <RevealGroup className="grid gap-6 sm:grid-cols-2">
                  {filtered.map((event) => (
                    <RevealItem key={event.id}>
                      <EventCard event={event} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </div>

            {/* Archive rail */}
            <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              <Reveal>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">Browse archives</h2>
                <ul className="mt-5 space-y-2.5">
                  {archive.map((group) => (
                    <li key={group.month} className="flex items-center justify-between border-b border-sand-300 pb-2.5">
                      <span className="text-sm text-ink-700">{group.month}</span>
                      <span className="text-xs text-ink-500 tabular-nums">{group.entries.length}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl bg-crimson-950 p-6 text-sand-200">
                  <h3 className="font-display text-lg text-sand-50">Data source</h3>
                  <p className="mt-2 text-sm leading-[1.75] text-sand-200/85">
                    This list is served by the project's Node API. When the API is unreachable the page falls back to
                    bundled seed data, so it never renders empty.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sand-50/10 px-3 py-1.5 text-xs">
                    <span
                      aria-hidden="true"
                      className={classNames(
                        'h-2 w-2 rounded-full',
                        source === 'api' ? 'bg-emerald-400' : 'bg-sand-400',
                      )}
                    />
                    {source === 'api' ? 'Live from /api/events' : 'Bundled fallback data'}
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-sand-200 py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Stay in touch"
            title="Announcements reach parents first"
            lede="Circulars, calendar changes and results are posted to the parent portal and emailed the same day."
            align="center"
            className="mx-auto"
          />
        </div>
      </section>
    </>
  )
}
