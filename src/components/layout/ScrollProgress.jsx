import { motion, useScroll, useSpring } from 'framer-motion'

/** Hairline reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-900"
    />
  )
}

export default ScrollProgress
