import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ as = 'div', delay = 0, className, children }) {
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
