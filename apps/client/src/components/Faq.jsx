import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'

export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  const baseId = useId()

  return (
    <ul className="mx-auto max-w-3xl border-t border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-${index}`

        return (
          <li key={item.question} className="border-b border-white/10">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium text-text transition-colors hover:text-accent"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-accent bg-accent text-bg' : 'border-white/20 text-accent'
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
