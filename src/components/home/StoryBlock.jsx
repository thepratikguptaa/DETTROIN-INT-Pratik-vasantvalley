import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { classNames } from '../../lib/format'

/**
 * Alternating text / image band. `align` decides which side the image sits on;
 * on mobile the image always comes first so the page reads top to bottom.
 */
export function StoryBlock({ block, tone = 'sand' }) {
  const imageRight = block.align === 'right'

  return (
    <section
      id={block.id}
      className={classNames('section scroll-mt-24', tone === 'sand' ? 'bg-sand-200' : 'bg-sand-50')}
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal
            className={classNames('order-2', imageRight ? 'lg:order-1' : 'lg:order-2')}
            y={28}
          >
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-7 bg-crimson-700/50" />
              {block.eyebrow}
            </span>
            <h2 className="text-display-md text-crimson-800">{block.title}</h2>
            <div className="prose-vv mt-6">
              {block.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <Link to={block.link.to} className="group link-arrow mt-8">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              {block.link.label}
            </Link>
          </Reveal>

          <Reveal
            className={classNames('relative order-1', imageRight ? 'lg:order-2' : 'lg:order-1')}
            delay={0.1}
            y={34}
          >
            <span
              aria-hidden="true"
              className={classNames(
                'absolute -z-10 hidden h-full w-full rounded-3xl border-2 border-crimson-200 lg:block',
                imageRight ? '-right-5 -top-5' : '-left-5 -top-5',
              )}
            />
            <SmartImage
              id={block.image}
              alt={block.title}
              ratio="aspect-[5/4]"
              className="rounded-3xl shadow-lift"
              imgClassName="hover:scale-[1.04]"
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default StoryBlock
