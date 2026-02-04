'use client'

import { m } from 'framer-motion'
import { AnimatedSectionProps } from './AnimatedSection.types'

const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  return (
    <m.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.3,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
