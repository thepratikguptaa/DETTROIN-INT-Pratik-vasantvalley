import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SmartImage from './SmartImage'
import Reveal from './Reveal'

/**
 * Shared inner-page banner: crimson wash over a photograph, breadcrumb trail
 * and a single headline. Keeps every page below the fold consistent.
 */
export function PageHero({ eyebrow, title, lede, image, crumb }) {
  return (
    <header className="relative isolate overflow-hidden bg-crimson-950">
      <div className="absolute inset-0 opacity-40">
        <SmartImage id={image} alt="" priority ratio="h-full w-full" imgClassName="scale-105" sizes="100vw" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-crimson-950/90 via-crimson-900/80 to-crimson-800/60"
      />

      <div className="container relative pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-sand-300/80">
            <li>
              <Link to="/" className="transition-colors hover:text-sand-50">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="text-sand-50">
              {crumb ?? title}
            </li>
          </ol>
        </nav>

        <Reveal>
          {eyebrow && <span className="eyebrow-light">{eyebrow}</span>}
          <h1 className="max-w-3xl text-display-lg text-sand-50">{title}</h1>
          {lede && <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-sand-200/90">{lede}</p>}
        </Reveal>
      </div>
    </header>
  )
}

export default PageHero
