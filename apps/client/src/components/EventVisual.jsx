import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Equalizer from './Equalizer'

// Visuel du concert dans un cadre, avec léger effet de parallaxe ; affiche de remplacement sans image
export default function EventVisual({ image, name, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      className={`relative isolate aspect-video overflow-hidden rounded-3xl border border-white/10 bg-surface ${className}`}
    >
      {image ? (
        <motion.img
          src={image}
          alt={`Visuel du concert ${name}`}
          style={{ y, scale: 1.2 }}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Visuel du concert ${name}`}
          className="flex h-full w-full flex-col justify-between p-6 sm:p-10"
        >
          <span
            aria-hidden="true"
            className="absolute -left-20 -top-20 -z-10 h-80 w-80 animate-float rounded-full bg-accent/30 blur-[90px]"
          />
          <p className="font-display text-[clamp(1.75rem,7vw,4.5rem)] font-black uppercase leading-none text-text">
            {name}
          </p>
          <Equalizer bars={28} className="h-1/2" />
        </div>
      )}
    </div>
  )
}
