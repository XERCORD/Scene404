import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.18, 1])

  return <motion.span style={{ opacity }}>{children} </motion.span>
}

// Le texte s'« allume » mot par mot à mesure qu'on fait défiler la page
export default function ScrollText({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={index}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}
