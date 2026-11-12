import { motion } from 'motion/react'

// Chaque mot monte depuis un masque, l'un après l'autre
export default function AnimatedTitle({ as: Tag = 'h1', text, delay = 0.35, className }) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span key={index} className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + index * 0.08 }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
