import { motion, useReducedMotion } from 'motion/react'

// Enveloppe de chaque page : couleur de la rubrique + rideau coloré qui se lève à l'arrivée
export default function Page({ accent = 'primary', children }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div data-accent={accent}>
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 origin-top bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.3, ease: 'easeIn' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
