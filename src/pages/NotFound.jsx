import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const suggestions = [
  { label: 'Admissions', to: '/admissions' },
  { label: 'The Learning Experience', to: '/learning' },
  { label: 'A Day in School', to: '/day-in-school' },
  { label: 'News & Events', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <section className="relative grid min-h-[85vh] place-items-center overflow-hidden bg-crimson-950 px-5 text-center text-sand-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rotate-12 border border-sand-100/10 clip-octagon"
      />

      <div className="relative max-w-xl pt-[var(--header-h)]">
        <p className="font-display text-[6rem] leading-none text-crimson-300/40 md:text-[9rem]">404</p>
        <h1 className="mt-2 text-display-md text-sand-50">This page has left the campus</h1>
        <p className="mx-auto mt-5 max-w-md leading-[1.85] text-sand-200/85">
          The link may be old, or the page may have moved. Here is where most people were heading.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {suggestions.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="inline-flex rounded-full border border-sand-100/25 px-4 py-2 text-sm text-sand-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-sand-100/60 hover:bg-sand-50/10"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn bg-sand-50 text-crimson-800 hover:bg-white">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <button type="button" onClick={() => window.history.back()} className="btn-ghost-light">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go back
          </button>
        </div>
      </div>
    </section>
  )
}
