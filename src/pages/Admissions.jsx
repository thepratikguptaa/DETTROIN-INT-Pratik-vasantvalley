import { Download, Phone } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Accordion from '../components/ui/Accordion'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import EnquiryForm from '../components/forms/EnquiryForm'
import { admissionSteps, eligibility, faqs, keyDates } from '../data/admissions'
import { site } from '../data/site'
import { photos } from '../data/media'
import { classNames } from '../lib/format'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Admissions() {
  useDocumentTitle(
    'Admissions',
    'Admissions at Vasant Valley School — the process, eligibility, key dates for the 2026–27 session, FAQs and the online enquiry form.',
  )

  return (
    <>
      <PageHero
        eyebrow="Admissions 2026–27"
        title="Begin the conversation"
        lede="Five steps, no written test for Pre-School, and a real visit to the campus before anyone signs anything."
        image={photos.discussion}
        crumb="Admissions"
      />

      {/* Process */}
      <section className="section bg-sand-50">
        <div className="container">
          <SectionHeading
            eyebrow="The process"
            title="How admission works"
            lede="Each step is designed to tell you as much about us as it tells us about your child."
          />

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {admissionSteps.map((step) => (
              <RevealItem key={step.step}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-sand-300 bg-white p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-crimson-200 hover:shadow-lift">
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-4 font-display text-7xl text-sand-200 transition-colors duration-500 group-hover:text-crimson-50"
                  >
                    {step.step}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-crimson-700 text-sand-50">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-6 font-display text-xl text-ink-900">{step.title}</h3>
                  <p className="relative mt-3 leading-[1.8] text-ink-600">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Dates + eligibility */}
      <section className="section bg-sand-200">
        <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Key dates" title="The 2026–27 calendar" />

            <ul className="mt-10 divide-y divide-sand-300 border-y border-sand-300">
              {keyDates.map((entry) => (
                <li key={entry.label} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={classNames(
                        'h-2 w-2 rounded-full',
                        entry.status === 'open' ? 'bg-crimson-700' : 'bg-sand-400',
                      )}
                    />
                    <span className="text-[0.95rem] text-ink-800">{entry.label}</span>
                  </span>
                  <span
                    className={classNames(
                      'text-sm font-medium tabular-nums',
                      entry.status === 'open' ? 'text-crimson-700' : 'text-ink-500',
                    )}
                  >
                    {entry.date}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-secondary">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call the admissions office
              </a>
              <a href="#enquiry" className="btn-secondary">
                <Download className="h-4 w-4" aria-hidden="true" />
                Request the prospectus
              </a>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Eligibility" title="Who can apply, and when" />

            <RevealGroup className="mt-10 space-y-4">
              {eligibility.map((item) => (
                <RevealItem key={item.label}>
                  <div className="rounded-2xl border border-sand-300 bg-white p-6">
                    <h3 className="font-display text-lg text-crimson-800">{item.label}</h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.8] text-ink-600">{item.detail}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-6 text-sm leading-[1.8] text-ink-500">
              Age criteria follow the Delhi Directorate of Education norms for the relevant session. Where a class is
              full, applications are held on a waiting list for the academic year.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="section scroll-mt-24 bg-sand-50">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Enquire"
              title="Send us an enquiry"
              lede="One form, two working days, a real person on the other end. Nothing here commits you to applying."
            />

            <Reveal delay={0.1} className="mt-10 space-y-6">
              <div className="rounded-2xl bg-crimson-950 p-7 text-sand-200">
                <h3 className="font-display text-lg text-sand-50">Prefer to talk?</h3>
                <p className="mt-2 text-sm leading-[1.8] text-sand-200/85">
                  The admissions office is open {site.officeHours}.
                </p>
                <div className="mt-5 space-y-2 text-sm">
                  <a href={site.phoneHref} className="block transition-colors hover:text-sand-50">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="block transition-colors hover:text-sand-50">
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-sand-300 bg-white p-7">
                <h3 className="font-display text-lg text-ink-900">What to bring to a visit</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-600">
                  {[
                    "The child's birth certificate",
                    'Proof of residence',
                    'Reports from the last two years (lateral entry)',
                    'Any assessment or therapy reports you would like us to see',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="section scroll-mt-24 bg-sand-200">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <SectionHeading
              eyebrow="FAQs"
              title="Questions we are asked most"
              lede="If yours isn't here, write to us — we'll answer it and add it."
            />
            <Reveal delay={0.08}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
