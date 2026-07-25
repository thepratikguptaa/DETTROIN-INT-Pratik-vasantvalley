import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { learningFacets, programmes, stages } from '../data/content'
import { photos } from '../data/media'
import { classNames } from '../lib/format'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Learning() {
  const [activeStage, setActiveStage] = useState(stages[0].id)
  const stage = stages.find((item) => item.id === activeStage) ?? stages[0]

  useDocumentTitle(
    'The Learning Experience',
    'Curriculum, pedagogy and programmes at Vasant Valley School — from Pre-School through Class XII, plus the international curriculum and SEN provision.',
  )

  return (
    <>
      <PageHero
        eyebrow="Learning"
        title="Learning with understanding"
        lede="High academic achievement is a priority. It is not the point. The point is a community of well-rounded individuals who are compassionate, confident and hard to fool."
        image={photos.classroom}
        crumb="Learning"
      />

      {/* Eight facets */}
      <section id="experience" className="section scroll-mt-24 bg-sand-50">
        <div className="container">
          <SectionHeading
            eyebrow="The Vasant Valley Learning Experience"
            title="Eight facets, one education"
            lede="Every year of school touches all eight. None of them is an optional extra, and none is graded out of a hundred."
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {learningFacets.map((facet) => (
              <RevealItem key={facet.key}>
                <div className="group h-full rounded-3xl border border-sand-300 bg-white p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-crimson-300 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center bg-sand-200 text-crimson-700 transition-colors duration-500 clip-octagon group-hover:bg-crimson-700 group-hover:text-sand-50">
                    <Icon name={facet.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-ink-900">{facet.label}</h3>
                  <p className="mt-2.5 text-sm leading-[1.8] text-ink-600">{facet.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Curriculum by stage — tabbed */}
      <section id="stages" className="section scroll-mt-24 bg-sand-200">
        <div className="container">
          <SectionHeading
            eyebrow="Curriculum by stage"
            title="Fourteen years, four distinct schools"
            lede="What a five-year-old needs and what a seventeen-year-old needs have almost nothing in common. The curriculum is built accordingly."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <div
              role="tablist"
              aria-label="School stages"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {stages.map((item) => {
                const isActive = item.id === stage.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveStage(item.id)}
                    className={classNames(
                      'flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-all duration-400 ease-out-expo',
                      isActive
                        ? 'border-crimson-700 bg-crimson-700 text-sand-50 shadow-lift'
                        : 'border-sand-300 bg-white/70 text-ink-700 hover:border-crimson-300 hover:text-crimson-800',
                    )}
                  >
                    <Icon name={item.icon} className="h-5 w-5 shrink-0" />
                    <span>
                      <span className="block text-sm font-semibold">{item.stage}</span>
                      <span className={classNames('block text-xs', isActive ? 'text-sand-200/80' : 'text-ink-500')}>
                        {item.classes}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                role="tabpanel"
                id={`panel-${stage.id}`}
                aria-labelledby={`tab-${stage.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-8 rounded-3xl border border-sand-300 bg-white p-8 shadow-soft md:grid-cols-[1.1fr_1fr] md:p-10"
              >
                <div>
                  <span className="eyebrow">{stage.classes}</span>
                  <h3 className="text-display-sm text-ink-900">{stage.stage}</h3>
                  <p className="mt-4 leading-[1.85] text-ink-600">{stage.summary}</p>

                  <ul className="mt-7 space-y-3">
                    {stage.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[0.95rem] text-ink-700">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-crimson-700" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <SmartImage
                  id={[photos.youngLearners, photos.desk, photos.collaboration, photos.reading][stages.indexOf(stage)]}
                  alt={stage.stage}
                  ratio="aspect-[4/3] md:aspect-auto md:h-full"
                  className="rounded-2xl"
                  sizes="(min-width: 768px) 34vw, 92vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="section bg-sand-50">
        <div className="container">
          <SectionHeading
            eyebrow="Programmes"
            title="What runs alongside the timetable"
            lede="The parts of school that children remember twenty years later usually happened outside a lesson."
          />

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => {
              const anchor =
                programme.title === 'International Curriculum'
                  ? 'international'
                  : programme.title === 'Special Education Needs'
                    ? 'sen'
                    : undefined

              return (
                <RevealItem key={programme.title}>
                  <div id={anchor} className="card-hover h-full scroll-mt-28">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson-50 text-crimson-700">
                      <Icon name={programme.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-xl text-ink-900">{programme.title}</h3>
                    <p className="mt-3 leading-[1.8] text-ink-600">{programme.text}</p>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Assessment philosophy */}
      <section className="section bg-crimson-950 text-sand-100">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SmartImage
              id={photos.teacherStudent}
              alt="A teacher working one-to-one with a student"
              ratio="aspect-[4/3]"
              className="rounded-3xl shadow-lift"
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Assessment"
              title="We grade the process, not only the product"
              lede="Reports describe what a child can do and what they are working on next. Marks appear where a board requires them, and nowhere else."
              light
            />

            <ul className="mt-10 space-y-5">
              {[
                'Descriptive, criterion-referenced reporting from Pre-School to Class VIII',
                'Drafts, revisions and reflections carry assessment weight',
                'Two parent–teacher conversations a term, with the student in the room',
                'CBSE board preparation from Class IX, without narrowing the year to it',
              ].map((line) => (
                <li key={line} className="flex items-start gap-4 border-b border-sand-100/12 pb-5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-crimson-300" aria-hidden="true" />
                  <span className="leading-[1.8] text-sand-200/90">{line}</span>
                </li>
              ))}
            </ul>

            <Link to="/day-in-school" className="btn-ghost-light mt-10">
              See a day in school
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
