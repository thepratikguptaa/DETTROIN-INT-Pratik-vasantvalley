import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Scroll-reveal wrapper. Animates once, respects reduced-motion, and never
 * blocks content: the element is fully visible if JS or motion is unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.65,
  as = 'div',
  className = '',
  once = true,
  amount = 0.25,
  ...rest
}) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as] ?? motion.div

  if (reduced) {
    const Static = as
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    )
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}

/** Staggers direct children — pair with <Reveal.Item>. */
export function RevealGroup({ children, className = '', stagger = 0.09, ...rest }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', y = 22, ...rest }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
