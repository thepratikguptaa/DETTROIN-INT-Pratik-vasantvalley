import { classNames } from '../../lib/format'
import Reveal from './Reveal'

/** Eyebrow + title + optional lede, used at the top of nearly every section. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  light = false,
  className = '',
  as: Tag = 'h2',
}) {
  const centered = align === 'center'

  return (
    <Reveal className={classNames(centered && 'mx-auto max-w-2xl text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <span className={light ? 'eyebrow-light' : 'eyebrow'}>
          <span
            aria-hidden="true"
            className={classNames('h-px w-7', light ? 'bg-sand-300/70' : 'bg-crimson-700/50')}
          />
          {eyebrow}
        </span>
      )}
      <Tag
        className={classNames(
          'text-display-md',
          light ? 'text-sand-50' : 'text-ink-900',
        )}
      >
        {title}
      </Tag>
      {lede && (
        <p
          className={classNames(
            'mt-5 text-[1.05rem] leading-[1.8]',
            light ? 'text-sand-200/90' : 'text-ink-600',
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeading
