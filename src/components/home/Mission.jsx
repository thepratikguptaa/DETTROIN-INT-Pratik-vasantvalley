import { stats } from '../../data/site'
import { useCountUp } from '../../hooks/useCountUp'
import Reveal from '../ui/Reveal'

function Stat({ value, label, hint }) {
  const [ref, current] = useCountUp(value)

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl text-crimson-700 tabular-nums md:text-5xl">{current}</p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-800">{label}</p>
      <p className="mx-auto mt-1.5 max-w-[16rem] text-xs leading-relaxed text-ink-500">{hint}</p>
    </div>
  )
}

/** Mission statement, set large and centred, followed by the headline numbers. */
export function Mission() {
  return (
    <section className="section bg-sand-50">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-[1.6rem] leading-[1.55] text-pine-700 md:text-[2.1rem] md:leading-[1.45]">
            Vasant Valley School encourages students to push the boundaries of current understanding and set
            benchmarks in the field of education.
          </p>
          <p className="mx-auto mt-7 max-w-xl leading-[1.9] text-ink-600">
            Our objective is to inculcate in our students ethical values, nurture original thinking, and develop a
            sense of national identity as well as global citizenship.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-10 rounded-3xl border border-sand-300 bg-white/60 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Mission
