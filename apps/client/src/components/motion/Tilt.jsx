import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

const spring = { stiffness: 220, damping: 22 }

// La carte s'incline vers le pointeur
export default function Tilt({ className, children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), spring)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), spring)

  const handleMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - box.left) / box.width - 0.5)
    y.set((event.clientY - box.top) / box.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
