import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { quickLinks } from '../../data/content'
import Icon from '../ui/Icon'
import { RevealGroup, RevealItem } from '../ui/Reveal'

/**
 * The four tasks most visitors actually arrive to do, lifted out of the menu
 * and placed directly under the hero.
 */
export function QuickLinks() {
  return (
    <section aria-label="Quick links" className="relative z-10 bg-sand-50">
      <div className="container">
        <RevealGroup className="grid divide-y divide-sand-300 border-b border-sand-300 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <RevealItem key={link.label} className={index > 0 ? 'sm:border-l sm:border-sand-300' : ''}>
              <Link
                to={link.to}
                className="group flex h-full items-start gap-4 p-6 transition-colors duration-300 hover:bg-white lg:p-8"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-crimson-50 text-crimson-700 transition-all duration-500 ease-out-expo group-hover:bg-crimson-700 group-hover:text-sand-50">
                  <Icon name={link.icon} className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 font-display text-[1.05rem] text-ink-900 group-hover:text-crimson-800">
                    {link.label}
                    <ArrowUpRight
                      className="h-4 w-4 -translate-y-px opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm text-ink-500">{link.description}</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default QuickLinks
