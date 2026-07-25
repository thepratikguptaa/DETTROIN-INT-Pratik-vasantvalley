import { Link } from 'react-router-dom'
import { classNames } from '../../lib/format'

/** Octagonal mark + wordmark. `light` flips it for use over dark imagery. */
export function Logo({ light = false, className = '' }) {
  return (
    <Link
      to="/"
      className={classNames('group flex items-center gap-3', className)}
      aria-label="Vasant Valley School — home"
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center transition-transform duration-500 ease-out-expo group-hover:rotate-[22.5deg]">
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path
            d="M20 2h24l18 18v24L44 62H20L2 44V20L20 2z"
            className={light ? 'fill-sand-50' : 'fill-crimson-700'}
          />
          <path
            d="M17 20h7.4l7.6 20.2L39.6 20H47L35.6 48h-7.2L17 20z"
            className={light ? 'fill-crimson-700' : 'fill-sand-50'}
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={classNames(
            'font-display text-[1.15rem] font-semibold tracking-tight',
            light ? 'text-sand-50' : 'text-ink-900',
          )}
        >
          Vasant Valley
        </span>
        <span
          className={classNames(
            'mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em]',
            light ? 'text-sand-300' : 'text-crimson-700',
          )}
        >
          School · Est. 1990
        </span>
      </span>
    </Link>
  )
}

export default Logo
