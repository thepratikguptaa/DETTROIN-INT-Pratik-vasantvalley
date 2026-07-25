import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { infrastructure, learningFacets, milestones, leadership } from '../data/content'
import { photos } from '../data/media'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const pillars = [
  { title: 'Individualised attention', icon: 'Users', text: 'Classes are deliberately small. Teachers know every child by name, by strength and by the thing they find hard.' },
  { title: 'A process-focused framework', icon: 'Compass', text: 'We assess how a child arrives at an answer, not only whether the answer is right. Drafts matter as much as finals.' },
  { title: 'Equity of all stakeholders', icon: 'Scale', text: 'Students, parents, teachers and staff each have a voice in how the school runs — and each is accountable to it.' },
  { title: 'Commitment to society', icon: 'Sprout', text: 'Service learning is a requirement, not an enrichment. Every senior student holds a long-term community commitment.' },
]

export default function About() {
  useDocumentTitle(
    'About Us',
    'The story, philosophy and campus of Vasant Valley School — founded in 1990 as an initiative of the Education Today Trust.',
  )

  return (
    <>
      <PageHero
        eyebrow="About the school"
        title="A school built on one idea: excellence in deed."
        lede="Founded in 1990 with around 200 students and 16 teachers, Vasant Valley is a self-financing, inclusive day school spread over eight acres in Vasant Kunj, New Delhi."
        image={photos.campus}
        crumb="About"
      />

      {/* Story */}
      <section id="story" className="section scroll-mt-24 bg-sand-50">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SmartImage
              id={photos.reading}
              alt="Students at work in a Vasant Valley classroom"
              ratio="aspect-[4/5]"
              className="rounded-3xl shadow-lift"
              sizes="(min-width: 1024px) 42vw, 92vw"
            />
          </Reveal>

          <div>
            <SectionHeading eyebrow="Our story" title="Thirty-six years of the same standard" />
            <div className="prose-vv mt-6 max-w-2xl">
              <p>
                Vasant Valley School was established in 1990 by Mr. Aroon Purie and Mrs. Rekha Purie as an initiative
                of the Education Today Trust. The school began its journey with around 200 students and 16 teachers in
                July 1990.
              </p>
              <p>
                It is a self-financing, inclusive day school spread over eight acres of land in Vasant Kunj, New Delhi.
                It has never grown past the size at which a principal can still know every child in the building — a
                constraint the school treats as a feature.
              </p>
              <p>
                What began as one campus is now a founding campus: the ethos, standards and commitment to holistic
                development that define Vasant Valley will carry into every new school the trust opens.
              </p>
            </div>

            <figure className="mt-10 rounded-3xl border-l-4 border-crimson-700 bg-sand-200 p-8">
              <Quote className="h-7 w-7 text-crimson-700" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-xl leading-relaxed text-ink-900">
                “We wanted a school where children were not afraid to be wrong in front of their teachers — because
                that is the only condition under which anyone learns anything worth knowing.”
              </blockquote>
              <figcaption className="mt-5 text-sm text-ink-500">On the founding intent of the school</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Vision & pillars */}
      <section id="vision" className="section scroll-mt-24 bg-sand-200">
        <div className="container">
          <SectionHeading
            eyebrow="Vision & philosophy"
            title="“Excellence in Deed”"
            lede="The School's motto sets the standard. Four pillars carry it — and they are visible in the timetable, not only on the wall."
          />

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => (
              <RevealItem key={pillar.title}>
                <div className="card-hover h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson-700 text-sand-50">
                    <Icon name={pillar.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl text-ink-900">{pillar.title}</h3>
                  <p className="mt-3 leading-[1.8] text-ink-600">{pillar.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12">
            <Link to="/learning#experience" className="group link-arrow">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              See how this shapes the curriculum
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="section bg-sand-50">
        <div className="container">
          <SectionHeading eyebrow="Milestones" title="A timeline of the school" align="center" className="mx-auto" />

          <div className="relative mx-auto mt-16 max-w-3xl">
            <span aria-hidden="true" className="absolute left-[7.5rem] top-2 hidden h-full w-px bg-sand-300 sm:block" />
            <ol className="space-y-10">
              {milestones.map((milestone, index) => (
                <Reveal as="li" key={milestone.year} delay={index * 0.05} className="relative sm:pl-[10rem]">
                  <span className="font-display text-2xl text-crimson-700 sm:absolute sm:left-0 sm:top-0 sm:w-24 sm:text-right">
                    {milestone.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-[7.5rem] top-3 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-crimson-700 ring-4 ring-sand-50 sm:block"
                  />
                  <h3 className="mt-2 font-display text-xl text-ink-900 sm:mt-0">{milestone.title}</h3>
                  <p className="mt-2 leading-[1.8] text-ink-600">{milestone.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="section scroll-mt-24 bg-crimson-950 text-sand-100">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title="The people who hold the standard"
            lede="A flat structure by design: heads of school teach, and every senior leader carries a pastoral group."
            light
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <RevealItem key={person.name}>
                <div className="h-full rounded-3xl border border-sand-100/12 bg-sand-50/5 p-7 transition-colors duration-500 hover:border-sand-100/30 hover:bg-sand-50/10">
                  <span className="grid h-12 w-12 place-items-center bg-crimson-700 font-display text-lg text-sand-50 clip-octagon">
                    {person.name.split(' ').pop().charAt(0)}
                  </span>
                  <h3 className="mt-6 font-display text-lg text-sand-50">{person.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-crimson-300">{person.role}</p>
                  <p className="mt-4 text-sm leading-[1.8] text-sand-200/80">{person.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Infrastructure */}
      <section id="infrastructure" className="section scroll-mt-24 bg-sand-50">
        <div className="container">
          <SectionHeading
            eyebrow="Infrastructure"
            title="Eight acres, built for children"
            lede="The School is divided into two wings with an open amphitheatre connecting them. The red and beige sandstone building was designed keeping in mind the ideal environment for children."
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.features.map((feature) => (
              <RevealItem key={feature.label}>
                <div className="card-hover flex h-full items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sand-200 text-crimson-700">
                    <Icon name={feature.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-ink-800">{feature.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 grid gap-6 sm:grid-cols-3">
            {[photos.building, photos.library, photos.emptyClassroom].map((photo, index) => (
              <SmartImage
                key={photo}
                id={photo}
                alt={['The sandstone wings', 'The senior library', 'A classroom before the day begins'][index]}
                ratio="aspect-[4/3]"
                className="rounded-2xl shadow-soft"
                imgClassName="hover:scale-105"
                sizes="(min-width: 640px) 30vw, 92vw"
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Compliance / privacy anchors referenced from the footer */}
      <section id="compliance" className="scroll-mt-24 bg-sand-200 py-16">
        <div className="container grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl text-ink-900">Statutory compliances</h2>
            <p className="mt-3 leading-[1.85] text-ink-600">
              Affiliation details, mandatory public disclosure, the school management committee, fee structure and
              safety certificates are published each academic year and are available from the school office on request.
            </p>
            <Link to="/contact" className="group link-arrow mt-6">
              <ArrowRight className="h-4 w-4" />
              Request documents
            </Link>
          </Reveal>

          <Reveal id="privacy" delay={0.08} className="scroll-mt-24">
            <h2 className="font-display text-2xl text-ink-900">Privacy</h2>
            <p className="mt-3 leading-[1.85] text-ink-600">
              Information submitted through the enquiry and contact forms on this site is used only to respond to your
              request. It is not shared with third parties, and it is not used for marketing.
            </p>
            <p className="mt-3 text-sm leading-[1.85] text-ink-500">
              Note: this site is a redesign concept built for a technical assessment. No real applicant data is
              collected or stored.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Facet strip */}
      <section className="bg-sand-50 py-14">
        <div className="container">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-ink-500">
            The eight facets of a Vasant Valley education
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {learningFacets.map((facet) => (
              <li key={facet.key}>
                <span className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-ink-700">
                  <Icon name={facet.icon} className="h-4 w-4 text-crimson-700" />
                  {facet.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
