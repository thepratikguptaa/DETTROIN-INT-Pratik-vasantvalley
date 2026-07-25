import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { classNames } from '../../lib/format'

/**
 * Accessible disclosure list: real buttons, aria-expanded/aria-controls wiring,
 * and content that stays in the DOM order screen readers expect.
 */
export function Accordion({ items, allowMultiple = false, className = '' }) {
  const baseId = useId()
  const [open, setOpen] = useState(() => new Set())

  const toggle = (index) => {
    setOpen((current) => {
      const next = new Set(allowMultiple ? current : [])
      if (current.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className={classNames('divide-y divide-sand-300 border-y border-sand-300', className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index)
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.q ?? index}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-crimson-700"
              >
                <span className="font-display text-lg leading-snug text-ink-900 group-hover:text-crimson-800">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ease-out-expo',
                    isOpen
                      ? 'rotate-45 border-crimson-700 bg-crimson-700 text-sand-50'
                      : 'border-sand-400 text-ink-600 group-hover:border-crimson-700 group-hover:text-crimson-700',
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-12 leading-[1.85] text-ink-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
