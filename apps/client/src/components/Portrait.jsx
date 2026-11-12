import { motion } from 'motion/react'

function initials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Photo (noir et blanc, en couleur au survol d'un parent « group ») ou visuel de remplacement
export default function Portrait({ image, name, className = '' }) {
  return (
    <div className={`overflow-hidden bg-surface-2 ${className}`}>
      {image ? (
        <motion.img
          src={image}
          alt={name}
          loading="lazy"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent/45 via-surface-2 to-bg"
        >
          <span className="font-display text-[clamp(3rem,9vw,6rem)] font-black text-text/20">
            {initials(name)}
          </span>
        </div>
      )}
    </div>
  )
}
