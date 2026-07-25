import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { infrastructure } from '../../data/content'
import Icon from '../ui/Icon'
import SmartImage from '../ui/SmartImage'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'

export function Infrastructure() {
  return (
    <section id="infrastructure" className="section scroll-mt-24 bg-sand-50">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <SmartImage
              id={infrastructure.image}
              alt="The sandstone school building and its green cover"
              ratio="aspect-[4/5]"
              className="rounded-3xl shadow-lift"
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
            <div className="absolute -bottom-6 -right-4 hidden max-w-[13rem] rounded-2xl bg-crimson-700 p-5 text-sand-50 shadow-lift sm:block">
              <p className="font-display text-3xl">8</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-sand-200">
                acres · four built, four green
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">
                <span aria-hidden="true" className="h-px w-7 bg-crimson-700/50" />
                {infrastructure.eyebrow}
              </span>
              <h2 className="text-display-md">{infrastructure.title}</h2>
              <div className="prose-vv mt-6">
                {infrastructure.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {infrastructure.features.map((feature) => (
                <RevealItem key={feature.label}>
                  <div className="flex items-center gap-3 border-b border-sand-300 pb-4">
                    <Icon name={feature.icon} className="h-[1.15rem] w-[1.15rem] shrink-0 text-crimson-700" />
                    <span className="text-sm text-ink-700">{feature.label}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <Link to="/about#infrastructure" className="group link-arrow mt-9">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                Explore the campus
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Infrastructure
