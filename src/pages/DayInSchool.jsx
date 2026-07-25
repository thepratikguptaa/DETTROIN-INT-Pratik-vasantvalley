import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { daySchedule, houses, programmes } from '../data/content'
import { photos } from '../data/media'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const clubs = [
  'Debating & Model UN', 'The school paper', 'Robotics', 'Environment club', 'Studio art',
  'Indian & Western music', 'Theatre', 'Dance', 'Quizzing', 'Photography', 'Community service', 'Coding',
]

export default function DayInSchool() {
  useDocumentTitle(
    'A Day in School',
    'Assembly to dispersal — how a school day is structured at Vasant Valley, and what happens on eight acres between the bells.',
  )

  return (
    <>
      <PageHero
        eyebrow="Campus life"
        title="Education is preparation for life."
        lede="The school day comprises academic and non-academic Learning Experiences, planned with special focus on the developmental needs of our students. The entire campus is a classroom."
        image={photos.assembly}
        crumb="A Day in School"
      />

      {/* Timetable */}
      <section className="section bg-sand-50">
        <div className="container">
          <SectionHeading
            eyebrow="From 7:55 to 3:30"
            title="One day, start to finish"
            lede="Long teaching blocks, a real lunch break, games for everyone and clubs that are not an afterthought."
          />

          <div className="relative mt-16">
            <span aria-hidden="true" className="absolute left-[4.75rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-sand-300 md:block" />

            <ol className="space-y-8">
              {daySchedule.map((slot, index) => (
                <Reveal as="li" key={slot.time} delay={index * 0.04} className="relative md:pl-32">
                  <span className="font-display text-lg text-crimson-700 tabular-nums md:absolute md:left-0 md:top-0 md:w-16 md:text-right">
                    {slot.time}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-[4.75rem] top-2.5 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-crimson-700 ring-4 ring-sand-50 md:block"
                  />
                  <div className="mt-1 rounded-2xl border border-sand-300 bg-white p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-crimson-200 hover:shadow-soft md:mt-0">
                    <h3 className="font-display text-xl text-ink-900">{slot.title}</h3>
                    <p className="mt-2 leading-[1.8] text-ink-600">{slot.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Intra-school */}
      <section id="intra" className="section scroll-mt-24 bg-sand-200">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Intra-school programmes"
              title="Houses, councils and a production everyone is in"
              lede="Four houses run the internal calendar — sport, music, debate, drama and the quieter competitions nobody puts on a certificate."
            />

            <RevealGroup className="mt-10 grid grid-cols-2 gap-4">
              {houses.map((house) => (
                <RevealItem key={house.name}>
                  <div className="flex items-center gap-4 rounded-2xl border border-sand-300 bg-white p-5">
                    <span
                      aria-hidden="true"
                      className="h-10 w-10 shrink-0 clip-octagon"
                      style={{ backgroundColor: house.colour }}
                    />
                    <span>
                      <span className="block font-display text-lg text-ink-900">{house.name}</span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-ink-500">{house.trait}</span>
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.1}>
            <SmartImage
              id={photos.auditorium}
              alt="The annual production in the amphitheatre"
              ratio="aspect-[4/3]"
              className="rounded-3xl shadow-lift"
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Clubs */}
      <section className="section bg-sand-50">
        <div className="container">
          <SectionHeading
            eyebrow="Clubs & societies"
            title="Twelve afternoons, twelve rooms"
            align="center"
            className="mx-auto"
          />

          <RevealGroup className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {clubs.map((club) => (
              <RevealItem key={club}>
                <span className="inline-flex rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-400 hover:text-crimson-700">
                  {club}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sport */}
      <section id="sport" className="section scroll-mt-24 bg-crimson-950 text-sand-100">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SmartImage
              id={photos.youngLearners}
              alt="Students on the school field"
              ratio="aspect-[4/3]"
              className="rounded-3xl shadow-lift"
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Sport"
              title="Every child, every day, on a field"
              lede="Games are timetabled for all students through exam terms as well. Teams are the by-product, not the purpose."
              light
            />

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {['Athletics', 'Tennis', 'Basketball', 'Football', 'Swimming', 'Yoga'].map((sport) => (
                <span
                  key={sport}
                  className="rounded-xl border border-sand-100/15 bg-sand-50/5 px-4 py-3 text-center text-sm text-sand-200"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inter-school */}
      <section id="inter" className="section scroll-mt-24 bg-sand-200">
        <div className="container">
          <SectionHeading
            eyebrow="Inter-school programmes"
            title="What we host, and where we travel"
            lede="Laissez Faire and Synapse bring schools from across the country onto campus each year. Our students plan them end to end."
          />

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {programmes.slice(3).map((programme) => (
              <RevealItem key={programme.title}>
                <div className="card-hover h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson-50 text-crimson-700">
                    <Icon name={programme.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl text-ink-900">{programme.title}</h3>
                  <p className="mt-3 leading-[1.8] text-ink-600">{programme.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Link to="/news" className="group link-arrow mt-12">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              See the events calendar
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
