import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react'
import { footerColumns, site } from '../../data/site'
import Icon from '../ui/Icon'
import Logo from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-crimson-950 text-sand-200">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035]" />

      {/* Closing call to action — a light band that lifts the footer off the page. */}
      <div className="relative bg-sand-100">
        <div className="container py-14 md:py-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-display-sm text-ink-900">Come and see the school on a working day.</h2>
              <p className="mt-3 leading-relaxed text-ink-600">
                Brochures only go so far. Walk the wings, sit in on an assembly, and ask us the questions that matter.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/admissions#enquiry" className="btn-primary">
                Book a visit
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact the office
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-[1.85] text-sand-300/85">{site.tagline}</p>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson-300" aria-hidden="true" />
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-sand-50"
                >
                  {site.address.line1}, {site.address.line2}
                  <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-crimson-300" aria-hidden="true" />
                <a href={site.phoneHref} className="transition-colors hover:text-sand-50">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-crimson-300" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-sand-50">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sand-400/80">
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-sand-200/85 transition-colors duration-200 hover:text-sand-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-sand-100/10 py-7 text-xs text-sand-300/70 md:flex-row">
          <p>© {year} Vasant Valley School. All rights reserved.</p>

          <ul className="flex items-center gap-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-sand-100/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-sand-100/40 hover:bg-sand-100/10"
                >
                  <Icon name={social.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-center md:text-right">
            A redesign concept built for the Dettroin Full Stack Internship —
            <span className="text-sand-200/90"> not affiliated with the school.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
