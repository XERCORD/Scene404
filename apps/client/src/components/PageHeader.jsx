import { motion } from 'motion/react'
import AnimatedTitle from './motion/AnimatedTitle'

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="relative isolate overflow-hidden px-5 pb-10 pt-36 sm:px-6 sm:pt-44">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 -z-10 h-[34rem] w-[34rem] animate-float rounded-full bg-accent/25 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent"
        >
          <span aria-hidden="true" className="h-2 w-2 animate-blink rounded-full bg-accent" />
          {eyebrow}
        </motion.p>
        <AnimatedTitle
          text={title}
          className="font-display text-[clamp(2.25rem,9vw,7rem)] font-black uppercase leading-[0.95] text-text"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg text-text-muted sm:text-xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  )
}
