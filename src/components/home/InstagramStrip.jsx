import { Instagram } from 'lucide-react'
import { instagramPosts } from '../../data/content'
import { site } from '../../data/site'
import SmartImage from '../ui/SmartImage'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'

const instagramUrl = site.socials.find((social) => social.icon === 'instagram')?.href ?? '#'

export function InstagramStrip() {
  return (
    <section className="section bg-sand-200">
      <div className="container">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="eyebrow justify-center">
            <span aria-hidden="true" className="h-px w-7 bg-crimson-700/50" />
            @vasantvalleyschool
          </span>
          <h2 className="text-display-sm">Follow us on Instagram</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {instagramPosts.map((post) => (
            <RevealItem key={post.id}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block overflow-hidden rounded-2xl shadow-soft"
              >
                <SmartImage
                  id={post.image}
                  alt={post.caption}
                  ratio="aspect-square"
                  imgClassName="group-hover:scale-[1.07]"
                  sizes="(min-width: 768px) 22vw, 45vw"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <span className="text-xs leading-snug text-sand-100">{post.caption}</span>
                </span>
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-sand-50/90 text-crimson-800 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default InstagramStrip
