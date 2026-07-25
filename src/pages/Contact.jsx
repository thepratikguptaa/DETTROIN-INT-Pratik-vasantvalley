import { ArrowUpRight, Clock, LogIn, Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/forms/ContactForm'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { site } from '../data/site'
import { photos } from '../data/media'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const departments = [
  { name: 'Admissions office', detail: 'Registration, visits, prospectus', email: 'admissions@vasantvalley.edu.in' },
  { name: 'Academic office', detail: 'Timetable, reports, examinations', email: 'academics@vasantvalley.edu.in' },
  { name: 'Transport', detail: 'Routes, stops, bus passes', email: 'transport@vasantvalley.edu.in' },
  { name: 'Careers', detail: 'Teaching and support-staff vacancies', email: 'careers@vasantvalley.edu.in' },
]

export default function Contact() {
  useDocumentTitle(
    'Contact',
    'Contact Vasant Valley School — Sector C, Vasant Kunj, New Delhi 110070. Phone, email, department contacts, map and the general enquiry form.',
  )

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come and see the school"
        lede="Sector C, Vasant Kunj — a short drive from Nelson Mandela Marg. Visits are welcome on working days, by appointment."
        image={photos.building}
        crumb="Contact"
      />

      {/* Primary contact cards */}
      <section className="section bg-sand-50">
        <div className="container">
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            <RevealItem>
              <a href={site.address.mapUrl} target="_blank" rel="noreferrer noopener" className="card-hover block h-full">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson-50 text-crimson-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl text-ink-900">Visit us</h2>
                <p className="mt-3 leading-[1.8] text-ink-600">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </p>
                <span className="group link-arrow mt-5">
                  Open in maps
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </RevealItem>

            <RevealItem>
              <div className="card-hover h-full">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson-50 text-crimson-700">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl text-ink-900">Call or write</h2>
                <div className="mt-3 space-y-2 leading-relaxed text-ink-600">
                  <a href={site.phoneHref} className="block transition-colors hover:text-crimson-700">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="block transition-colors hover:text-crimson-700">
                    {site.email}
                  </a>
                </div>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="card-hover h-full">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson-50 text-crimson-700">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl text-ink-900">Office hours</h2>
                <p className="mt-3 leading-[1.8] text-ink-600">
                  {site.officeHours}
                  <br />
                  Closed on gazetted holidays.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Form + map */}
      <section className="section bg-sand-200 pt-0">
        <div className="container grid gap-14 pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-3xl border border-sand-300 shadow-soft">
                <iframe
                  title="Map showing Vasant Valley School, Sector C, Vasant Kunj, New Delhi"
                  src={site.address.embedUrl}
                  className="h-[22rem] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <h2 className="font-display text-xl text-ink-900">Department contacts</h2>
              <ul className="mt-5 divide-y divide-sand-300 border-y border-sand-300">
                {departments.map((department) => (
                  <li key={department.name} className="py-4">
                    <p className="font-medium text-ink-900">{department.name}</p>
                    <p className="mt-0.5 text-sm text-ink-500">{department.detail}</p>
                    <a
                      href={`mailto:${department.email}`}
                      className="mt-1 inline-block text-sm text-crimson-700 transition-colors hover:text-crimson-900"
                    >
                      {department.email}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Portal login */}
      <section id="login" className="scroll-mt-24 bg-crimson-950 py-20 text-sand-100">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Portal"
            title="Parent & student login"
            lede="Circulars, reports, the calendar, fee receipts and leave applications live on the portal. Credentials are issued by the school office."
            light
          />

          <Reveal delay={0.08} className="lg:justify-self-end">
            <div className="rounded-3xl border border-sand-100/15 bg-sand-50/5 p-8">
              <p className="text-sm leading-[1.8] text-sand-200/85">
                This is a redesign concept, so the portal button below is illustrative — it does not connect to a live
                system.
              </p>
              <button type="button" className="btn-ghost-light mt-6 w-full" aria-disabled="true">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Go to the portal
              </button>
              <p className="mt-4 text-xs text-sand-300/70">
                Trouble signing in? Write to{' '}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-sand-50">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Careers anchor */}
      <section id="careers" className="scroll-mt-24 bg-sand-50 py-20">
        <div className="container grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Careers" title="Teach here" />
          <Reveal delay={0.08}>
            <p className="leading-[1.9] text-ink-600">
              We look for teachers who are still curious about their own subject, and who want to be known by their
              students rather than obeyed by them. Applications are accepted year-round for teaching, counselling,
              library and administrative roles.
            </p>
            <a href="mailto:careers@vasantvalley.edu.in" className="btn-secondary mt-7">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send your CV
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
