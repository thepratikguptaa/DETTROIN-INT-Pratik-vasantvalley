import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { learningFacets } from '../../data/content'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import { classNames } from '../../lib/format'

const RADIUS = 43 // % from the centre of the wheel to each label

/** Polar → percentage coordinates, starting at 12 o'clock. */
function position(index, total, radius = RADIUS) {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180)
  return {
    left: `${50 + radius * Math.cos(angle)}%`,
    top: `${50 + radius * Math.sin(angle)}%`,
  }
}

/**
 * The school's eight-facet learning model, rebuilt as an interactive octagon:
 * the original site showed a flat diagram, this one explains itself.
 */
export function LearningWheel() {
  const [activeKey, setActiveKey] = useState(learningFacets[0].key)
  const active = learningFacets.find((facet) => facet.key === activeKey) ?? learningFacets[0]

  return (
    <section id="learning-experience" className="section scroll-mt-24 bg-sand-200">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-7 bg-crimson-700/50" />
              The Learning Experience
            </span>
            <h2 className="text-display-md text-crimson-800">Learning with understanding</h2>
            <p className="mt-6 leading-[1.85] text-ink-700">
              While high academic achievement is a priority, the school aims to create a community of well-rounded
              individuals who are compassionate and confident. Eight facets shape every year a child spends here —
              select one to see what it means in practice.
            </p>

            <div className="mt-8 min-h-[9.5rem] rounded-2xl border border-sand-300 bg-white/70 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-crimson-700 text-sand-50">
                      <Icon name={active.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-xl text-ink-900">{active.label}</span>
                  </span>
                  <p className="mt-4 leading-[1.8] text-ink-600">{active.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Link to="/learning#experience" className="group link-arrow mt-8">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              Explore the learning experience
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              role="group"
              aria-label="The eight facets of the Vasant Valley learning experience"
              className="relative mx-auto aspect-square w-full max-w-[34rem]"
            >
              {/* Spokes */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {learningFacets.map((facet, index) => {
                  const angle = (-90 + 45 * index) * (Math.PI / 180)
                  return (
                    <line
                      key={facet.key}
                      x1="50"
                      y1="50"
                      x2={50 + (RADIUS - 6) * Math.cos(angle)}
                      y2={50 + (RADIUS - 6) * Math.sin(angle)}
                      stroke={facet.key === activeKey ? '#9E1B32' : '#DCC9AC'}
                      strokeWidth={facet.key === activeKey ? 0.8 : 0.4}
                      className="transition-all duration-500"
                    />
                  )
                })}
                <circle cx="50" cy="50" r={RADIUS - 6} fill="none" stroke="#DCC9AC" strokeWidth="0.3" strokeDasharray="1 2" />
              </svg>

              {/* Centre */}
              <div className="absolute inset-[27%] grid place-items-center bg-crimson-700 p-4 text-center clip-octagon shadow-lift">
                <p className="font-display text-[0.95rem] leading-tight text-sand-50 sm:text-base">
                  The Vasant Valley
                  <span className="block text-sand-300">Learning Experience</span>
                </p>
              </div>

              {/* Facet buttons */}
              {learningFacets.map((facet, index) => {
                const isActive = facet.key === activeKey
                return (
                  <button
                    key={facet.key}
                    type="button"
                    style={position(index, learningFacets.length)}
                    onMouseEnter={() => setActiveKey(facet.key)}
                    onFocus={() => setActiveKey(facet.key)}
                    onClick={() => setActiveKey(facet.key)}
                    aria-pressed={isActive}
                    className={classNames(
                      'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-all duration-400 ease-out-expo sm:px-4 sm:py-2 sm:text-xs',
                      isActive
                        ? 'scale-105 border-crimson-700 bg-crimson-700 text-sand-50 shadow-lift'
                        : 'border-sand-400 bg-sand-50 text-ink-700 hover:border-crimson-400 hover:text-crimson-700',
                    )}
                  >
                    {facet.label}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default LearningWheel
