import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, Menu, Phone, UserRound, X } from 'lucide-react'
import Logo from './Logo'
import { navigation, site } from '../../data/site'
import { classNames } from '../../lib/format'
import { useScrollLock } from '../../hooks/useScrollLock'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const closeTimer = useRef(null)
  const { pathname, hash } = useLocation()

  useScrollLock(mobileOpen)

  // Solid header once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation closes every open surface.
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
    setMobileSection(null)
  }, [pathname, hash])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Small delay on leave so the pointer can travel from trigger to panel.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const transparent = !scrolled && !mobileOpen

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-crimson-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-sand-50"
      >
        Skip to main content
      </a>

      <header
        className={classNames(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo',
          transparent ? 'bg-transparent' : 'bg-sand-50/95 shadow-soft backdrop-blur-md',
        )}
      >
        {/* Utility bar — collapses away as soon as the page scrolls. */}
        <div
          className={classNames(
            'hidden overflow-hidden border-b border-sand-50/15 bg-crimson-950 text-sand-200 transition-all duration-500 ease-out-expo lg:block',
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
          )}
        >
          <div className="container flex h-10 items-center justify-between text-xs">
            <p className="tracking-wide">{site.address.line1}, {site.address.line2}</p>
            <div className="flex items-center gap-6">
              <a href={site.phoneHref} className="flex items-center gap-2 transition-colors hover:text-sand-50">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-sand-50">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <nav aria-label="Primary" className="container">
          <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
            <Logo light={transparent} />

            <ul className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => {
                const hasChildren = Boolean(item.children?.length)
                const isOpen = openMenu === item.label

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={hasChildren ? () => { cancelClose(); setOpenMenu(item.label) } : undefined}
                    onMouseLeave={hasChildren ? scheduleClose : undefined}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onFocus={hasChildren ? () => setOpenMenu(item.label) : () => setOpenMenu(null)}
                      className={({ isActive }) =>
                        classNames(
                          'group relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300',
                          transparent ? 'text-sand-100 hover:text-white' : 'text-ink-700 hover:text-crimson-700',
                          isActive && (transparent ? 'text-white' : 'text-crimson-700'),
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {hasChildren && (
                            <ChevronDown
                              className={classNames('h-3.5 w-3.5 transition-transform duration-300', isOpen && 'rotate-180')}
                              aria-hidden="true"
                            />
                          )}
                          <span
                            aria-hidden="true"
                            className={classNames(
                              'absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 transition-transform duration-400 ease-out-expo group-hover:scale-x-100',
                              transparent ? 'bg-sand-100' : 'bg-crimson-700',
                              isActive && 'scale-x-100',
                            )}
                          />
                        </>
                      )}
                    </NavLink>

                    {hasChildren && (
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                            className="absolute left-1/2 top-full w-[24rem] -translate-x-1/2 pt-3"
                          >
                            <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white p-2 shadow-lift">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.to}
                                  className="group/item block rounded-xl px-4 py-3 transition-colors hover:bg-sand-100"
                                >
                                  <span className="flex items-center justify-between gap-3 text-sm font-semibold text-ink-900 group-hover/item:text-crimson-700">
                                    {child.label}
                                  </span>
                                  <span className="mt-1 block text-xs leading-relaxed text-ink-500">
                                    {child.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/contact#login"
                className={classNames(
                  'flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors',
                  transparent ? 'text-sand-200 hover:text-white' : 'text-ink-600 hover:text-crimson-700',
                )}
              >
                <UserRound className="h-4 w-4" aria-hidden="true" />
                Log in
              </Link>
              <Link
                to="/admissions#enquiry"
                className={classNames('btn px-5 py-2.5 text-[0.78rem]', transparent ? 'btn-ghost-light' : 'btn-primary')}
              >
                Apply now
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={classNames(
                'grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden',
                transparent
                  ? 'border-sand-100/40 text-sand-50'
                  : 'border-sand-300 bg-white text-ink-900',
              )}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-sand-50 pt-[var(--header-h)] lg:hidden"
          >
            <nav aria-label="Mobile" className="container pb-16 pt-6">
              <ul className="divide-y divide-sand-300 border-y border-sand-300">
                {navigation.map((item, index) => {
                  const hasChildren = Boolean(item.children?.length)
                  const isOpen = mobileSection === item.label

                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.045, duration: 0.35 }}
                      className="py-1"
                    >
                      <div className="flex items-center justify-between">
                        <NavLink
                          to={item.to}
                          end={item.to === '/'}
                          className={({ isActive }) =>
                            classNames(
                              'block flex-1 py-4 font-display text-xl',
                              isActive ? 'text-crimson-700' : 'text-ink-900',
                            )
                          }
                        >
                          {item.label}
                        </NavLink>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => setMobileSection(isOpen ? null : item.label)}
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} links`}
                            className="grid h-10 w-10 place-items-center rounded-full border border-sand-300 text-ink-600"
                          >
                            <ChevronDown
                              className={classNames('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasChildren && isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-1"
                          >
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  to={child.to}
                                  className="block border-l-2 border-sand-300 py-2.5 pl-4 text-sm text-ink-600 transition-colors hover:border-crimson-700 hover:text-crimson-700"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                            <li className="h-3" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Link to="/admissions#enquiry" className="btn-primary w-full">
                  Apply now
                </Link>
                <Link to="/contact#login" className="btn-secondary w-full">
                  Parent & student login
                </Link>
              </div>

              <div className="mt-8 space-y-2 text-sm text-ink-600">
                <a href={site.phoneHref} className="flex items-center gap-3 py-1">
                  <Phone className="h-4 w-4 text-crimson-700" aria-hidden="true" />
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 py-1">
                  <Mail className="h-4 w-4 text-crimson-700" aria-hidden="true" />
                  {site.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
