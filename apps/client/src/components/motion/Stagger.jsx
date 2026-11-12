import { motion, stagger } from 'motion/react'

const container = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(0.1) } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Stagger({ as = 'div', className, children }) {
  const Component = motion[as]

  return (
    <Component
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({ as = 'div', className, children }) {
  const Component = motion[as]

  return (
    <Component variants={item} className={className}>
      {children}
    </Component>
  )
}
