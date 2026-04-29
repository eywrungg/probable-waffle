import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'

interface Props {
  id?: string
  children: ReactNode
  className?: string
  delay?: number
}

export default function Section({ id, children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
